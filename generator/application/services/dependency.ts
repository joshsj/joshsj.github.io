import { D } from "@models";
import { DependencyContainer } from "tsyringe";
import { defaultExtractors } from "./defaultExtractors";
import { makeFeatureNameFor } from "./featureNameFor";
import { DefaultBuilders, FeatureNameFor } from "./types";
import { DefaultExtractors } from "./types/defaultExtractors";
import { defaultBuilders } from "@application/services/defaultBuilders";

const registerServices = (c: DependencyContainer) => {
  c.register<FeatureNameFor>(D.featureNameFor, {
    useFactory: (c) => makeFeatureNameFor(c.resolve(D.identifiers)),
  });

  c.register<DefaultBuilders>(D.defaultBuilders, { useValue: defaultBuilders });
  c.register<DefaultExtractors>(D.defaultExtractors, { useValue: defaultExtractors });
};

export { registerServices };
