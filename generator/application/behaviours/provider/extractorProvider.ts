import { IExtractor, IExtractorProvider } from "@application/behaviours/types";
import { Asset, Collection, Feature, FeatureFor, FeatureName, Page, Post } from "@models";

type Extractors = { [K in FeatureName]: IExtractor<FeatureFor<K>> | undefined };

class ExtractorProvider implements IExtractorProvider {
  private readonly extractors: Extractors;

  constructor(collection: IExtractor<Collection>, page: IExtractor<Page>, post: IExtractor<Post>) {
    this.extractors = { asset: undefined, collection, page, post };
  }

  get<T extends Feature>(name: T["name"]): IExtractor<T> | undefined {
    // TODO why is this a thing
    return this.extractors[name] as any;
  }
}

export { ExtractorProvider };
