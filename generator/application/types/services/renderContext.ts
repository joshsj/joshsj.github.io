import { UrlFor } from "./renderers/helpers";
import { FormatDate, FormatDateTime, FormatTime } from "@application/utilities/formatting";
import { FeatureFor, FeatureName } from "@models";

type RenderHelpers = {
  urlFor: UrlFor;
  formatDate: FormatDate;
  formatTime: FormatTime;
  formatDateTime: FormatDateTime;
};

type RenderData = Readonly<{ [K in FeatureName as `${K}s`]: FeatureFor<K>[] }>;

type RenderContext = RenderHelpers & RenderData;

type GetRenderContext = () => RenderContext;

export { RenderHelpers, RenderData, RenderContext, GetRenderContext };
