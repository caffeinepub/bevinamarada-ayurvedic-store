import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinStorage();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
    role : AccessControl.UserRole;
    trialStartTime : Int;
  };

  type StockItem = {
    id : Nat;
    name : Text;
    category : Text;
    quantity : Nat;
    unitPrice : Nat;
    lowStockThreshold : Nat;
    isLowStock : Bool;
    isTrending : Bool;
    image : ?Storage.ExternalBlob;
    expiryDate : ?Int;
  };

  type Sale = {
    id : Nat;
    stockItemId : Nat;
    quantity : Nat;
    totalPrice : Nat;
    timestamp : Int;
  };

  type SalesReports = {
    totalRevenue : Nat;
    totalSales : Nat;
    dailySales : [(Int, Nat)];
    monthlySales : [(Text, Nat)];
    productBreakdown : [(Nat, Nat)];
  };

  var nextStockItemId = 1;
  var nextSaleId = 1;

  let userProfiles = Map.empty<Principal, UserProfile>();
  let stockItems = Map.empty<Nat, StockItem>();
  let sales = Map.empty<Nat, Sale>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };

    let updatedProfile = switch (userProfiles.get(caller)) {
      case (null) {
        let now = Time.now();
        { profile with trialStartTime = now };
      };
      case (?existing) {
        { profile with trialStartTime = existing.trialStartTime };
      };
    };

    userProfiles.add(caller, updatedProfile);
  };

  public type TrialStatus = {
    trialStartTime : Int;
    trialActive : Bool;
    daysRemaining : Nat;
  };

  public query ({ caller }) func getTrialStatus() : async TrialStatus {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get trial status");
    };
    switch (userProfiles.get(caller)) {
      case (null) {
        {
          trialStartTime = 0;
          trialActive = false;
          daysRemaining = 0;
        };
      };
      case (?profile) {
        let now = Time.now();
        let trialStartTime = profile.trialStartTime;
        let sevenDaysNanos : Int = 7 * 24 * 60 * 60 * 1_000_000_000;
        let trialActive = now < trialStartTime + sevenDaysNanos;
        let daysRemaining : Nat = if (trialActive) {
          let remaining : Int = (trialStartTime + sevenDaysNanos - now);
          let oneDayNanos : Int = 24 * 60 * 60 * 1_000_000_000;
          Int.abs(remaining / oneDayNanos);
        } else {
          0;
        };
        {
          trialStartTime;
          trialActive;
          daysRemaining;
        };
      };
    };
  };

  public shared ({ caller }) func addStockItem(
    name : Text,
    category : Text,
    quantity : Nat,
    unitPrice : Nat,
    lowStockThreshold : Nat,
    image : ?Storage.ExternalBlob,
    expiryDate : ?Int,
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Access denied: Only owners/admins can access this functionality");
    };

    let item : StockItem = {
      id = nextStockItemId;
      name;
      category;
      quantity;
      unitPrice;
      lowStockThreshold;
      isLowStock = quantity <= lowStockThreshold;
      isTrending = false;
      image;
      expiryDate;
    };

    stockItems.add(item.id, item);
    nextStockItemId += 1;
    item.id;
  };

  public shared ({ caller }) func updateStockItem(
    id : Nat,
    name : Text,
    category : Text,
    quantity : Nat,
    unitPrice : Nat,
    lowStockThreshold : Nat,
    image : ?Storage.ExternalBlob,
    expiryDate : ?Int,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Access denied: Only owners/admins can access this functionality");
    };

    switch (stockItems.get(id)) {
      case (null) { Runtime.trap("Stock item not found") };
      case (?existing) {
        let updated : StockItem = {
          id;
          name;
          category;
          quantity;
          unitPrice;
          lowStockThreshold;
          isLowStock = quantity <= lowStockThreshold;
          isTrending = existing.isTrending;
          image;
          expiryDate;
        };
        stockItems.add(id, updated);
      };
    };
  };

  public shared ({ caller }) func deleteStockItem(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Access denied: Only owners/admins can access this functionality");
    };

    if (not stockItems.containsKey(id)) {
      Runtime.trap("Stock item not found");
    };
    stockItems.remove(id);
  };

  public shared ({ caller }) func markTrendingStockItem(id : Nat, isTrending : Bool) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Access denied: Only owners/admins can access this functionality");
    };

    switch (stockItems.get(id)) {
      case (null) { Runtime.trap("Stock item not found") };
      case (?item) {
        let updated : StockItem = {
          id = item.id;
          name = item.name;
          category = item.category;
          quantity = item.quantity;
          unitPrice = item.unitPrice;
          lowStockThreshold = item.lowStockThreshold;
          isLowStock = item.isLowStock;
          isTrending;
          image = item.image;
          expiryDate = item.expiryDate;
        };
        stockItems.add(id, updated);
      };
    };
  };

  public shared ({ caller }) func addSale(stockItemId : Nat, quantity : Nat) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Access denied: Only owners/admins can access this functionality");
    };

    switch (stockItems.get(stockItemId)) {
      case (null) { Runtime.trap("Stock item not found") };
      case (?item) {
        if (quantity > item.quantity) {
          Runtime.trap("Insufficient stock quantity");
        };

        let sale : Sale = {
          id = nextSaleId;
          stockItemId;
          quantity;
          totalPrice = item.unitPrice * quantity;
          timestamp = Time.now();
        };

        let updatedItem : StockItem = {
          id = item.id;
          name = item.name;
          category = item.category;
          quantity = item.quantity - quantity;
          unitPrice = item.unitPrice;
          lowStockThreshold = item.lowStockThreshold;
          isLowStock = (item.quantity - quantity) <= item.lowStockThreshold;
          isTrending = item.isTrending;
          image = item.image;
          expiryDate = item.expiryDate;
        };

        stockItems.add(item.id, updatedItem);
        sales.add(sale.id, sale);
        nextSaleId += 1;
        sale.id;
      };
    };
  };

  public query ({ caller }) func getAllStockItems() : async [StockItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Access denied: Only owners/admins can access this functionality");
    };
    stockItems.values().toArray();
  };

  public query ({ caller }) func getTrendingStockItems() : async [StockItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Access denied: Only owners/admins can access this functionality");
    };

    stockItems.values().toArray().filter(func(item) { item.isTrending });
  };

  public query ({ caller }) func getLowStockItems() : async [StockItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Access denied: Only owners/admins can access this functionality");
    };

    stockItems.values().toArray().filter(func(item) { item.isLowStock });
  };

  public query ({ caller }) func getTodaysSales() : async [Sale] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Access denied: Only owners/admins can access this functionality");
    };

    let now = Time.now();
    sales.values().toArray().filter(func(sale) { now - sale.timestamp <= 86400000000000 });
  };

  public query ({ caller }) func getSalesReports() : async SalesReports {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Access denied: Only owners/admins can access this functionality");
    };

    let now = Time.now();
    let oneDayNanos : Int = 24 * 60 * 60 * 1_000_000_000;
    let thirtyDaysNanos : Int = 30 * 24 * 60 * 60 * 1_000_000_000;

    let allSales = sales.values().toArray();
    let dailySalesMap = Map.empty<Int, Nat>();
    let monthlySalesMap = Map.empty<Text, Nat>();
    let productBreakdownMap = Map.empty<Nat, Nat>();

    let totalRevenue = allSales.foldLeft(0, func(acc, sale) { acc + sale.totalPrice });
    let totalSales = allSales.size();

    for (sale in allSales.values()) {
      let day = Int.abs((now - sale.timestamp) / oneDayNanos);
      switch (dailySalesMap.get(day)) {
        case (null) {
          dailySalesMap.add(day, sale.totalPrice);
        };
        case (?amount) {
          dailySalesMap.add(day, amount + sale.totalPrice);
        };
      };

      let month = Int.abs((now - sale.timestamp) / thirtyDaysNanos);
      let monthKey = (if (month < 10) { "0" } else { "" }) # month.toText();
      switch (monthlySalesMap.get(monthKey)) {
        case (null) {
          monthlySalesMap.add(monthKey, sale.totalPrice);
        };
        case (?amount) {
          monthlySalesMap.add(monthKey, amount + sale.totalPrice);
        };
      };

      switch (productBreakdownMap.get(sale.stockItemId)) {
        case (null) {
          productBreakdownMap.add(sale.stockItemId, sale.quantity);
        };
        case (?count) {
          productBreakdownMap.add(sale.stockItemId, count + sale.quantity);
        };
      };
    };

    let dailySales = dailySalesMap.toArray();
    let monthlySales = monthlySalesMap.toArray();
    let productBreakdown = productBreakdownMap.toArray();

    {
      totalRevenue;
      totalSales;
      dailySales;
      monthlySales;
      productBreakdown;
    };
  };

  public query ({ caller }) func getExpiringStockItems() : async [StockItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Access denied: Only admins can access this functionality");
    };

    let now = Time.now();
    stockItems.values().toArray().filter(
      func(item) {
        switch (item.expiryDate) {
          case (null) { false };
          case (?expiry) { expiry > now and expiry - now <= 30 * 24 * 60 * 60 * 1_000_000_000 };
        };
      }
    );
  };

  public query ({ caller }) func getExpiredStockItems() : async [StockItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Access denied: Only admins can access this functionality");
    };

    let now = Time.now();
    stockItems.values().toArray().filter(
      func(item) {
        switch (item.expiryDate) {
          case (null) { false };
          case (?expiry) { expiry <= now };
        };
      }
    );
  };
};

