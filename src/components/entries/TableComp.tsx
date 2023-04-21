import React from "react";
import { Table, TableContainer } from "@chakra-ui/react";

import { ITableColumn } from "../../config/table";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import useSortableTable, { TTable } from "./useSortableTable";

interface ITableCompProps {
  columns: ITableColumn[];
  data: TTable;
}
const TableComp: React.FC<ITableCompProps> = ({ columns, data }) => {
  const { sortedTable: table, sort: handleSorting } = useSortableTable(data);

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
