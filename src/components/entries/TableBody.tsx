import React from "react";
import { Tbody, Tr, Td } from "@chakra-ui/react";
import { IEntry } from "../../services/mapper";
import { ITableColumn } from "../../config/table";
import { TTable } from "./useSortableTable";

interface ITableBodyProps {
  columns: ITableColumn[];
  data: TTable;
}

const TableBody: React.FC<ITableBodyProps> = ({
  columns,
  data,
  //active,
}) => {
  return (
    <Tbody>
      {data &&
        data.map((data: IEntry, row) => {
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
