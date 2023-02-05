import { File } from "./io";

// TODO work out name for object;

type Make<Category extends string, Data extends {} = {}> = {
  category: Category;
  file: File;
} & Data;

type Asset = Make<"asset">;
type PostAsset = Make<"postAsset">;

type CollectionData = { title: string; description: string };

type Collection = Make<"collection", CollectionData>;

type PageData = { title: string; displayTitle?: string };

type Page = Make<"page", PageData>;

type PostData = {
  title: string;
  created: Date;
  updated?: Date;
  tags?: string[];
  collection?: string;
};

type Post = Make<"post", PostData>;

type Something = Asset | Collection | Page | Post | PostAsset;

type SomethingCategory = Something["category"];

type SomethingFor<T extends SomethingCategory> = Something & { category: T };

export {
  Asset,
  Collection,
  CollectionData,
  PageData,
  Page,
  PostData,
  Post,
  Something,
  SomethingCategory,
  SomethingFor,
};
