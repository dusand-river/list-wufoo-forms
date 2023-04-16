// download file using file-saver

import { saveAs } from "file-saver";
import dayjs from "dayjs";
import { IEntry } from "./mapper";

const downloadFile = (table: IEntry[], formName: string) => {
  const lines = tableToCsv(table);
  var blob = new Blob(lines, { type: "text/plain;charset=utf-8" });
  saveAs(blob, getFileName(formName, getN14TS()));
};

const delimiter = {
  wrap: '"', // Double Quote (") character
  field: ",", // Comma field delimiter
  eol: "\n", // Newline delimiter
};

const tableToCsv = (table: IEntry[]) => {
  let header: string = "";
  let line: string = "";
  let lines: string[] = [];

  for (let ii = 0; ii < table.length; ii++) {
    const element = table[ii];

    if (!header) header = setCsvHeader(element);

    let property: keyof typeof element;
    for (property in element) {
      if (line === "") {
        line = `${delimiter.wrap}${element[property]}${delimiter.wrap}`;
      } else
        line = `${line}${delimiter.field}${delimiter.wrap}${element[property]}${delimiter.wrap}`;
    }
    line = `${line}${delimiter.eol}`;
    lines.push(line);
    line = "";
  }
  lines.unshift(header);
  return lines;
};

const setCsvHeader = (element: IEntry) => {
  let property: keyof typeof element;
  let header: string = "";
  for (property in element) {
    if (header === "") {
      header = `${delimiter.wrap}${property}${delimiter.wrap}`;
    } else
      header = `${header}${delimiter.field}${delimiter.wrap}${property}${delimiter.wrap}`;
  }
  header = `${header}${delimiter.eol}`;
  return header;
};

const getFileName = (formName: string, timeStamp?: string): string => {
  return `${formName}.${timeStamp}.csv`;
};

// Number 14 digits TimeStamp - YYYYMMDDhhmmss
const getN14TS = () => {
  return dayjs().format("YYYYMMDDhhmmss");
};

export default downloadFile;
