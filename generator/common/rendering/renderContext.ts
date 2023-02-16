import { Locators } from "@common/locating";
import { FeatureStore } from "@common/stores";
import { dateComparer } from "@common/utilities/comparers";
import {
  FormatDate,
  formatDate,
  FormatDateTime,
  formatDateTime,
  FormatTime,
  formatTime,
} from "@common/utilities/formatting";
import { Asset, Collection, FeatureFor, FeatureName, Page, Post } from "@models";
import { makeUrlFor, UrlFor } from "./helpers";

type RenderHelpers = {
  urlFor: UrlFor;
  formatDate: FormatDate;
  formatTime: FormatTime;
  formatDateTime: FormatDateTime;
};

type RenderData = Readonly<{ [K in FeatureName as `${K}s`]: FeatureFor<K>[] }>;

type RenderContext = RenderHelpers & RenderData;

const getHelpers = (store: FeatureStore, locators: Locators): RenderHelpers => ({
  urlFor: makeUrlFor(store, locators),
  formatDate,
  formatTime,
  formatDateTime,
});

type GetRenderContext = () => RenderContext;

const makeGetRenderContext =
  (store: FeatureStore, locators: Locators): GetRenderContext =>
  () => {
    // TODO add caching

    const assets = store.filter((x): x is Asset => x.name === "asset");

    const collections = store.filter((x): x is Collection => x.name === "collection");

    const pages = store.filter((x): x is Page => x.name === "page");

    const posts = store
      .filter((x): x is Post => x.name === "post")
      .sort((a, b) => dateComparer(a.created, b.created))
      .reverse();

    return { assets, pages, posts, collections, ...getHelpers(store, locators) };
  };

export { RenderHelpers, RenderData, RenderContext, GetRenderContext, makeGetRenderContext };
