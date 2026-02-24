import Map "mo:core/Map";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";

import Time "mo:core/Time";
import Text "mo:core/Text";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Order "mo:core/Order";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";

// Declare persistent data store types (Maps)

actor {
  let accessControlState = AccessControl.initState();
  include MixinStorage();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
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
  };

  type Sale = {
    id : Nat;
    stockItemId : Nat;
    quantity : Nat;
    totalPrice : Nat;
    timestamp : Int;
  };

  type RevenueOverview = {
    totalRevenue : Nat;
    monthlyRevenue : Nat;
    productBreakdown : [(Nat, Nat)];
  };

  type IncomeSummary = {
    totalIncome : Nat;
    monthlyIncome : Nat;
    todaysIncome : Nat;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let stockItems = Map.empty<Nat, StockItem>();
  let sales = Map.empty<Nat, Sale>();

  var nextStockItemId = 1;
  var nextSaleId = 1;

  // User Profile Management
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
    userProfiles.add(caller, profile);
  };

  // Stock Management
  public shared ({ caller }) func addStockItem(name : Text, category : Text, quantity : Nat, unitPrice : Nat, lowStockThreshold : Nat, image : ?Storage.ExternalBlob) : async Nat {
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
    };

    stockItems.add(item.id, item);
    nextStockItemId += 1;
    item.id;
  };

  public shared ({ caller }) func updateStockItem(id : Nat, name : Text, category : Text, quantity : Nat, unitPrice : Nat, lowStockThreshold : Nat, image : ?Storage.ExternalBlob) : async () {
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
        };
        stockItems.add(id, updated);
      };
    };
  };

  // Sales Management
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
        };

        stockItems.add(item.id, updatedItem);
        sales.add(sale.id, sale);
        nextSaleId += 1;
        sale.id;
      };
    };
  };

  // Queries
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

    let trending = stockItems.values().toArray().filter(func(item) { item.isTrending });
    trending;
  };

  public query ({ caller }) func getLowStockItems() : async [StockItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Access denied: Only owners/admins can access this functionality");
    };

    let lowStock = stockItems.values().toArray().filter(func(item) { item.isLowStock });
    lowStock;
  };

  public query ({ caller }) func getTodaysSales() : async [Sale] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Access denied: Only owners/admins can access this functionality");
    };

    let now = Time.now();
    let todaysSales = sales.values().toArray().filter(func(sale) { now - sale.timestamp <= 86400000000000 });
    todaysSales;
  };

  public query ({ caller }) func getRevenueOverview() : async RevenueOverview {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Access denied: Only owners/admins can access this functionality");
    };

    let now = Time.now();
    let monthlySales = sales.values().toArray().filter(func(sale) { now - sale.timestamp <= 2592000000000000 });

    let productBreakdownList = List.empty<(Nat, Nat)>();
    for ((productId, _) in stockItems.entries()) {
      let salesCount = sales.values().toArray().filter(func(sale) { sale.stockItemId == productId }).size();
      productBreakdownList.add((productId, salesCount));
    };

    let totalRevenue = sales.values().toArray().foldLeft(0, func(acc, sale) { acc + sale.totalPrice });
    let monthlyRevenue = monthlySales.foldLeft(0, func(acc, sale) { acc + sale.totalPrice });

    {
      totalRevenue;
      monthlyRevenue;
      productBreakdown = productBreakdownList.toArray();
    };
  };

  public query ({ caller }) func getIncomeSummary() : async IncomeSummary {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Access denied: Only owners/admins can access this functionality");
    };

    let now = Time.now();
    let todaysSales = sales.values().toArray().filter(func(sale) { now - sale.timestamp <= 86400000000000 });
    let monthlySales = sales.values().toArray().filter(func(sale) { now - sale.timestamp <= 2592000000000000 });

    let totalIncome = sales.values().toArray().foldLeft(0, func(acc, sale) { acc + sale.totalPrice });
    let monthlyIncome = monthlySales.foldLeft(0, func(acc, sale) { acc + sale.totalPrice });
    let todaysIncome = todaysSales.foldLeft(0, func(acc, sale) { acc + sale.totalPrice });

    {
      totalIncome;
      monthlyIncome;
      todaysIncome;
    };
  };
};
