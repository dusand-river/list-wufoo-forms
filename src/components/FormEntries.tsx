import { Text, Button, HStack, Spinner } from "@chakra-ui/react";
import { IForm } from "../hooks/useForms";
import useFormEntries from "../hooks/useFormEntries";
import useFormFields from "../hooks/useFormFields";
import mapEntries, { IEntry } from "../services/mapper";
import { BsDownload } from "react-icons/bs";
import downloadFile from "../services/download";
import { useEffect, useState } from "react";
import { currentActiveForms } from "../config/api";
import { getActiveColumns } from "../common/SortableTable/config/table";
import { ITableColumn } from "../common/SortableTable/config/interface";
import TableComp from "../common/SortableTable/components/TableComp";

interface IFormEntriesProps {
  form: IForm;
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
    const active = currentActiveForms.indexOf(form.Url) >= 0 ? true : false;
    setActive(active);
    const cols = getActiveColumns(active);
    setColumns(cols);
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
      <HStack marginBottom={3} justifyContent={"space-evenly"}>
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
          <Text color="blue.200" fontSize="3xl">
            {form?.Name}
          </Text>
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
      <TableComp columns={columns} data={table} />
    </>
  );
};

export default FormEntries;
