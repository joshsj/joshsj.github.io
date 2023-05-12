import { Feature } from "@models";
import { ILocator } from "./locator";
import { IExtractor } from "./extractor";
import { IBuilder } from "./builder";

// TODO i'm clearly missing something

interface ILocatorProvider {
  get<T extends Feature>(name: T["name"]): ILocator<T> | undefined;
}

interface IExtractorProvider {
  get<T extends Feature>(name: T["name"]): IExtractor<T> | undefined;
}

interface IBuilderProvider {
  get<T extends Feature>(name: T["name"]): IBuilder<T> | undefined;
}

export { ILocatorProvider, IExtractorProvider, IBuilderProvider };
