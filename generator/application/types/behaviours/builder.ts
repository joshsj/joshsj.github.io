import { Feature } from "@models";

type Builder = (something: Feature) => Promise<string>;

export { Builder };
