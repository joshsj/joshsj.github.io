import { File } from "./io";

// TODO work out name for object;

type Make<Category extends string, Data extends {} = {}> = {
  category: Category;
  file: File;
} & Data;

type Asset = Make<"asset">;

type PageData = { title: string };

type Page = Make<"page", PageData>;

type PostData = {
  title: string;
  created: Date;
  updated?: Date;
  tags?: [];
};

type Post = Make<"post", PostData>;

type Something = Asset | Page | Post;

type SomethingCategory = Something["category"];

type SomethingFor<T extends SomethingCategory> = Something & { category: T };

export { Asset, PageData, Page, PostData, Post, Something, SomethingCategory, SomethingFor };
