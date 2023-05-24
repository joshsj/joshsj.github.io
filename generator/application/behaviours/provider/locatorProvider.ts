import { ILocator, ILocatorProvider } from "@application/behaviours/types";
import { Asset, Entity, EntityFor, EntityName, Page, Post } from "@models";

type Locators = { [K in EntityName]: ILocator<EntityFor<K>> | undefined };

class LocatorProvider implements ILocatorProvider {
  private readonly locators: Locators;

  constructor(asset: ILocator<Asset>, page: ILocator<Page>, post: ILocator<Post>) {
    this.locators = { asset, collection: undefined, page, post };
  }

  get<T extends Entity>(name: T["name"]): ILocator<T> | undefined {
    return this.locators[name];
  }
}

export { LocatorProvider };
