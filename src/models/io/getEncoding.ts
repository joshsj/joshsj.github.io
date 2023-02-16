import { Encoding, File } from "./file";
import binaryExtensions from "binaryextensions";

type GetEncoding = (foe: string | File) => Encoding;

const getEncoding: GetEncoding = (fos) => {
  let ext = typeof fos === "string" ? fos : fos.extension

  if (ext.startsWith(".")) {
    ext = ext.slice(1);
  }

  // Bold assumption
  return binaryExtensions.includes(ext) ? "binary" : "utf8";
};

export { GetEncoding, getEncoding };
