import React from "react";
import { Table, TableContainer } from "@chakra-ui/react";

import { ITableColumn } from "../../config/table";
import { IEntry } from "../../services/mapper";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

interface ITableProps {
  columns: ITableColumn[];
  data: IEntry[];
}

const TableComp: React.FC<ITableProps> = ({ columns, data }) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <TableHead columns={columns} />
        <TableBody tableData={data} columns={columns} />
      </Table>
    </TableContainer>
  );
};

export default TableComp;
