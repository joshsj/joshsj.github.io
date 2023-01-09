import { getConfig } from "./config";
import { processFiles } from "./process";

const main = async () => await processFiles(getConfig());

main();
