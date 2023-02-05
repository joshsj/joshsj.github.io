import { RenderHelpers, SiteContext } from "@application/steps";
import { Locators } from "@application/transformation";
import { formatDate, formatDateTime, formatTime } from "@application/utilities";
import { Asset, Collection, Page, Post } from "@domain";
import { dateComparer } from "@lib";
import { GetRenderContext } from "./types";
import { urlFor } from "./urlFor";

const getHelpers = (siteContext: SiteContext, locators: Locators): RenderHelpers => ({
  urlFor: urlFor(siteContext, locators),
  formatDate,
  formatTime,
  formatDateTime,
});

const getRenderContext =
  (siteContext: SiteContext, locators: Locators): GetRenderContext =>
  () => {
    const assets = siteContext.filter((x): x is Asset => x.category === "asset");
    const collections = siteContext.filter((x): x is Collection => x.category === "collection");
    const pages = siteContext.filter((x): x is Page => x.category === "page");
    const posts = siteContext
      .filter((x): x is Post => x.category === "post")
      .sort((a, b) => dateComparer(a.created, b.created))
      .reverse();

    return { assets, pages, posts, collections, ...getHelpers(siteContext, locators) };
  };

export { getRenderContext };
