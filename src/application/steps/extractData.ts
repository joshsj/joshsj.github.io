import { Extractors } from "@application/extraction/types";
import { SomethingCategory, SomethingFor } from "@domain";
import { Step } from "@lib/pipeline";
import { CategoriseFilesResult, ExtractDataResult } from "./types";

const extractData =
  (extractors: Extractors): Step<CategoriseFilesResult, ExtractDataResult> =>
  async (files) => {
    const extract = <T extends SomethingCategory>(category: T): SomethingFor<T>[] => {
      const extractor = extractors[category];

      return files[category].map((file) => {
        const { content, data } = extractor(file);

        return { category, file: file.with({ content }), ...data };
      });
    };

    return {
      asset: extract("asset"),
      page: extract("page"),
      post: extract("post"),
    };
  };

export { extractData };
