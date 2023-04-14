import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Form } from "../hooks/useForms";
import useFormEntries from "../hooks/useFormEntries";
import useFormFields from "../hooks/useFormFields";
import mapEntries, { IEntry, getName } from "../services/mapper";
import { BsDownload } from "react-icons/bs";
import downloadFile from "../services/download";

interface IFormEntriesProps {
  form: Form;
}

const FormEntries: React.FC<IFormEntriesProps> = ({ form }) => {
  const {
    entries,
    error: errEntries,
    isLoading: isLoadingEntries,
  } = useFormEntries(form);
  const {
    fields,
    error: errFields,
    isLoading: isLoadingFields,
  } = useFormFields(form);

  let table: IEntry[] = [];
  if (isLoadingEntries === false && isLoadingFields === false) {
    table = mapEntries({ fields: fields, entries: entries });
  }

  const handleDownload = () => {
    downloadFile(table, form?.Name);
  };

  return (
    <>
      <HStack marginBottom={3} justifyContent={"space-around"}>
        {isLoadingEntries && (
          <Spinner
            as="span"
            animation="border"
            size="lg"
            role="status"
            aria-hidden="true"
          />
        )}
        {!isLoadingEntries && (
          <Heading fontSize="3xl">{form?.Name} Entries</Heading>
        )}
        {table.length > 0 && (
          <Button
            onClick={handleDownload}
            size={"md"}
            rightIcon={<BsDownload />}
          >
            Download
          </Button>
        )}
      </HStack>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Helm Name</Th>
              <Th>Boat Name</Th>
              <Th>Class</Th>
              <Th>Sail number</Th>
            </Tr>
          </Thead>
          <Tbody>
            {table &&
              table.map((line: IEntry) => {
                return (
                  <Tr key={line.boatName}>
                    <Td>
                      {getName(line?.lastName, line?.firstName)}
                      {/* {line.lastName
                        ? `${line.lastName.toUpperCase()}, ${line.firstName?.toUpperCase()}`
                        : line.firstName?.toUpperCase()} */}
                    </Td>
                    <Td>{line.boatName}</Td>
                    <Td>{line.class}</Td>
                    <Td>{line.sailNo}</Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default FormEntries;
