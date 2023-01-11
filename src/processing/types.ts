interface ILocation {
  segments: string[];
  name: string;
  extension: string;

  readonly sep: string;
  readonly directory: string;
  readonly base: string;
  readonly full: string;
}

interface IProcessor {
  /** Indicates if the file can be processed based on its path */
  processes(location: ILocation): boolean;

  /** Processes the file returning the new content */
  process(location: ILocation, source: string): Promise<IContent>;
}

interface IContent {
  data: string;
  location: ILocation;
}

interface IProcessorPipeline {
  process(): Promise<void>;
}

export { ILocation, IProcessor, IContent, IProcessorPipeline };
