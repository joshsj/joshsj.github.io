import { Something, SomethingCategory, SomethingFor } from "@domain";

type UrlFor = ((category: SomethingCategory, filename: string) => string) &
  ((something: Something, filename?: undefined) => string);

type RenderHelpers = { urlFor: UrlFor };

type SiteContext = Something[];

type RenderContextData = {
  [K in Exclude<SomethingCategory, "postAsset"> as `${K}s`]: SomethingFor<K>[];
};

type RenderContext = { current: Something } & RenderHelpers & RenderContextData;

export { UrlFor, SiteContext, RenderHelpers, RenderContextData, RenderContext };
