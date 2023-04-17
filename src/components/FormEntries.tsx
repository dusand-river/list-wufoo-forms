import {
  Table,
  TableContainer,
  Button,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Form } from "../hooks/useForms";
import useFormEntries from "../hooks/useFormEntries";
import useFormFields from "../hooks/useFormFields";
import mapEntries, { IEntry } from "../services/mapper";
import { BsDownload } from "react-icons/bs";
import downloadFile from "../services/download";
import { useEffect, useState } from "react";
import { currentActiveForms } from "../config/api";
import TableHead from "./entries/TableHead";
import TableBody from "./entries/TableBody";
import {
  ITableColumn,
  getActiveColumns,
  getDisplayColumns,
  setActiveColumns,
} from "../config/table";

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
  const [active, setActive] = useState(false);
  const [columns, setColumns] = useState<ITableColumn[]>([]);

  useEffect(() => {
    // const cols: ReadonlyArray<ITableColumn> = [...getDisplayColumns()];
    // const idx = currentActiveForms.indexOf(form.Url);
    // if (currentActiveForms.indexOf(form.Url) >= 0) {
    //   // set current Form
    //   setActive(true);
    //   // set columns for active form
    //   const newCols = cols.map((col) => {
    //     if (col.active === false) col.active = true;
    //     return col;
    //   });
    //   setColumns(newCols);
    // } else {
    //   setActive(false);
    //   // setColumns(displayColumns);
    //   const newCols = cols.map((col) => {
    //     return col;
    //   });
    //   setColumns(newCols);
    // }

    const active = currentActiveForms.indexOf(form.Url) >= 0 ? true : false;
    setActive(active);
    //const cols = setActiveColumns(active);
    const cols = getActiveColumns(active);
    setColumns(cols);
    console.log(form?.Name, active, cols);
  }, [form]);

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
          <TableHead columns={columns} />
          <TableBody tableData={table} columns={columns} />
        </Table>
      </TableContainer>
    </>
  );
};

export default FormEntries;
