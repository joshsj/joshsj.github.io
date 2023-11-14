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

type Resource = Asset | Collection | Page | Post;

type ResourceName = Resource["name"];

type ResourceFor<T extends ResourceName> = Resource & { name: T };

export { Asset, Collection, CollectionData, PageData, Page, PostData, Post, Resource, ResourceName, ResourceFor };
