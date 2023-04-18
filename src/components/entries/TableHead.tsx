import React, { useState } from "react";
import { Thead, Tr, Th } from "@chakra-ui/react";
import { ITableColumn } from "../../config/table";

interface ITableHeadProps {
  columns: ITableColumn[];
  handleSorting: (column: string, sortOrder: string) => void;
}

const TableHead: React.FC<ITableHeadProps> = ({ columns, handleSorting }) => {
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");

  const handleSortingChange = (column: ITableColumn) => {
    if (column.sortable) {
      console.log("Pressed", column);
      const sortOrder =
        column.key === sortField && order === "asc" ? "desc" : "asc";
      setSortField(column.key);
      setOrder(sortOrder);
      handleSorting(column.key, sortOrder);
    } else {
      console.log("Not Sortable");
    }
  };

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
          })}
      </Tr>
    </Thead>
  );
};

export default TableHead;
