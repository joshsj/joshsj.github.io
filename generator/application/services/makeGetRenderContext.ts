import { Asset, Collection, Page, Post } from "@models";
import { GetRenderContext, RenderHelpers } from "@application/services/types";
import { formatDate, formatDateTime, formatTime } from "@application/utilities/formatting";
import { dateComparer } from "@application/utilities/comparers";
import { makeUrlFor } from "@application/renderers/helpers/urlFor";
import { FeatureStore } from "@application/stores/types";
import { Locators } from "@application/behaviours/types";

const getHelpers = (store: FeatureStore, locators: Locators): RenderHelpers => {
  return {
    urlFor: makeUrlFor(store, locators),
    formatDate,
    formatTime,
    formatDateTime,
  };
};

const makeGetRenderContext =
  (store: FeatureStore, locators: Locators): GetRenderContext =>
  () => {
    const assets = store.allBy("asset");

    const collections = store.allBy("collection");

    const pages = store.allBy("page");

    const posts = store
      .allBy("post")
      .sort((a, b) => dateComparer(a.created, b.created))
      .reverse();

    return { assets, pages, posts, collections, ...getHelpers(store, locators) };
  };

export { makeGetRenderContext };
