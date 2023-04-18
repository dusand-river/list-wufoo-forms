import React, { useEffect, useState } from "react";
import { Table, TableContainer } from "@chakra-ui/react";

import { ITableColumn } from "../../config/table";
import { IEntry } from "../../services/mapper";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

interface ITableProps {
  columns: ITableColumn[];
  data: IEntry[];
  handleSorting: (column: string, sortOrder: string) => void;
}

const TableComp: React.FC<ITableProps> = ({ columns, data, handleSorting }) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <TableHead columns={columns} handleSorting={handleSorting} />
        <TableBody tableData={data} columns={columns} />
      </Table>
    </TableContainer>
  );
};

export default TableComp;
