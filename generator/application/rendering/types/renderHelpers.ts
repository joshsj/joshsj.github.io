import { FormatDate, FormatDateTime, FormatTime } from "@application/utilities/formatting";
import { Feature, FeatureName } from "@models";

type UrlFor = ((name: FeatureName, filename: string) => string) & ((feature: Feature) => string);

type RenderHelpers = {
  urlFor: UrlFor;
  formatDate: FormatDate;
  formatTime: FormatTime;
  formatDateTime: FormatDateTime;
};

export { UrlFor, RenderHelpers };
