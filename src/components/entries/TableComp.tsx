import React, { useEffect, useState } from "react";
import { Table, TableContainer } from "@chakra-ui/react";

import { ITableColumn } from "../../config/table";
import { IEntry } from "../../services/mapper";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import tableSort from "../../services/tableSort";
//import useSortableTable from "./useSortableTable";

interface ITableProps {
  columns: ITableColumn[];
  data: IEntry[];
}

const TableComp: React.FC<ITableProps> = ({ columns, data }) => {
  // const [tableData, handleSorting] = useSortableTable(data);

  const [table, setTable] = useState<IEntry[]>([]);
  useEffect(() => setTable([...data]), [data]);
  const handleSorting = (sortField: string, sortOrder: string) => {
    const sorted: IEntry[] = tableSort({
      tableData: table,
      sortField,
      sortOrder,
    })!;
    setTable(sorted);
  };

  return (
    <TableContainer>
      <Table variant="simple">
        <TableHead {...{ columns, handleSorting }} />
        <TableBody {...{ columns, data: table }} />
      </Table>
    </TableContainer>
  );
};

export default TableComp;
