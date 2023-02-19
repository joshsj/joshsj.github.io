import { FeatureStore } from "@application/stores/types";
import { dateComparer } from "@application/utilities/comparers";
import { formatDate, formatDateTime, formatTime, prettyDate } from "@application/utilities/formatting";
import { Config, D } from "@models";
import { DependencyContainer } from "tsyringe";
import { makeUrlFor } from "./helpers/urlFor";
import { makePugRenderer } from "./pug";
import { Renderers, RenderHelpers } from "./types";

const registerRendering = (c: DependencyContainer) => {
  c.register<RenderHelpers>(D.renderHelpers, {
    useFactory: (c) => ({
      urlFor: makeUrlFor(c.resolve(D.featureStore), c.resolve(D.locators)),
      dateComparer,
      formatDate,
      formatTime,
      formatDateTime,
      prettyDate,
    }),
  });

  c.register<Renderers>(D.renderers, {
    useFactory: (c) => {
      const featureStore = c.resolve<FeatureStore>(D.featureStore);
      const renderHelpers = c.resolve<RenderHelpers>(D.renderHelpers);
      const config = c.resolve<Config>(D.config);

      const renderers: Renderers = {
        pug: makePugRenderer(featureStore, renderHelpers, config),
      };

      return renderers;
    },
  });
};

export { registerRendering };
