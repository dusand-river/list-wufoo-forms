import React from "react";
import { Tbody, Tr, Td } from "@chakra-ui/react";
import { IEntry, getName } from "../../services/mapper";

interface ITableBodyProps {
  table: IEntry[];
  active: boolean;
}

const TableBody: React.FC<ITableBodyProps> = ({ table, active }) => {
  return (
    <Tbody>
      {table &&
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
        })}
    </Tbody>
  );
};

export default TableBody;
