import { Entity } from "@models";
import { ILocator } from "./locator";
import { IExtractor } from "./extractor";
import { IBuilder } from "./builder";

// TODO i'm clearly missing something

interface IExtractorProvider {
  get<T extends Entity>(name: T["name"]): IExtractor<T>;
}

interface ILocatorProvider {
  get<T extends Entity>(name: T["name"]): ILocator<T> | undefined;
}

interface IBuilderProvider {
  get<T extends Entity>(name: T["name"]): IBuilder<T> | undefined;
}

export { ILocatorProvider, IExtractorProvider, IBuilderProvider };
