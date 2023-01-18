import { File } from "./io";

// TODO work out name for object;

type Make<Category extends string, Data extends {} = {}> = {
  file: File;
  category: Category;
} & (keyof Data extends never ? {} : { data: Data });

type Asset = Make<"asset">;

type Page = Make<"page">;

type PostData = {
  title: string;
  created: Date;
  updated?: Date;
  tags?: [];
};

type Post = Make<"post", PostData>;

type Something = Asset | Page | Post;

type SomethingCategory = Something["category"];

export { Asset, Page, PostData, Post, Something, SomethingCategory };
