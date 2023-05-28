import { IEntityStore } from "@application/stores/types";
import { ExtractDataResult } from "@models/steps/generate";
import { ILogger } from "@application/services/types";
import { IAddFileDependenciesStep } from "@application/pipeline/types";
import { Entity } from "@models";

class AddFileDependencies implements IAddFileDependenciesStep {
  constructor(private readonly store: IEntityStore, private readonly logger: ILogger) {}

  async execute({ entitys }: ExtractDataResult): Promise<ExtractDataResult> {
    const toBuild = new Set(entitys);
    const add = (...entitys: (Entity | undefined)[]) => entitys.forEach((f) => f && toBuild.add(f));
    let pagesAdded = false;

    for (const entity of entitys) {
      if (!pagesAdded && (entity.name === "post" || entity.name === "page")) {
        add(...this.store.allBy("page"));
        pagesAdded = true;
        this.logger.log("Added pages as build dependencies");
      }

      if (entity.name === "collection") {
        add(this.store.allBy("page").find((x) => x.title === "Collections"));
        this.logger.log(`Added collection page as build dependencies `);
      }
    }

    return { entitys: [...toBuild] };
  }
}

export { AddFileDependencies };
