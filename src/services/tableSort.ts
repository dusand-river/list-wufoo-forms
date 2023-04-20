import { IEntry } from "./mapper";

interface ItableSortProps {
  tableData: { [key: string]: any }[];
  sortField: string;
  sortOrder: string;
}
const tableSort = ({ tableData, sortField, sortOrder }: ItableSortProps) => {
  if (sortField) {
    const sorted = [...tableData].sort((a, b) => {
      if (a[sortField] === null) return 1;
      if (b[sortField] === null) return -1;
      if (a[sortField] === null && b[sortField] === null) return 0;

      return (
        a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
          numeric: true,
        }) * (sortOrder === "asc" ? 1 : -1)
      );
    });
    const sortTab: IEntry[] = [...sorted];
    return sortTab;
  }
};

export default tableSort;

// type Table = Record<string, any>[]; // Define Table as an array of objects with string keys and any values

// function sortTable(table: Table, sortField: string, sortOrder: "asc" | "desc"): Table {
//   return [...table].sort((a, b) => {
//     const aValue = a[sortField];
//     const bValue = b[sortField];
//     if (aValue === bValue) {
//       return 0;
//     }
//     if (sortOrder === "asc") {
//       return aValue < bValue ? -1 : 1;
//     } else {
//       return aValue > bValue ? -1 : 1;
//     }
//   });
// }
