import { IBuilder, IBuilderProvider } from "@application/behaviours/types";
import { Asset, Entity, EntityFor, EntityName, Page, Post } from "@models";

type Builders = { [K in EntityName]: IBuilder<EntityFor<K>> | undefined };

class BuilderProvider implements IBuilderProvider {
  private readonly builders: Builders;

  constructor(asset: IBuilder<Asset>, page: IBuilder<Page>, post: IBuilder<Post>) {
    this.builders = { asset, collection: undefined, page, post };
  }

  get<T extends Entity>(name: T["name"]): IBuilder<T> | undefined {
    return this.builders[name];
  }
}

export { BuilderProvider };
