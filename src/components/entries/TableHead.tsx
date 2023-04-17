import React from "react";
import { Thead, Tr, Th } from "@chakra-ui/react";

interface ICol {
  key: string;
  label: string;
  sortable: boolean;
  active: boolean;
}
const columns: ICol[] = [
  { key: "name", label: "Helm Name", sortable: true, active: true },
  { key: "boat", label: "Boat Name", sortable: true, active: true },
  { key: "class", label: "Class", sortable: true, active: true },
  { key: "sailNo", label: "Sail number", sortable: true, active: true },
  { key: "rating", label: "Rating", sortable: false, active: false },
  { key: "fleet", label: "Fleet", sortable: true, active: false },
];

interface ITableHeadProps {
  activeForm: boolean;
  //   columns: [];
}
const TableHead: React.FC<ITableHeadProps> = ({ activeForm }) => {
  const handleSortingChange = (column: ICol) => {
    column.sortable
      ? console.log("Pressed", column)
      : console.log("Not Sortable");
  };

  return (
    <Thead>
      <Tr>
        {columns &&
          columns.map((line: ICol) => {
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
