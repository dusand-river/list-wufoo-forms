import { useEffect, useState } from "react";

export type TTableRow = Record<string, any>;
export type TTable = Record<string, any>[];
export type TSortOrder = "asc" | "desc";

interface UseSortableTableOutput {
  sortedTable: TTable;
  sort: (sortField: string, sortOrder: TSortOrder) => void;
}

function useSortableTable(tableData?: TTable): UseSortableTableOutput {
  const [sortedTable, setSortedTable] = useState<TTable>([]);

  useEffect(() => {
    setSortedTable([]);
    if (tableData && tableData?.length > 0) setSortedTable(tableData);
  }, [tableData]);

  function sort(sortField: string, sortOrder: TSortOrder): void {
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
