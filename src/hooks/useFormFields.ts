import { useEffect, useState } from "react";
import apiClient, { CanceledError } from "../services/apiClient";
import api, { API_ID } from "../config/api";
import { IForm } from "./useForms";

export interface FormFields {
  Title: string;
  ID: string;
  Type: string;
  isRequired: string;
  SubFields: [
    {
      ID: string;
      Label: string;
    }
  ];
  Choices: [{ Label: string }];
}
// interface Props {
//   form: Form;
// }
const useFormFields = (form: IForm) => {
  const [fields, setFields] = useState<FormFields[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  if (form?.Hash) {
    useEffect(() => {
      const controler = new AbortController();
      setLoading(true);

      apiClient
        .get(api.getUri(API_ID, "/fields", form.Hash), {
          auth: api.getAuth(API_ID),
          signal: controler.signal,
        })
        .then((res) => {
          // console.log(res.data);
          setFields(res.data.Fields);
          setLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setLoading(false);
          setError(err.message);
        });

      return () => controler.abort(); //to cancel first call in dev
    }, [form]);
  }
  return { fields, error, isLoading };
};

export default useFormFields;
