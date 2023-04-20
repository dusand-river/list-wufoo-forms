import { useState } from "react";

const useSortableTable = (data: { [key: string]: any }[]) => {
  const [tableData, setTableData] = useState(data);

  const handleSorting = (sortField: string, sortOrder: string) => {
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
      setTableData(sorted);
    }
  };

  return [tableData, handleSorting];
};

// const useSortableTable1 = <T>(data: T[]) => {
//   const [tableData, setTableData] = useState<T[]>(data);

//   const handleSorting = <T>(sortField: string, sortOrder: string) => {
//     if (sortField) {
//       const sorted = [...tableData].sort((a: T, b: T): number => {
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

//   return [tableData, handleSorting] as [T[], (sortField: string, sortOrder: string)]
// }

export default useSortableTable;
