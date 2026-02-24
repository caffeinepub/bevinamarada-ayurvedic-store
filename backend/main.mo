import Array "mo:core/Array";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import List "mo:core/List";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Int "mo:core/Int";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  type ProductCategory = {
    #electronics;
    #clothing;
    #food;
    #furniture;
    #toys;
  };

  module ProductCategory {
    public func compare(a : ProductCategory, b : ProductCategory) : Order.Order {
      switch (a, b) {
        case (#electronics, #electronics) { #equal };
        case (#clothing, #clothing) { #equal };
        case (#food, #food) { #equal };
        case (#furniture, #furniture) { #equal };
        case (#toys, #toys) { #equal };
        case (#electronics, _) { #less };
        case (_, #electronics) { #greater };
        case (#clothing, _) { #less };
        case (_, #clothing) { #greater };
        case (#food, _) { #less };
        case (_, #food) { #greater };
        case (#furniture, _) { #less };
        case (_, #furniture) { #greater };
      };
    }
  };

  public type Product = {
    id : Nat;
    name : Text;
    category : ProductCategory;
    price : Nat;
    quantity : Nat;
    inStock : Bool;
    isHidden : Bool;
    imageUrl : ?Text;
  };

  module Product {
    public func compare(product1 : Product, product2 : Product) : Order.Order {
      Nat.compare(product1.id, product2.id);
    };
  };

  public type Customer = {
    id : Nat;
    name : Text;
    phone : Text;
    isRepeatCustomer : Bool;
  };

  module Customer {
    public func compareByName(customer1 : Customer, customer2 : Customer) : Order.Order {
      Text.compare(customer1.name, customer2.name);
    };
  };

  public type SalesOrder = {
    id : Nat;
    customerId : Nat;
    productId : Nat;
    quantity : Nat;
    status : Text;
    createdAt : Time.Time;
  };

  module SalesOrder {
    public func compareByCreatedAt(order1 : SalesOrder, order2 : SalesOrder) : Order.Order {
      Int.compare(order1.createdAt, order2.createdAt);
    };
  };

  public type Enquiry = {
    id : Nat;
    name : Text;
    phone : Text;
    message : Text;
    createdAt : Time.Time;
  };

  public type SalesReport = {
    totalSales : Nat;
    dailySales : Nat;
    monthlySales : Nat;
    productWiseSales : [(Nat, Nat)];
  };

  public type AdminDashboard = {
    todaysIncome : Nat;
    monthlyIncome : Nat;
    totalIncome : Nat;
    totalProducts : Nat;
    outOfStockProducts : Nat;
    totalEnquiries : Nat;
  };

  public type UserProfile = {
    name : Text;
    role : Text;
  };

  let products = Map.empty<Nat, Product>();
  let customers = Map.empty<Nat, Customer>();
  let salesOrders = Map.empty<Nat, SalesOrder>();
  let enquiries = Map.empty<Nat, Enquiry>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var productIdCounter = 0;
  var customerIdCounter = 0;
  var orderIdCounter = 0;
  var enquiryIdCounter = 0;

  // --- User Profile Management ---
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
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

  // --- Product Management (Admin Only) ---
  public shared ({ caller }) func addProduct(name : Text, category : ProductCategory, price : Nat, quantity : Nat, imageUrl : ?Text) : async Nat {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };
    let id = generateProductId();
    let product : Product = {
      id;
      name;
      category;
      price;
      quantity;
      inStock = quantity > 0;
      isHidden = false;
      imageUrl;
    };
    products.add(id, product);
    productIdCounter += 1;
    id;
  };

  public shared ({ caller }) func editProduct(id : Nat, name : Text, category : ProductCategory, price : Nat, quantity : Nat, imageUrl : ?Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can edit products");
    };
    let product = getProductById(id);
    let updatedProduct : Product = {
      id;
      name;
      category;
      price;
      quantity;
      inStock = quantity > 0;
      isHidden = product.isHidden;
      imageUrl;
    };
    products.add(id, updatedProduct);
  };

  public shared ({ caller }) func deleteProduct(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    if (not products.containsKey(id)) {
      Runtime.trap("Product not found");
    };
    products.remove(id);
  };

  public shared ({ caller }) func hideProduct(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can hide products");
    };
    let product = getProductById(id);
    let updatedProduct : Product = {
      id = product.id;
      name = product.name;
      category = product.category;
      price = product.price;
      quantity = product.quantity;
      inStock = product.inStock;
      isHidden = true;
      imageUrl = product.imageUrl;
    };
    products.add(id, updatedProduct);
  };

  // --- Product Queries (Public) ---
  public query func getProducts() : async [Product] {
    products.values().toArray().filter(
      func(product) {
        not product.isHidden and product.inStock;
      }
    );
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all products");
    };
    products.values().toArray();
  };

  public query func getProduct(id : Nat) : async ?Product {
    switch (products.get(id)) {
      case (?product) {
        if (product.isHidden) {
          null;
        } else {
          ?product;
        };
      };
      case (null) { null };
    };
  };

  // --- Customer Management (Admin Only) ---
  public shared ({ caller }) func addCustomer(name : Text, phone : Text) : async Nat {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add customers");
    };
    let id = generateCustomerId();
    let customer : Customer = {
      id;
      name;
      phone;
      isRepeatCustomer = false;
    };
    customers.add(id, customer);
    customerIdCounter += 1;
    id;
  };

  public shared ({ caller }) func updateRepeatCustomerStatus(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update customer status");
    };
    let customer = getCustomerById(id);
    let updatedCustomer : Customer = {
      id = customer.id;
      name = customer.name;
      phone = customer.phone;
      isRepeatCustomer = true;
    };
    customers.add(id, updatedCustomer);
  };

  public query ({ caller }) func getCustomers() : async [Customer] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view customers");
    };
    customers.values().toArray();
  };

  // --- Enquiry Handling ---
  public shared ({ caller }) func addEnquiry(name : Text, phone : Text, message : Text) : async Nat {
    let id = generateEnquiryId();
    let enquiry : Enquiry = {
      id;
      name;
      phone;
      message;
      createdAt = Time.now();
    };
    enquiries.add(id, enquiry);
    enquiryIdCounter += 1;
    id;
  };

  public query ({ caller }) func getTodaysEnquiries() : async [Enquiry] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view enquiries");
    };
    let today = Time.now();
    let todaysEnquiries = enquiries.values().toArray().filter(
      func(enquiry) {
        Time.now() - enquiry.createdAt < 86400000000000;
      }
    );
    todaysEnquiries;
  };

  public query ({ caller }) func getAllEnquiries() : async [Enquiry] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view enquiries");
    };
    enquiries.values().toArray();
  };

  // --- Reporting ---
  public query ({ caller }) func getMonthlySalesReport() : async SalesReport {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view sales reports");
    };
    let lastMonthOrders = salesOrders.values().toArray().filter(
      func(order) {
        Time.now() - order.createdAt < 2592000000000000;
      }
    );
    let monthlySales = lastMonthOrders.size();
    let totalSales = salesOrders.size();

    let productWiseSales : [(Nat, Nat)] = products.toArray().map(
      func((productId, _)) {
        let salesCount = salesOrders.values().toArray().filter(
          func(order) {
            order.productId == productId;
          }
        ).size();
        (productId, salesCount);
      }
    );
    {
      totalSales;
      dailySales = 0;
      monthlySales;
      productWiseSales;
    };
  };

  public query ({ caller }) func getAdminDashboard() : async AdminDashboard {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view dashboard");
    };

    let todaysOrders = salesOrders.values().toArray().filter(
      func(order) {
        Time.now() - order.createdAt < 86400000000000;
      }
    );

    let monthlyOrders = salesOrders.values().toArray().filter(
      func(order) {
        Time.now() - order.createdAt < 2592000000000000;
      }
    );

    let todaysIncome = todaysOrders.foldLeft(
      0,
      func(acc : Nat, order : SalesOrder) : Nat {
        switch (products.get(order.productId)) {
          case (?product) { acc + (product.price * order.quantity) };
          case (null) { acc };
        };
      }
    );

    let monthlyIncome = monthlyOrders.foldLeft(
      0,
      func(acc : Nat, order : SalesOrder) : Nat {
        switch (products.get(order.productId)) {
          case (?product) { acc + (product.price * order.quantity) };
          case (null) { acc };
        };
      }
    );

    let totalIncome = salesOrders.values().toArray().foldLeft(
      0,
      func(acc : Nat, order : SalesOrder) : Nat {
        switch (products.get(order.productId)) {
          case (?product) { acc + (product.price * order.quantity) };
          case (null) { acc };
        };
      }
    );

    let outOfStockProducts = products.values().toArray().filter(
      func(product) {
        not product.inStock;
      }
    ).size();

    {
      todaysIncome;
      monthlyIncome;
      totalIncome;
      totalProducts = products.size();
      outOfStockProducts;
      totalEnquiries = enquiries.size();
    };
  };

  // Internal helper functions
  func generateProductId() : Nat {
    productIdCounter + 1;
  };

  func generateCustomerId() : Nat {
    customerIdCounter + 1;
  };

  func generateEnquiryId() : Nat {
    enquiryIdCounter + 1;
  };

  func getProductById(id : Nat) : Product {
    switch (products.get(id)) {
      case (?product) { product };
      case (null) { Runtime.trap("Product not found") };
    };
  };

  func getCustomerById(id : Nat) : Customer {
    switch (customers.get(id)) {
      case (?customer) { customer };
      case (null) { Runtime.trap("Customer not found") };
    };
  };
};
