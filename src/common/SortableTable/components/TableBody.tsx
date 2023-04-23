import React from "react";
import { Tbody, Tr, Td } from "@chakra-ui/react";
import { IEntry, getName } from "../../../services/mapper";
import { ITableColumn } from "../config/interface";

interface ITableBodyProps {
  columns: ITableColumn[];
  data: IEntry[];
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
