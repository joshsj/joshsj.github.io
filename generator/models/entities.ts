import { File } from "@models/io";

type Make<Name extends string, Data extends {} = {}> = {
  name: Name;
  file: File;
} & Data;

type Asset = Make<"asset">;

type CollectionData = { title: string; description: string };

type Collection = Make<"collection", CollectionData>;

type PageData = { title: string; displayTitle?: string; permalink?: string };

type Page = Make<"page", PageData>;

type PostData = {
  title: string;
  created: Date;
  updated?: Date;
  tags?: string[];
  collection?: string;
  draft?: boolean;
  toc: string;
  permalink?: string;
};

type Post = Make<"post", PostData>;

// TODO rename
type Feature = Asset | Collection | Page | Post;

type FeatureName = Feature["name"];

type FeatureFor<T extends FeatureName> = Feature & { name: T };

export { Asset, Collection, CollectionData, PageData, Page, PostData, Post, Feature, FeatureName, FeatureFor };
