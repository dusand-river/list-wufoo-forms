// download file using file-saver

import { saveAs } from "file-saver";

export const downloadByFileSaver = () => {
  console.log("downloadByFileSaver ");
  var blob = new Blob(["Hello, world!"], { type: "text/plain;charset=utf-8" });
  saveAs(blob, "hello world.txt");
};
