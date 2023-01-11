import { IContent, ILocation, IProcessor } from "../types";
import { IConfig } from "../../config";
import { render } from "pug";
import { Location } from "../location";

class PageProcessor implements IProcessor {
  constructor(private readonly config: IConfig) {}

  processes({ segments, extension }: ILocation): boolean {
    return extension === ".pug" && segments.at(0) === this.config.pageDir;
  }

  async process(location: ILocation, source: string): Promise<IContent> {
    return {
      data: render(source),
      location: new Location([], location.name, ".html", location.sep),
    };
  }
}

export { PageProcessor };
