import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Storage "blob-storage/Storage";

module {
  // Old Types
  type OldGender = {
    #boys;
    #girls;
  };

  type OldProductMedia = {
    video : ?Storage.ExternalBlob;
    images : [Storage.ExternalBlob];
  };

  type OldProduct = {
    id : Text;
    name : Text;
    description : Text;
    priceInCents : Nat;
    inStock : Bool;
    category : Text;
    media : OldProductMedia;
    gender : OldGender;
    createdAt : Time.Time;
  };

  type OldProductCreate = {
    id : Text;
    name : Text;
    description : Text;
    priceInCents : Nat;
    inStock : Bool;
    category : Text;
    media : OldProductMedia;
    gender : OldGender;
  };

  type OldProductUpdate = {
    name : ?Text;
    description : ?Text;
    priceInCents : ?Nat;
    inStock : ?Bool;
    category : ?Text;
    media : ?OldProductMedia;
    gender : ?OldGender;
  };

  type OldCategoryCarousels = {
    images1 : [Storage.ExternalBlob];
    images2 : [Storage.ExternalBlob];
  };

  type OldCarouselSlide = {
    visualContent : Storage.ExternalBlob;
    urlRedirect : Text;
    enabled : Bool;
    order : Nat;
  };

  type OldCategoryHeader = {
    image : Storage.ExternalBlob;
    redirectUrl : Text;
  };

  type OldOrderStatus = {
    #pending;
    #confirmed;
    #shipped;
    #delivered;
    #cancelled : { reason : Text };
  };

  type OldShippingAddress = {
    name : Text;
    email : Text;
    phone : Text;
    address : Text;
  };

  type OldOrder = {
    id : Text;
    customer : Principal;
    productId : Text;
    quantity : Nat;
    totalPriceInCents : Nat;
    status : OldOrderStatus;
    upiId : Text;
    timestamp : Int;
    cancellable : Bool;
    shippingAddress : OldShippingAddress;
  };

  type OldCustomerInquiry = {
    id : Text;
    customer : Principal;
    name : Text;
    email : Text;
    message : Text;
    response : ?Text;
  };

  type OldSiteContent = {
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

  type OldUserProfile = {
    name : Text;
    email : Text;
    phone : Text;
    address : Text;
    dob : Text;
  };

  type OldOrderCreate = {
    id : Text;
    customer : Principal;
    productId : Text;
    quantity : Nat;
    totalPriceInCents : Nat;
    upiId : Text;
    shippingAddress : OldShippingAddress;
  };

  type OldCancelReason = {
    reason : Text;
  };

  type OldCategory = {
    name : Text;
    description : Text;
    displayOrder : Nat;
    isActive : Bool;
    primaryImage : Storage.ExternalBlob;
    images : [Storage.ExternalBlob];
  };

  type OldCategoryCreate = {
    name : Text;
    description : Text;
    displayOrder : Nat;
    isActive : Bool;
    primaryImage : Storage.ExternalBlob;
    images : [Storage.ExternalBlob];
  };

  type OldBannerMessage = {
    message : Text;
    order : Nat;
    enabled : Bool;
  };

  type OldActor = {
    products : Map.Map<Text, OldProduct>;
    orders : Map.Map<Text, OldOrder>;
    inquiries : Map.Map<Text, OldCustomerInquiry>;
    carouselSlides : Map.Map<Nat, OldCarouselSlide>;
    bridalSlides : Map.Map<Nat, OldCarouselSlide>;
    essentialsSlides : Map.Map<Nat, OldCarouselSlide>;
    everydayWearSlides : Map.Map<Nat, OldCarouselSlide>;
    engagementSlides : Map.Map<Nat, OldCarouselSlide>;
    birthstoneSlides : Map.Map<Nat, OldCarouselSlide>;
    ringsSlides : Map.Map<Nat, OldCarouselSlide>;
    categoryCarousels : Map.Map<Text, OldCategoryCarousels>;
    userProfiles : Map.Map<Principal, OldUserProfile>;
    carouselRedirects : Map.Map<Text, Text>;
    bannerMessages : Map.Map<Nat, OldBannerMessage>;
    categoryHeaders : Map.Map<Text, OldCategoryHeader>;
    categories : Map.Map<Text, OldCategory>;
    siteContent : OldSiteContent;
  };

  // New Types
  type NewGender = {
    #boys;
    #girls;
  };

  type RingVariants = {
    sizes : [Text];
    colours : [Text];
  };

  type NewProductMedia = {
    video : ?Storage.ExternalBlob;
    images : [Storage.ExternalBlob];
  };

  type NewProduct = {
    id : Text;
    name : Text;
    description : Text;
    priceInCents : Nat;
    inStock : Bool;
    category : Text;
    media : NewProductMedia;
    gender : NewGender;
    createdAt : Time.Time;
    ringVariants : ?RingVariants;
  };

  type NewProductCreate = {
    id : Text;
    name : Text;
    description : Text;
    priceInCents : Nat;
    inStock : Bool;
    category : Text;
    media : NewProductMedia;
    gender : NewGender;
    ringVariants : ?RingVariants;
  };

  type NewProductUpdate = {
    name : ?Text;
    description : ?Text;
    priceInCents : ?Nat;
    inStock : ?Bool;
    category : ?Text;
    media : ?NewProductMedia;
    gender : ?NewGender;
    ringVariants : ?RingVariants;
  };

  type NewCategoryCarousels = {
    images1 : [Storage.ExternalBlob];
    images2 : [Storage.ExternalBlob];
  };

  type NewCarouselSlide = {
    visualContent : Storage.ExternalBlob;
    urlRedirect : Text;
    enabled : Bool;
    order : Nat;
  };

  type NewCategoryHeader = {
    image : Storage.ExternalBlob;
    redirectUrl : Text;
  };

  type NewOrderStatus = {
    #pending;
    #confirmed;
    #shipped;
    #delivered;
    #cancelled : { reason : Text };
  };

  type NewShippingAddress = {
    name : Text;
    email : Text;
    phone : Text;
    address : Text;
  };

  type NewOrder = {
    id : Text;
    customer : Principal;
    productId : Text;
    quantity : Nat;
    totalPriceInCents : Nat;
    status : NewOrderStatus;
    upiId : Text;
    timestamp : Int;
    cancellable : Bool;
    shippingAddress : NewShippingAddress;
    ringSize : ?Text;
    metalColour : ?Text;
  };

  type NewCustomerInquiry = {
    id : Text;
    customer : Principal;
    name : Text;
    email : Text;
    message : Text;
    response : ?Text;
  };

  type NewSiteContent = {
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

  type NewUserProfile = {
    name : Text;
    email : Text;
    phone : Text;
    address : Text;
    dob : Text;
  };

  type NewOrderCreate = {
    id : Text;
    customer : Principal;
    productId : Text;
    quantity : Nat;
    totalPriceInCents : Nat;
    upiId : Text;
    shippingAddress : NewShippingAddress;
    ringSize : ?Text;
    metalColour : ?Text;
  };

  type NewCancelReason = {
    reason : Text;
  };

  type NewCategory = {
    name : Text;
    description : Text;
    displayOrder : Nat;
    isActive : Bool;
    primaryImage : Storage.ExternalBlob;
    images : [Storage.ExternalBlob];
    video : ?Storage.ExternalBlob;
  };

  type NewCategoryCreate = {
    name : Text;
    description : Text;
    displayOrder : Nat;
    isActive : Bool;
    primaryImage : Storage.ExternalBlob;
    images : [Storage.ExternalBlob];
    video : ?Storage.ExternalBlob;
  };

  type NewBannerMessage = {
    message : Text;
    order : Nat;
    enabled : Bool;
  };

  type NewActor = {
    products : Map.Map<Text, NewProduct>;
    orders : Map.Map<Text, NewOrder>;
    inquiries : Map.Map<Text, NewCustomerInquiry>;
    carouselSlides : Map.Map<Nat, NewCarouselSlide>;
    bridalSlides : Map.Map<Nat, NewCarouselSlide>;
    essentialsSlides : Map.Map<Nat, NewCarouselSlide>;
    everydayWearSlides : Map.Map<Nat, NewCarouselSlide>;
    engagementSlides : Map.Map<Nat, NewCarouselSlide>;
    birthstoneSlides : Map.Map<Nat, NewCarouselSlide>;
    ringsSlides : Map.Map<Nat, NewCarouselSlide>;
    categoryCarousels : Map.Map<Text, NewCategoryCarousels>;
    userProfiles : Map.Map<Principal, NewUserProfile>;
    carouselRedirects : Map.Map<Text, Text>;
    bannerMessages : Map.Map<Nat, NewBannerMessage>;
    categoryHeaders : Map.Map<Text, NewCategoryHeader>;
    categories : Map.Map<Text, NewCategory>;
    siteContent : NewSiteContent;
  };

  public func run(old : OldActor) : NewActor {
    {
      products = old.products.map<Text, OldProduct, NewProduct>(
        func(_id, oldProduct) {
          {
            id = oldProduct.id;
            name = oldProduct.name;
            description = oldProduct.description;
            priceInCents = oldProduct.priceInCents;
            inStock = oldProduct.inStock;
            category = oldProduct.category;
            media = oldProduct.media;
            gender = oldProduct.gender;
            createdAt = oldProduct.createdAt;
            ringVariants = null;
          };
        }
      );
      orders = old.orders.map<Text, OldOrder, NewOrder>(
        func(_id, oldOrder) {
          {
            id = oldOrder.id;
            customer = oldOrder.customer;
            productId = oldOrder.productId;
            quantity = oldOrder.quantity;
            totalPriceInCents = oldOrder.totalPriceInCents;
            status = oldOrder.status;
            upiId = oldOrder.upiId;
            timestamp = oldOrder.timestamp;
            cancellable = oldOrder.cancellable;
            shippingAddress = oldOrder.shippingAddress;
            ringSize = null;
            metalColour = null;
          };
        }
      );
      inquiries = old.inquiries;
      carouselSlides = old.carouselSlides;
      bridalSlides = old.bridalSlides;
      essentialsSlides = old.essentialsSlides;
      everydayWearSlides = old.everydayWearSlides;
      engagementSlides = old.engagementSlides;
      birthstoneSlides = old.birthstoneSlides;
      ringsSlides = old.ringsSlides;
      categoryCarousels = old.categoryCarousels;
      userProfiles = old.userProfiles;
      carouselRedirects = old.carouselRedirects;
      bannerMessages = old.bannerMessages;
      categoryHeaders = old.categoryHeaders;
      categories = old.categories.map<Text, OldCategory, NewCategory>(
        func(_name, oldCategory) {
          {
            oldCategory with
            video = null;
          };
        }
      );
      siteContent = old.siteContent;
    };
  };
};
