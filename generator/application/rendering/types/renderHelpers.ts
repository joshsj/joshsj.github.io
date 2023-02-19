import { Comparer } from "@application/utilities/comparers";
import { FormatDate, FormatDateTime, FormatTime, PrettyDate } from "@application/utilities/formatting";
import { Feature, FeatureName } from "@models";

type UrlFor = ((name: FeatureName, filename: string) => string) & ((feature: Feature) => string);

type RenderHelpers = {
  urlFor: UrlFor;
  dateComparer: Comparer<Date>;
  formatDate: FormatDate;
  formatTime: FormatTime;
  formatDateTime: FormatDateTime;
  prettyDate: PrettyDate;
};

export { UrlFor, RenderHelpers };
