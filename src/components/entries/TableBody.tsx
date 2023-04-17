import React from "react";
import { Tbody, Tr, Td } from "@chakra-ui/react";
import { IEntry, getName } from "../../services/mapper";
import { ITableColumn } from "../../config/table";

interface ITableBodyProps {
  columns: ITableColumn[];
  tableData: IEntry[];
}

const TableBody: React.FC<ITableBodyProps> = ({
  columns,
  tableData,
  //active,
}) => {
  return (
    <Tbody>
      {tableData &&
        tableData.map((data: IEntry, row) => {
          const rowId = data.bhycId ? data.bhycId : row;
          return (
            <Tr key={rowId}>
              {columns.map((column: ITableColumn, colIdx) => {
                return <Td key={colIdx}>{data[column.key]}</Td>;
              })}
            </Tr>
          );
        })}
    </Tbody>
  );
};

export default TableBody;
