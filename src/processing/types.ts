import { Directory, File } from "../io";

interface IProcessor {
  /** Indicates if the file can be processed based on its path */
  processes(file: File): boolean;

  /** Processes the file returning the new content */
  process(file: File): Promise<File>;
}

interface IProcessorPipeline {
  process(files: File[]): Promise<File[]>;
}

export { IProcessor, IProcessorPipeline };
