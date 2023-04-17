import React from "react";
import { Thead, Tr, Th } from "@chakra-ui/react";
import { ITableColumn } from "../../config/table";

interface ITableHeadProps {
  activeForm: boolean;
  columns: ITableColumn[];
}
const TableHead: React.FC<ITableHeadProps> = ({ columns, activeForm }) => {
  const handleSortingChange = (column: ITableColumn) => {
    column.sortable
      ? console.log("Pressed", column)
      : console.log("Not Sortable");
  };

  return (
    <Thead>
      <Tr>
        {columns &&
          columns.map((line: ITableColumn) => {
            line.active = activeForm;
            return line.active ? (
              <Th key={line.key} onClick={() => handleSortingChange(line)}>
                {line.label}
              </Th>
            ) : null;
          })}
      </Tr>
    </Thead>
  );
};

export default TableHead;
