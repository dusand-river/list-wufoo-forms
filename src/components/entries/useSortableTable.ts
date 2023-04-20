import { useState } from "react";

// const useSortableTable1 = (data: { [key: string]: any }[]) => {
//   const [tableData, setTableData] = useState(data);

//   const handleSorting = (sortField: string, sortOrder: string) => {
//     if (sortField) {
//       const sorted = [...tableData].sort((a, b) => {
//         if (a[sortField] === null) return 1;
//         if (b[sortField] === null) return -1;
//         if (a[sortField] === null && b[sortField] === null) return 0;
//         return (
//           a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
//             numeric: true,
//           }) * (sortOrder === "asc" ? 1 : -1)
//         );
//       });
//       setTableData(sorted);
//     }
//   };

//   return [tableData, handleSorting];
// };

// another option...
type Table = Record<string, any>[];

export type SortOrder = "asc" | "desc";

interface UseSortableTableOutput {
  sortedTable: Table;
  sort: (sortField: string, sortOrder: SortOrder) => void;
}

function useSortableTable(tableData: Table): UseSortableTableOutput {
  const [sortedTable, setSortedTable] = useState<Table>(tableData);

  function sort(sortField: string, sortOrder: SortOrder): void {
    if (sortField) {
      const newSortedTable = [...sortedTable].sort((a, b) => {
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) return 0;
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
          }) * (sortOrder === "asc" ? 1 : -1)
        );
      });
      setSortedTable(newSortedTable);
    }
  }
  return { sortedTable, sort };
}

export default useSortableTable;
