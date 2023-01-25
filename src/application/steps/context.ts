import { Something, SomethingCategory, SomethingFor } from "@domain";

type UrlFor = ((category: SomethingCategory, filename: string) => string) & ((something: Something, filename?: undefined) => string);

type RenderHelpers = { urlFor: UrlFor; };

type Context = Something[];

type RenderContextData = { [K in SomethingCategory as `${K}s`]: SomethingFor<K>[] }

type RenderContext = { current: Something } & RenderHelpers & RenderContextData;

export { UrlFor, Context, RenderHelpers, RenderContextData, RenderContext };
