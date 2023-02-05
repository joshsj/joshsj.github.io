import { FormatDate, FormatDateTime, FormatTime } from "@application/utilities";
import { Something, SomethingCategory, SomethingFor } from "@domain";

type UrlFor = ((category: SomethingCategory, filename: string) => string) &
  ((something: Something, filename?: undefined) => string);

type RenderHelpers = {
  urlFor: UrlFor;
  formatDate: FormatDate;
  formatTime: FormatTime;
  formatDateTime: FormatDateTime;
};

type RenderData = Readonly<{
  [K in Exclude<SomethingCategory, "postAsset"> as `${K}s`]: SomethingFor<K>[];
}>;

type RenderContext = RenderHelpers & RenderData;

type SiteContext = Something[];

export { UrlFor, SiteContext, RenderHelpers, RenderData, RenderContext };
