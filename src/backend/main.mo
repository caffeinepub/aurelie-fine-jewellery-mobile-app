import Text "mo:core/Text";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Time "mo:core/Time";

// Component imports
import Storage "blob-storage/Storage";
import Stripe "stripe/stripe";
import OutCall "http-outcalls/outcall";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";

actor {
  // Time Constants
  let cancellationWindowHours = 12;
  let nanosPerHour = 3600_000_000_000;
  let cancellationWindowNanos = cancellationWindowHours * nanosPerHour;

  // Media Constants
  let maxImagesPerProduct = 5;

  // --------------- Type Definitions ---------------

  public type ProductMedia = {
    video : ?Storage.ExternalBlob;
    images : [Storage.ExternalBlob];
  };

  public type Product = {
    id : Text;
    name : Text;
    description : Text;
    priceInCents : Nat;
    inStock : Bool;
    media : ProductMedia;
  };

  public type CarouselSlide = {
    visualContent : Storage.ExternalBlob;
    urlRedirect : Text;
    enabled : Bool;
    order : Nat;
  };

  public type OrderStatus = {
    #pending;
    #confirmed;
    #shipped;
    #delivered;
    #cancelled : { reason : Text };
  };

  public type ShippingAddress = {
    name : Text;
    email : Text;
    phone : Text;
    address : Text;
  };

  public type Order = {
    id : Text;
    customer : Principal;
    productId : Text;
    quantity : Nat;
    totalPriceInCents : Nat;
    status : OrderStatus;
    upiId : Text;
    timestamp : Int;
    cancellable : Bool;
    shippingAddress : ShippingAddress;
  };

  public type CustomerInquiry = {
    id : Text;
    customer : Principal;
    name : Text;
    email : Text;
    message : Text;
    response : ?Text;
  };

  public type SiteContent = {
    contactEmail : Text;
    phoneNumber : Text;
    address : Text;
    officialName : Text;
    aboutUs : Text;
    generalInfo : Text;
    termsOfService : Text;
    privacyPolicy : Text;
    shippingPolicy : Text;
    billingPolicy : Text;
    generalDisclaimer : Text;
    footerContent : Text;
  };

  public type UserProfile = {
    name : Text;
    email : Text;
    phone : Text;
    address : Text;
  };

  public type OrderCreate = {
    id : Text;
    customer : Principal;
    productId : Text;
    quantity : Nat;
    totalPriceInCents : Nat;
    upiId : Text;
    shippingAddress : ShippingAddress;
  };

  public type CancelReason = {
    reason : Text;
  };

  public type ProductCreate = {
    id : Text;
    name : Text;
    description : Text;
    priceInCents : Nat;
    inStock : Bool;
    media : ProductMedia;
  };

  // --------------- Storage ---------------

  let products = Map.empty<Text, Product>();
  let orders = Map.empty<Text, Order>();
  let inquiries = Map.empty<Text, CustomerInquiry>();
  let carouselSlides = Map.empty<Nat, CarouselSlide>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var siteContent : SiteContent = {
    contactEmail = "contact@aurelie.com";
    phoneNumber = "+65 1234 5678";
    address = "Orchard Road, Singapore";
    officialName = "Aurelie Fine Jewellery";
    aboutUs = "Aurelie Fine Jewellery is a luxury brand offering exquisite, handcrafted pieces inspired by timeless elegance.";
    generalInfo = "We are dedicated to providing exceptional quality and craftsmanship in every piece of jewellery. Our collections feature unique designs that cater to all occasions and preferences. At Aurelie, we value sustainability and ethical practices, ensuring our materials are sourced responsibly. Our team of skilled artisans brings passion and expertise to each creation, delivering enduring beauty for our discerning clientele.";
    termsOfService = "Our terms of service outline the rights and responsibilities of both Aurélie Fine Jewellery and our customers. By using our services, you agree to comply with our policies, including order processing, payment terms, shipping procedures, return and exchange policies, and warranty information. Detailed terms are available on our website or upon request from our customer service team.";
    privacyPolicy = "Aurélie Fine Jewellery is committed to protecting your privacy and personal information. Our privacy policy details how we collect, use, store, and share your information in compliance with applicable data protection regulations. We ensure transparency in our data practices and provide options for managing your preferences and consent. You can review our full privacy policy on our website or contact us for more information.";
    shippingPolicy = "Our shipping policy covers domestic and international orders. We offer various shipping options, including standard and expedited delivery. Shipping charges and estimated delivery times are calculated at checkout. All shipments are insured and tracked for your convenience. In case of delivery issues, our customer service team is available to assist. Further details are available on our website.";
    billingPolicy = "Aurélie Fine Jewellery accepts multiple payment methods, including credit cards, debit cards, and secure online payments. Our billing policy outlines the payment process, invoicing details, taxes and fees, and refund procedures. We strive for transparency and security in all financial transactions. Please refer to our website for complete billing information or contact us with questions.";
    generalDisclaimer = "The information provided on the Aurélie Fine Jewellery website, including product descriptions, pricing, and images, is for informational purposes only. While we strive for accuracy, errors may occasionally occur. We reserve the right to correct inaccuracies and update information without prior notice. We encourage customers to contact us directly for any clarifications or specific inquiries.";
    footerContent = "Follow us on social media | LinkedIn | Facebook";
  };

  // Stripe Integration
  var stripeConfig : ?Stripe.StripeConfiguration = null;

  // Include components
  include MixinStorage();

  // Authorization (API Only)
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // --------------- Carousel Slide Management (Unchanged) ---------------
  public shared ({ caller }) func addCarouselSlide(newSlide : CarouselSlide) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add carousel slides");
    };

    if (carouselSlides.size() >= 5) {
      Runtime.trap("Maximum of 5 slides allowed in the carousel");
    };

    carouselSlides.add(newSlide.order, newSlide);
  };

  public shared ({ caller }) func updateCarouselSlide(slideIndex : Nat, updatedSlide : CarouselSlide) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update carousel slides");
    };

    if (slideIndex >= 5) {
      Runtime.trap("Invalid slide index. Maximum of 5 slides allowed.");
    };

    carouselSlides.add(slideIndex, updatedSlide);
  };

  public shared ({ caller }) func toggleCarouselSlide(slideIndex : Nat, enabled : Bool) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can toggle carousel slides");
    };

    if (slideIndex >= 5) {
      Runtime.trap("Invalid slide index. Maximum of 5 slides allowed.");
    };

    switch (carouselSlides.get(slideIndex)) {
      case (null) { Runtime.trap("Slide does not exist") };
      case (?slide) {
        let updatedSlide : CarouselSlide = {
          visualContent = slide.visualContent;
          urlRedirect = slide.urlRedirect;
          enabled;
          order = slide.order;
        };
        carouselSlides.add(slideIndex, updatedSlide);
      };
    };
  };

  public shared ({ caller }) func removeCarouselSlide(slideIndex : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can remove carousel slides");
    };

    if (slideIndex >= 5) {
      Runtime.trap("Invalid slide index. Maximum of 5 slides allowed.");
    };

    carouselSlides.remove(slideIndex);
  };

  public shared ({ caller }) func reorderCarouselSlides(newOrder : [Nat]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can reorder carousel slides");
    };

    if (newOrder.size() > 5) {
      Runtime.trap("Maximum of 5 slides allowed in the carousel");
    };

    let newCarouselSlides = Map.empty<Nat, CarouselSlide>();
    for ((index, slideIndex) in newOrder.enumerate()) {
      switch (carouselSlides.get(slideIndex)) {
        case (null) { Runtime.trap("Slide does not exist") };
        case (?slide) {
          let updatedSlide : CarouselSlide = {
            visualContent = slide.visualContent;
            urlRedirect = slide.urlRedirect;
            enabled = slide.enabled;
            order = index;
          };
          newCarouselSlides.add(index, updatedSlide);
        };
      };
    };

    // Replace old carousel with new one using map
    let mappedSlides = newCarouselSlides.map<Nat, CarouselSlide, CarouselSlide>(
      func(_index, slide) { slide }
    );
    carouselSlides.clear();
    for ((index, slide) in mappedSlides.entries()) {
      carouselSlides.add(index, slide);
    };
  };

  public query ({ caller }) func getAllCarouselSlides() : async [CarouselSlide] {
    carouselSlides.values().toArray();
  };

  // --------------- Stripe Integration (Unchanged) ---------------
  public query func isStripeConfigured() : async Bool {
    switch stripeConfig {
      case (null) { false };
      case (?_) { true };
    };
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can configure Stripe");
    };
    stripeConfig := ?config;
  };

  func getStripeConfiguration() : Stripe.StripeConfiguration {
    switch stripeConfig {
      case (null) { Runtime.trap("Stripe needs to be configured before use!") };
      case (?value) { value };
    };
  };

  public shared ({ caller }) func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can check session status");
    };
    await Stripe.getSessionStatus(getStripeConfiguration(), sessionId, transform);
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create checkout sessions");
    };
    await Stripe.createCheckoutSession(getStripeConfiguration(), caller, items, successUrl, cancelUrl, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // --------------- User Profile Management (Unchanged) ---------------
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
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

    // Auto-assign admin role if email matches
    if (profile.email == "aureliefinejewellery06@gmail.com") {
      AccessControl.assignRole(accessControlState, caller, caller, #admin);
    };
  };

  public shared ({ caller }) func assignAdminRole(userPrincipal : Principal) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can assign admin roles");
    };
    AccessControl.assignRole(accessControlState, caller, userPrincipal, #admin);
  };

  // --------------- Site Content Management (Admin Only, Unchanged) ---------------
  public shared ({ caller }) func updateSiteContent(newContent : SiteContent) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update site content");
    };
    siteContent := newContent;
  };

  public query ({ caller }) func getSiteContent() : async SiteContent {
    siteContent;
  };

  public query ({ caller }) func getWebsiteMetadata() : async {
    officialName : Text;
    termsOfService : Text;
    privacyPolicy : Text;
  } {
    {
      officialName = siteContent.officialName;
      termsOfService = siteContent.termsOfService;
      privacyPolicy = siteContent.privacyPolicy;
    };
  };

  public query ({ caller }) func getContactInfo() : async {
    contactEmail : Text;
    phoneNumber : Text;
    address : Text;
  } {
    {
      contactEmail = siteContent.contactEmail;
      phoneNumber = siteContent.phoneNumber;
      address = siteContent.address;
    };
  };

  // --------------- Product Management (Admin Only - Revised for Media Support) ---------------
  public shared ({ caller }) func addProduct(product : ProductCreate) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };
    if (product.media.images.size() > maxImagesPerProduct) {
      Runtime.trap("Cannot add more than " # maxImagesPerProduct.toText() # " images per product");
    };
    let productEntity : Product = {
      id = product.id;
      name = product.name;
      description = product.description;
      priceInCents = product.priceInCents;
      inStock = product.inStock;
      media = product.media;
    };
    products.add(product.id, productEntity);
  };

  public shared ({ caller }) func updateProduct(product : ProductCreate) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    if (product.media.images.size() > maxImagesPerProduct) {
      Runtime.trap("Cannot add more than " # maxImagesPerProduct.toText() # " images per product");
    };
    let productEntity : Product = {
      id = product.id;
      name = product.name;
      description = product.description;
      priceInCents = product.priceInCents;
      inStock = product.inStock;
      media = product.media;
    };
    products.add(product.id, productEntity);
  };

  public shared ({ caller }) func deleteProduct(productId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    products.remove(productId);
  };

  public query ({ caller }) func getProducts() : async [Product] {
    products.values().toArray();
  };

  public query ({ caller }) func getProduct(productId : Text) : async Product {
    switch (products.get(productId)) {
      case (null) { Runtime.trap("Product does not exist") };
      case (?product) { product };
    };
  };

  // --------------- Order Management (Unchanged) ---------------
  public shared ({ caller }) func createOrder(input : OrderCreate) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create orders");
    };

    if (input.customer != caller) {
      Runtime.trap("Unauthorized: Cannot create orders for other users");
    };

    let newOrder : Order = {
      id = input.id;
      customer = input.customer;
      productId = input.productId;
      quantity = input.quantity;
      totalPriceInCents = input.totalPriceInCents;
      upiId = input.upiId;
      timestamp = Time.now();
      cancellable = true;
      status = #pending;
      shippingAddress = input.shippingAddress;
    };

    orders.add(newOrder.id, newOrder);
  };

  public shared ({ caller }) func getOrders() : async [Order] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all orders");
    };
    orders.values().toArray();
  };

  public query ({ caller }) func getOrder(orderId : Text) : async Order {
    switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order does not exist") };
      case (?order) {
        if (order.customer != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only view your own orders");
        };
        order;
      };
    };
  };

  public query ({ caller }) func getCustomerOrders() : async [Order] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view their orders");
    };
    orders.values().filter(func(order : Order) : Bool { order.customer == caller }).toArray();
  };

  public shared ({ caller }) func updateOrderStatus(orderId : Text, status : OrderStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };

    switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order does not exist") };
      case (?order) {
        let updatedOrder : Order = {
          id = order.id;
          customer = order.customer;
          productId = order.productId;
          quantity = order.quantity;
          totalPriceInCents = order.totalPriceInCents;
          status;
          upiId = order.upiId;
          timestamp = order.timestamp;
          cancellable = order.cancellable;
          shippingAddress = order.shippingAddress;
        };
        orders.add(orderId, updatedOrder);
      };
    };
  };

  public shared ({ caller }) func cancelOrder(orderId : Text, cancelReason : CancelReason) : async () {
    switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order does not exist") };
      case (?order) {
        if (order.customer != caller) {
          Runtime.trap("Unauthorized: Only the order owner can cancel");
        };

        let timeElapsed = Time.now() - order.timestamp;

        if (timeElapsed > cancellationWindowNanos) {
          Runtime.trap("Cancellation period has expired");
        };

        switch (order.status) {
          case (#cancelled(_)) {
            Runtime.trap("Order is already cancelled");
          };
          case (_) {};
        };

        let updatedOrder : Order = {
          order with
          status = #cancelled(cancelReason);
          cancellable = false
        };

        orders.add(orderId, updatedOrder);
      };
    };
  };

  public query ({ caller }) func isOrderCancellable(orderId : Text) : async Bool {
    switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order does not exist") };
      case (?order) {
        if (order.customer != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only check cancellability of your own orders");
        };
        let timeElapsed = Time.now() - order.timestamp;
        switch (order.status) {
          case (#cancelled(_)) { false };
          case (_) { timeElapsed <= cancellationWindowNanos and order.cancellable };
        };
      };
    };
  };

  // --------------- Customer Inquiries ---------------
  public shared ({ caller }) func submitInquiry(inquiry : CustomerInquiry) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can submit inquiries");
    };

    if (inquiry.customer != caller) {
      Runtime.trap("Unauthorized: Cannot submit inquiries for other users");
    };

    inquiries.add(inquiry.id, inquiry);
  };

  public query ({ caller }) func getInquiries() : async [CustomerInquiry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all inquiries");
    };
    inquiries.values().toArray();
  };

  public query ({ caller }) func getInquiry(inquiryId : Text) : async CustomerInquiry {
    switch (inquiries.get(inquiryId)) {
      case (null) { Runtime.trap("Inquiry does not exist") };
      case (?inquiry) {
        if (inquiry.customer != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only view your own inquiries");
        };
        inquiry;
      };
    };
  };

  public query ({ caller }) func getCustomerInquiries() : async [CustomerInquiry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view their inquiries");
    };
    inquiries.values().filter(func(inquiry : CustomerInquiry) : Bool { inquiry.customer == caller }).toArray();
  };

  public shared ({ caller }) func respondToInquiry(inquiryId : Text, response : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can respond to inquiries");
    };

    switch (inquiries.get(inquiryId)) {
      case (null) { Runtime.trap("Inquiry does not exist") };
      case (?inquiry) {
        let updatedInquiry : CustomerInquiry = {
          id = inquiry.id;
          customer = inquiry.customer;
          name = inquiry.name;
          email = inquiry.email;
          message = inquiry.message;
          response = ?response;
        };
        inquiries.add(inquiryId, updatedInquiry);
      };
    };
  };
};
