// Migration module to add category field to Product
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Storage "blob-storage/Storage";
import Stripe "stripe/stripe";
import AccessControl "authorization/access-control";

// Temporary types for migration
module {
  type ProductMedia = {
    video : ?Storage.ExternalBlob;
    images : [Storage.ExternalBlob];
  };

  type OldProduct = {
    id : Text;
    name : Text;
    description : Text;
    priceInCents : Nat;
    inStock : Bool;
    media : ProductMedia;
  };

  type OldActor = {
    products : Map.Map<Text, OldProduct>;
    orders : Map.Map<Text, {
      id : Text;
      customer : Principal.Principal;
      productId : Text;
      quantity : Nat;
      totalPriceInCents : Nat;
      status : {
        #pending;
        #confirmed;
        #shipped;
        #delivered;
        #cancelled : { reason : Text };
      };
      upiId : Text;
      timestamp : Int;
      cancellable : Bool;
      shippingAddress : {
        name : Text;
        email : Text;
        phone : Text;
        address : Text;
      };
    }>;
    inquiries : Map.Map<Text, {
      id : Text;
      customer : Principal.Principal;
      name : Text;
      email : Text;
      message : Text;
      response : ?Text;
    }>;
    carouselSlides : Map.Map<Nat, {
      visualContent : Storage.ExternalBlob;
      urlRedirect : Text;
      enabled : Bool;
      order : Nat;
    }>;
    bridalSlides : Map.Map<Nat, {
      visualContent : Storage.ExternalBlob;
      urlRedirect : Text;
      enabled : Bool;
      order : Nat;
    }>;
    essentialsSlides : Map.Map<Nat, {
      visualContent : Storage.ExternalBlob;
      urlRedirect : Text;
      enabled : Bool;
      order : Nat;
    }>;
    everydayWearSlides : Map.Map<Nat, {
      visualContent : Storage.ExternalBlob;
      urlRedirect : Text;
      enabled : Bool;
      order : Nat;
    }>;
    engagementSlides : Map.Map<Nat, {
      visualContent : Storage.ExternalBlob;
      urlRedirect : Text;
      enabled : Bool;
      order : Nat;
    }>;
    birthstoneSlides : Map.Map<Nat, {
      visualContent : Storage.ExternalBlob;
      urlRedirect : Text;
      enabled : Bool;
      order : Nat;
    }>;
    ringsSlides : Map.Map<Nat, {
      visualContent : Storage.ExternalBlob;
      urlRedirect : Text;
      enabled : Bool;
      order : Nat;
    }>;
    categoryCarousels : Map.Map<Text, {
      images1 : [Storage.ExternalBlob];
      images2 : [Storage.ExternalBlob];
    }>;
    userProfiles : Map.Map<Principal.Principal, {
      name : Text;
      email : Text;
      phone : Text;
      address : Text;
    }>;
    siteContent : {
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
    stripeConfig : ?Stripe.StripeConfiguration;
    accessControlState : AccessControl.AccessControlState;
  };

  type NewProduct = {
    id : Text;
    name : Text;
    description : Text;
    priceInCents : Nat;
    inStock : Bool;
    category : Text;
    media : ProductMedia;
  };

  type NewActor = {
    products : Map.Map<Text, NewProduct>;
    orders : Map.Map<Text, {
      id : Text;
      customer : Principal.Principal;
      productId : Text;
      quantity : Nat;
      totalPriceInCents : Nat;
      status : {
        #pending;
        #confirmed;
        #shipped;
        #delivered;
        #cancelled : { reason : Text };
      };
      upiId : Text;
      timestamp : Int;
      cancellable : Bool;
      shippingAddress : {
        name : Text;
        email : Text;
        phone : Text;
        address : Text;
      };
    }>;
    inquiries : Map.Map<Text, {
      id : Text;
      customer : Principal.Principal;
      name : Text;
      email : Text;
      message : Text;
      response : ?Text;
    }>;
    carouselSlides : Map.Map<Nat, {
      visualContent : Storage.ExternalBlob;
      urlRedirect : Text;
      enabled : Bool;
      order : Nat;
    }>;
    bridalSlides : Map.Map<Nat, {
      visualContent : Storage.ExternalBlob;
      urlRedirect : Text;
      enabled : Bool;
      order : Nat;
    }>;
    essentialsSlides : Map.Map<Nat, {
      visualContent : Storage.ExternalBlob;
      urlRedirect : Text;
      enabled : Bool;
      order : Nat;
    }>;
    everydayWearSlides : Map.Map<Nat, {
      visualContent : Storage.ExternalBlob;
      urlRedirect : Text;
      enabled : Bool;
      order : Nat;
    }>;
    engagementSlides : Map.Map<Nat, {
      visualContent : Storage.ExternalBlob;
      urlRedirect : Text;
      enabled : Bool;
      order : Nat;
    }>;
    birthstoneSlides : Map.Map<Nat, {
      visualContent : Storage.ExternalBlob;
      urlRedirect : Text;
      enabled : Bool;
      order : Nat;
    }>;
    ringsSlides : Map.Map<Nat, {
      visualContent : Storage.ExternalBlob;
      urlRedirect : Text;
      enabled : Bool;
      order : Nat;
    }>;
    categoryCarousels : Map.Map<Text, {
      images1 : [Storage.ExternalBlob];
      images2 : [Storage.ExternalBlob];
    }>;
    userProfiles : Map.Map<Principal.Principal, {
      name : Text;
      email : Text;
      phone : Text;
      address : Text;
    }>;
    siteContent : {
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
    stripeConfig : ?Stripe.StripeConfiguration;
    accessControlState : AccessControl.AccessControlState;
  };

  // Migration function called by the main actor via the with-clause
  public func run(old : OldActor) : NewActor {
    let newProducts = old.products.map<Text, OldProduct, NewProduct>(
      func(_id, oldProduct) {
        { oldProduct with category = "uncategorized" }; // Default to uncategorized
      }
    );
    { old with products = newProducts };
  };
};
