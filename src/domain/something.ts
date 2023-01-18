import { File } from "./io";

// TODO work out name for object;

type As<C extends string> = { category: C; file: File };

type Asset = As<"asset">;

type Page = As<"page">;

type PostData = {
  title: string;
  created: Date;
  updated?: Date;
  tags?: [];
};
type Post = PostData & As<"post">;

type Something = Asset | Page | Post;

type SomethingCategory = Something["category"];

export { Asset, Page, PostData, Post, Something, SomethingCategory };
