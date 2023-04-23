import { useEffect, useState } from "react";
import { IForm } from "../hooks/useForms";
import apiClient, { CanceledError } from "../services/apiClient";
import api, { API_ID } from "../config/api";
import { Heading, List, ListItem, Text } from "@chakra-ui/react";
import { FormFields } from "../hooks/useFormFields";

interface Props {
  form: IForm | null;
}

const FormField = ({ form }: Props) => {
  const [fields, setFields] = useState<FormFields[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controler = new AbortController();
    setLoading(true);
    if (form) {
      apiClient
        .get(api.getUri(API_ID, "/fields", form?.Hash), {
          auth: api.getAuth(API_ID),
          signal: controler.signal,
        })
        .then((res) => {
          setFields(res.data.Fields);
          setLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setLoading(false);
          setError(err.message);
        });

      return () => controler.abort(); //to cancel first call in dev
    }
  }, [form]);

  return (
    <>
      <Heading marginBottom={3} fontSize="4xl">
        Form {form?.Name} Fields
      </Heading>
      <List>
        {fields.map((field) => (
          <ListItem key={field.ID}>
            <Text textAlign="left">{field.Title.slice(0, 40)}</Text>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default FormField;
