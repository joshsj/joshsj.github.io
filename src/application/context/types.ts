import { Something, SomethingCategory, SomethingFor } from "@domain";
import { Transformers } from "@application/transformation";

type Key = Extract<SomethingCategory, "post" | "page">;

type ContextData = { [K in Key]: SomethingFor<K>[] };

type UrlFor = (category: Key, filename: string) => string;

type ContextHelpers = {
  urlFor: UrlFor;
};

type Context = { current: Something } & ContextData & ContextHelpers;

type GetContextHelpers = (data: ContextData) => ContextHelpers;

export { UrlFor, ContextData, ContextHelpers, GetContextHelpers, Context };
