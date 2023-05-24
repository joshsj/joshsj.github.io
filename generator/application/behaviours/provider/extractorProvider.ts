import { IExtractor, IExtractorProvider } from "@application/behaviours/types";
import { Asset, Collection, Entity, EntityFor, EntityName, Page, Post } from "@models";

type Extractors = { [K in EntityName]: IExtractor<EntityFor<K>> | undefined };

class ExtractorProvider implements IExtractorProvider {
  private readonly extractors: Extractors;

  constructor(
    asset: IExtractor<Asset>,
    collection: IExtractor<Collection>,
    page: IExtractor<Page>,
    post: IExtractor<Post>
  ) {
    this.extractors = { asset, collection, page, post };
  }

  get<T extends Entity>(name: T["name"]): IExtractor<T> {
    // TODO why is this a thing
    return this.extractors[name] as any;
  }
}

export { ExtractorProvider };
