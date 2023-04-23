import React, { useState } from "react";
import { Thead, Tr, Th, Icon } from "@chakra-ui/react";
import { MdArrowUpward, MdArrowDownward } from "react-icons/md";
import { ITableColumn } from "../config/interface";
import { TSortOrder } from "../hooks/useSortableTable";

interface ITableHeadProps {
  columns: ITableColumn[];
  handleSorting: (sortField: string, sortOrder: TSortOrder) => void;
}

const TableHead: React.FC<ITableHeadProps> = ({ columns, handleSorting }) => {
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");

  const handleSortingChange = (column: ITableColumn) => {
    if (column.sortable) {
      //console.log("Pressed", column);
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
                {`${column.label}  `}
                {sortField === column.key && order === "asc" ? (
                  <Icon as={MdArrowUpward} />
                ) : sortField === column.key && order === "desc" ? (
                  <Icon as={MdArrowDownward} />
                ) : (
                  ""
                )}
              </Th>
            );
          })}
      </Tr>
    </Thead>
  );
};

export default TableHead;
