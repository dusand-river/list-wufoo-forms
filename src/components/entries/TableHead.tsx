import React from "react";
import { Thead, Tr, Th } from "@chakra-ui/react";
import { ITableColumn } from "../../config/table";

interface ITableHeadProps {
  // active: boolean;
  columns: ITableColumn[];
}

const TableHead: React.FC<ITableHeadProps> = ({ columns }) => {
  const handleSortingChange = (column: ITableColumn) => {
    column.sortable
      ? console.log("Pressed", column)
      : console.log("Not Sortable");
  };
  //   console.log("TableHead", active, columns);
  //   console.log("Display Columns", displayColumns);

  return (
    <Thead>
      <Tr>
        {columns &&
          columns.map((column: ITableColumn) => {
            return (
              <Th
                style={{ textAlign: "left" }}
                key={column.key}
                onClick={() => handleSortingChange(column)}
              >
                {column.label}
              </Th>
            );

            // return column.active ? (
            //   <Th key={column.key} onClick={() => handleSortingChange(column)}>
            //     {column.label}
            //   </Th>
            // ) : null;
          })}
      </Tr>
    </Thead>
  );
};

export default TableHead;
