import { D } from "@models";
import { DependencyContainer } from "tsyringe";
import { defaultExtractors } from "./defaultExtractors";
import { makeFeatureNameFor } from "./featureNameFor";
import { FeatureNameFor } from "./types";
import { DefaultExtractors } from "./types/defaultExtractors";

const registerServices = (c: DependencyContainer) => {
  c.register<FeatureNameFor>(D.featureNameFor, {
    useFactory: (c) => makeFeatureNameFor(c.resolve(D.identifiers)),
  });

  c.register<DefaultExtractors>(D.defaultExtractors, { useValue: defaultExtractors });
};

export { registerServices };
