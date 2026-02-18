import Map "mo:core/Map";
import Text "mo:core/Text";
import Storage "blob-storage/Storage";

module {
  type CategoryHeader = {
    image : Storage.ExternalBlob;
    redirectUrl : Text;
  };

  type NewActor = {
    categoryHeaders : Map.Map<Text, CategoryHeader>;
  };

  public func run(_old : {}) : NewActor {
    // New categoryHeaders field must be explicitly initialized as empty
    { categoryHeaders = Map.empty<Text, CategoryHeader>() };
  };
};
