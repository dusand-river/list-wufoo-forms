import React from "react";
import { Thead, Tr, Th } from "@chakra-ui/react";

interface ITableHeadProps {
  activeForm: boolean;
}
const TableHead: React.FC<ITableHeadProps> = ({ activeForm }) => {
  return (
    <Thead>
      <Tr>
        <Th>Helm Name</Th>
        <Th>Boat Name</Th>
        <Th>Class</Th>
        <Th>Sail number</Th>
        {activeForm && <Th>Rating</Th>}
        {activeForm && <Th>Fleet</Th>}
      </Tr>
    </Thead>
  );
};

export default TableHead;
