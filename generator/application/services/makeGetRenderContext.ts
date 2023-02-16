import { Asset, Collection, Page, Post } from "@models";
import { GetRenderContext, RenderHelpers } from "@application/types/services";
import { FeatureStore } from "@application/types/stores";
import { Locators } from "@application/types/services";
import { formatDate, formatDateTime, formatTime } from "@application/utilities/formatting";
import { dateComparer } from "@application/utilities/comparers";
import { makeUrlFor } from "@application/services/renderers/urlFor";

const getHelpers = (store: FeatureStore, locators: Locators): RenderHelpers => {
  return ({
    urlFor: makeUrlFor(store, locators),
    formatDate,
    formatTime,
    formatDateTime,
  });
};


const makeGetRenderContext =
  (store: FeatureStore, locators: Locators): GetRenderContext =>
    () => {
      // TODO add caching?

      const assets = store.filter((x): x is Asset => x.name === "asset");

      const collections = store.filter((x): x is Collection => x.name === "collection");

      const pages = store.filter((x): x is Page => x.name === "page");

      const posts = store
        .filter((x): x is Post => x.name === "post")
        .sort((a, b) => dateComparer(a.created, b.created))
        .reverse();

      return { assets, pages, posts, collections, ...getHelpers(store, locators) };
    };

export { makeGetRenderContext }