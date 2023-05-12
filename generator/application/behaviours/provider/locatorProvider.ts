import { ILocator, ILocatorProvider } from "@application/behaviours/types";
import { Asset, Feature, FeatureFor, FeatureName, Page, Post } from "@models";

type Locators = { [K in FeatureName]: ILocator<FeatureFor<K>> | undefined };

class LocatorProvider implements ILocatorProvider {
  private readonly locators: Locators;

  constructor(asset: ILocator<Asset>, page: ILocator<Page>, post: ILocator<Post>) {
    this.locators = { asset, collection: undefined, page, post };
  }

  get<T extends Feature>(name: T["name"]): ILocator<T> | undefined {
    return this.locators[name];
  }
}

export { LocatorProvider };
