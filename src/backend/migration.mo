module {
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

  type OldActor = {
    siteContent : OldSiteContent;
  };

  type NewActor = {
    siteContent : NewSiteContent;
  };

  public func run(old : OldActor) : NewActor {
    let newSiteContent : NewSiteContent = {
      old.siteContent with
      facebookUrl = "https://facebook.com/AurelieFineJew";
      instagramUrl = "https://instagram.com/AurelieFineJew";
      xUrl = "https://x.com/AurelieFineJew";
    };
    { siteContent = newSiteContent };
  };
};
