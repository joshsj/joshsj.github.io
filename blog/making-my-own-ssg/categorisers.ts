// "asset" | "page" | "post";
type Category = (Post | Asset | Page)["category"];

// Produces "assetDir" | "pageDir" | "postDir"
type Key = `${Category}Categoriser`;

type Categorisers = { [K in Key]: (file: File) => Category };