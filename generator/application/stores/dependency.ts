import { makeFeatureStore } from "@infrastructure/stores";
import { D } from "@models/dependency";
import { DependencyContainer } from "tsyringe";
import { FeatureStore } from "./types";

const registerStores = (c: DependencyContainer) => {
  c.register<FeatureStore>(D.featureStore, { useValue: makeFeatureStore() });
};

export { registerStores };
