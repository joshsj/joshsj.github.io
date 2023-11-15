type PostData = { title: string; created: Date; updated?: Date; tags?: [] };
type PageData = { title: string };

type Post = { category: "post"; file: File } & PostData;
type Page = { category: "page"; file: File } & PageData;
type Asset = { category: "asset"; file: File };