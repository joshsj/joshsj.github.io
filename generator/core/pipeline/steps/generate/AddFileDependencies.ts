import { ILogger } from "@core/services/interfaces";
import { IResourceStore } from "@core/stores/interfaces";
import { IStep } from "@kernel/pipeline/interfaces";
import { Resource } from "@core/models";
import { ExtractDataResult } from "@core/models/steps/generate";

class AddFileDependencies implements IStep<ExtractDataResult> {
  constructor(private readonly store: IResourceStore, private readonly logger: ILogger) {}

  async execute({ resources }: ExtractDataResult): Promise<ExtractDataResult> {
    const toBuild = new Set(resources);
    const add = (...resources: (Resource | undefined)[]) => resources.forEach((f) => f && toBuild.add(f));
    let pagesAdded = false;

    for (const resource of resources) {
      if (!pagesAdded && (resource.name === "post" || resource.name === "page")) {
        add(...this.store.allBy("page"));
        pagesAdded = true;
        this.logger.log("Added pages as build dependencies");
      }

      if (resource.name === "collection") {
        add(this.store.allBy("page").find((x) => x.title === "Collections"));
        this.logger.log(`Added collection page as build dependencies `);
      }
    }

    return { resources: [...toBuild] };
  }
}

export { AddFileDependencies };
