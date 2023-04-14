// download file using file-saver

import { saveAs } from "file-saver";
import { IEntry } from "./mapper";

export const downloadByFileSaver = (table: IEntry[]) => {
  console.log("downloadByFileSaver ");
  console.log("table", table);
  var blob = new Blob(["Hello, world!"], { type: "text/plain;charset=utf-8" });
  saveAs(blob, "hello world.txt");
};
