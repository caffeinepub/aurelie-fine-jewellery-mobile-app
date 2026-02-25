import Text "mo:core/Text";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Storage "blob-storage/Storage";
import Stripe "stripe/stripe";
import OutCall "http-outcalls/outcall";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";


// Apply migration logic

actor {
  // Time Constants
  let cancellationWindowHours = 12;
  let nanosPerHour = 3_600_000_000_000;
  let cancellationWindowNanos = cancellationWindowHours * nanosPerHour;

  // Media Constants
  let maxImagesPerProduct = 5;

  public type Gender = {
    #boys;
    #girls;
  };

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
    category : Text;
    media : ProductMedia;
    gender : Gender;
  };

  public type ProductCreate = {
    id : Text;
    name : Text;
    description : Text;
    priceInCents : Nat;
    inStock : Bool;
    category : Text;
    media : ProductMedia;
    gender : Gender;
  };

  public type CategoryCarousels = {
    images1 : [Storage.ExternalBlob];
    images2 : [Storage.ExternalBlob];
  };

  public type CarouselSlide = {
    visualContent : Storage.ExternalBlob;
    urlRedirect : Text;
    enabled : Bool;
    order : Nat;
  };

  public type CategoryHeader = {
    image : Storage.ExternalBlob;
    redirectUrl : Text;
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
    facebookUrl : Text;
    instagramUrl : Text;
    xUrl : Text;
  };

  public type UserProfile = {
    name : Text;
    email : Text;
    phone : Text;
    address : Text;
    dob : Text;
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

  public type Category = {
    name : Text;
    description : Text;
    displayOrder : Nat;
    isActive : Bool;
    primaryImage : Storage.ExternalBlob;
    images : [Storage.ExternalBlob];
  };

  public type CategoryCreate = {
    name : Text;
    description : Text;
    displayOrder : Nat;
    isActive : Bool;
    primaryImage : Storage.ExternalBlob;
    images : [Storage.ExternalBlob];
  };

  public type BannerMessage = {
    message : Text;
    order : Nat;
    enabled : Bool;
  };

  // Storage
  let products = Map.empty<Text, Product>();
  let orders = Map.empty<Text, Order>();
  let inquiries = Map.empty<Text, CustomerInquiry>();
  let carouselSlides = Map.empty<Nat, CarouselSlide>();
  let bridalSlides = Map.empty<Nat, CarouselSlide>();
  let essentialsSlides = Map.empty<Nat, CarouselSlide>();
  let everydayWearSlides = Map.empty<Nat, CarouselSlide>();
  let engagementSlides = Map.empty<Nat, CarouselSlide>();
  let birthstoneSlides = Map.empty<Nat, CarouselSlide>();
  let ringsSlides = Map.empty<Nat, CarouselSlide>();
  let categoryCarousels = Map.empty<Text, CategoryCarousels>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let carouselRedirects = Map.empty<Text, Text>();
  let bannerMessages = Map.empty<Nat, BannerMessage>();
  let categoryHeaders = Map.empty<Text, CategoryHeader>();
  let categories = Map.empty<Text, Category>();

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
    facebookUrl = "https://facebook.com/AurelieFineJew";
    instagramUrl = "https://instagram.com/AurelieFineJew";
    xUrl = "https://x.com/AurelieFineJew";
  };

  // Stripe Integration
  var stripeConfig : ?Stripe.StripeConfiguration = null;

  include MixinStorage();

  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  func getCategoryMap(category : Text) : Map.Map<Nat, CarouselSlide> {
    switch (category) {
      case ("homepage") { carouselSlides };
      case ("bridal") { bridalSlides };
      case ("essentials") { essentialsSlides };
      case ("everydaywear") { everydayWearSlides };
      case ("engagement") { engagementSlides };
      case ("birthstone") { birthstoneSlides };
      case ("rings") { ringsSlides };
      case (_) { Runtime.trap("Invalid category") };
    };
  };

  // ---------- Banner Message Management (Admin Only) ----------
  public shared ({ caller }) func addBannerMessage(message : Text, order : Nat, enabled : Bool) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add banner messages");
    };

    let newMessage : BannerMessage = {
      message;
      order;
      enabled;
    };

    bannerMessages.add(order, newMessage);

    order;
  };

  public shared ({ caller }) func updateBannerMessage(order : Nat, message : Text, enabled : Bool) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update banner messages");
    };

    switch (bannerMessages.get(order)) {
      case (null) { Runtime.trap("Message not found") };
      case (?existing) {
        let updatedMessage : BannerMessage = {
          existing with
          message;
          enabled;
        };
        bannerMessages.add(order, updatedMessage);
      };
    };
  };

  public shared ({ caller }) func deleteBannerMessage(order : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete banner messages");
    };

    if (not bannerMessages.containsKey(order)) {
      Runtime.trap("Message not found");
    };

    bannerMessages.remove(order);
  };

  public query ({ caller }) func getAllBannerMessages() : async [BannerMessage] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view banner messages");
    };
    bannerMessages.values().toArray();
  };

  // ---------- Category Header Row Management ----------
  public shared ({ caller }) func setCategoryHeader(categorySlug : Text, header : CategoryHeader) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can set category headers");
    };
    categoryHeaders.add(categorySlug, header);
  };

  public query ({ caller }) func getCategoryHeader(categorySlug : Text) : async ?CategoryHeader {
    categoryHeaders.get(categorySlug);
  };

  public query ({ caller }) func getAllCategoryHeaders() : async [(Text, CategoryHeader)] {
    categoryHeaders.toArray();
  };

  // ------------- Category Management (Admin Only) -------------
  public shared ({ caller }) func addCategory(categoryInput : CategoryCreate) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add categories");
    };
    let category : Category = {
      name = categoryInput.name;
      description = categoryInput.description;
      displayOrder = categoryInput.displayOrder;
      isActive = categoryInput.isActive;
      primaryImage = categoryInput.primaryImage;
      images = categoryInput.images;
    };
    categories.add(category.name, category);
  };

  public shared ({ caller }) func updateCategory(name : Text, categoryInput : CategoryCreate) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update categories");
    };
    switch (categories.get(name)) {
      case (null) { Runtime.trap("Category not found") };
      case (?_) {
        let category : Category = {
          name = categoryInput.name;
          description = categoryInput.description;
          displayOrder = categoryInput.displayOrder;
          isActive = categoryInput.isActive;
          primaryImage = categoryInput.primaryImage;
          images = categoryInput.images;
        };
        categories.add(name, category);
      };
    };
  };

  public shared ({ caller }) func setCategoryStatus(name : Text, isActive : Bool) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update category status");
    };
    switch (categories.get(name)) {
      case (null) { Runtime.trap("Category not found") };
      case (?category) {
        let updatedCategory = {
          category with
          isActive
        };
        categories.add(name, updatedCategory);
      };
    };
  };

  public shared ({ caller }) func reorderCategories(newOrder : [Text]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can reorder categories");
    };

    for ((index, name) in newOrder.enumerate()) {
      switch (categories.get(name)) {
        case (null) { Runtime.trap("Category not found: " # name) };
        case (?category) {
          let updatedCategory = {
            category with
            displayOrder = index : Nat;
          };
          categories.add(name, updatedCategory);
        };
      };
    };
  };

  public shared ({ caller }) func updateCategoryImages(name : Text, images : [Storage.ExternalBlob]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update category images");
    };
    switch (categories.get(name)) {
      case (null) { Runtime.trap("Category not found") };
      case (?category) {
        let updatedCategory = {
          category with
          images
        };
        categories.add(name, updatedCategory);
      };
    };
  };

  public shared ({ caller }) func updateCategoryPrimaryImage(name : Text, primaryImage : Storage.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update category primary image");
    };
    switch (categories.get(name)) {
      case (null) { Runtime.trap("Category not found") };
      case (?category) {
        let updatedCategory = {
          category with
          primaryImage
        };
        categories.add(name, updatedCategory);
      };
    };
  };

  public query ({ caller }) func getCategory(name : Text) : async ?Category {
    categories.get(name);
  };

  public query ({ caller }) func getAllCategories() : async [Category] {
    categories.values().toArray();
  };

  // ------------- Slide Management --------------
  public shared ({ caller }) func addCategorySlide(category : Text, newSlide : CarouselSlide) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add category slides");
    };

    let categoryMap = getCategoryMap(category);

    if (categoryMap.size() >= 5) {
      Runtime.trap("Maximum of 5 slides allowed in the category");
    };

    categoryMap.add(newSlide.order, newSlide);
  };

  public shared ({ caller }) func updateCategorySlide(category : Text, slideIndex : Nat, updatedSlide : CarouselSlide) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update category slides");
    };

    if (slideIndex >= 5) {
      Runtime.trap("Invalid slide index. Maximum of 5 slides allowed.");
    };

    getCategoryMap(category).add(slideIndex, updatedSlide);
  };

  public shared ({ caller }) func toggleCategorySlide(category : Text, slideIndex : Nat, enabled : Bool) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can toggle category slides");
    };

    if (slideIndex >= 5) {
      Runtime.trap("Invalid slide index. Maximum of 5 slides allowed.");
    };

    switch (getCategoryMap(category).get(slideIndex)) {
      case (null) { Runtime.trap("Slide does not exist") };
      case (?slide) {
        let updatedSlide : CarouselSlide = {
          visualContent = slide.visualContent;
          urlRedirect = slide.urlRedirect;
          enabled;
          order = slide.order;
        };
        getCategoryMap(category).add(slideIndex, updatedSlide);
      };
    };
  };

  public shared ({ caller }) func removeCategorySlide(category : Text, slideIndex : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can remove category slides");
    };

    if (slideIndex >= 5) {
      Runtime.trap("Invalid slide index. Maximum of 5 slides allowed.");
    };

    getCategoryMap(category).remove(slideIndex);
  };

  public shared ({ caller }) func reorderCategorySlides(category : Text, newOrder : [Nat]) : async () {
    // Fixed typo: was accessControlControlState (double "Control")
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can reorder category slides");
    };

    if (newOrder.size() > 5) {
      Runtime.trap("Maximum of 5 slides allowed in the category");
    };

    let categoryMap = getCategoryMap(category);
    let newCategorySlides = Map.empty<Nat, CarouselSlide>();

    for ((index, slideIndex) in newOrder.enumerate()) {
      switch (categoryMap.get(slideIndex)) {
        case (null) { Runtime.trap("Slide does not exist") };
        case (?slide) {
          let updatedSlide : CarouselSlide = {
            visualContent = slide.visualContent;
            urlRedirect = slide.urlRedirect;
            enabled = slide.enabled;
            order = index;
          };
          newCategorySlides.add(index, updatedSlide);
        };
      };
    };

    let mappedSlides = newCategorySlides.map<Nat, CarouselSlide, CarouselSlide>(
      func(_index, slide) { slide }
    );
    categoryMap.clear();
    for ((index, slide) in mappedSlides.entries()) {
      categoryMap.add(index, slide);
    };
  };

  public query ({ caller }) func getAllCategorySlides(category : Text) : async [CarouselSlide] {
    getCategoryMap(category).values().toArray();
  };

  // -------------- Category Carousel Management --------------
  public shared ({ caller }) func updateCategoryCarousel(category : Text, carouselNumber : Nat, images : [Storage.ExternalBlob]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update the carousel");
    };

    if (carouselNumber != 1 and carouselNumber != 2) {
      Runtime.trap("Invalid carousel number");
    };

    let carousels = switch (categoryCarousels.get(category)) {
      case (null) { { images1 = []; images2 = [] } };
      case (?existing) { existing };
    };

    let updatedCarousels = if (carouselNumber == 1) {
      { carousels with images1 = images };
    } else {
      { carousels with images2 = images };
    };

    categoryCarousels.add(category, updatedCarousels);
  };

  public query ({ caller }) func getCategoryCarousel(category : Text, carouselNumber : Nat) : async [Storage.ExternalBlob] {
    switch (categoryCarousels.get(category)) {
      case (null) { [] };
      case (?carousels) {
        if (carouselNumber == 1) { carousels.images1 } else if (carouselNumber == 2) { carousels.images2 } else {
          [];
        };
      };
    };
  };

  public shared ({ caller }) func updateCarouselRedirect(category : Text, redirectUrl : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update carousel redirects");
    };
    carouselRedirects.add(category, redirectUrl);
  };

  public query ({ caller }) func getCarouselRedirect(category : Text) : async ?Text {
    carouselRedirects.get(category);
  };

  // --------------- Stripe Integration ---------------
  public query ({ caller }) func isStripeConfigured() : async Bool {
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

  public query ({ caller }) func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // --------------- User Profile Management ---------------
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
  };

  public shared ({ caller }) func assignAdminRole(userPrincipal : Principal) : async () {
    AccessControl.assignRole(accessControlState, caller, userPrincipal, #admin);
  };

  // --------------- Site Content Management (Admin Only) ---------------
  public shared ({ caller }) func updateSiteContent(newContent : SiteContent) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update site content");
    };
    siteContent := newContent;
  };

  public query func getSiteContent() : async SiteContent {
    siteContent;
  };

  public query func getWebsiteMetadata() : async {
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

  public query func getContactInfo() : async {
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

  // --------------- Product Management (Admin Only) ---------------
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
      category = product.category;
      media = product.media;
      gender = product.gender;
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
      category = product.category;
      media = product.media;
      gender = product.gender;
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

  // --------------- Order Management ---------------
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
    // Only authenticated users can cancel orders
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can cancel orders");
    };

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
