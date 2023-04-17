import React from "react";
import { Tbody, Tr, Td } from "@chakra-ui/react";
import { IEntry, getName } from "../../services/mapper";
import { ITableColumn } from "../../config/table";

interface ITableBodyProps {
  columns: ITableColumn[];
  tableData: IEntry[];
  active: boolean;
}

const TableBody: React.FC<ITableBodyProps> = ({
  columns,
  tableData,
  active,
}) => {
  //console.log("TableBody", active, columns);
  return (
    <Tbody>
      {tableData &&
        tableData.map((data: IEntry, row) => {
          const rowId = data.bhycId ? data.bhycId : row;
          return (
            <tr key={rowId}>
              {columns.map((column: ITableColumn, colIdx) => {
                const mapped = data[column.key] ? data[column.key] : "——";
                return column.active ? <td key={colIdx}>{mapped}</td> : null;
              })}
            </tr>
          );
        })}
      {/* {table &&
        table.map((line: IEntry) => {
          return (
            <Tr key={`${line.boat}+${line.name}`}>
              <Td>{getName(line?.lastName, line?.firstName)}</Td>
              <Td>{line.boat}</Td>
              <Td>{line.class}</Td>
              <Td>{line.sailNo}</Td>
              {active && <Td>{line.rating}</Td>}
              {active && <Td>{line.fleet}</Td>}
            </Tr>
          );
        })} */}
    </Tbody>
  );
};

export default TableBody;
