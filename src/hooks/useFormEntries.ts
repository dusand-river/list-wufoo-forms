import { useEffect, useState } from "react";
import apiClient, { CanceledError } from "../services/apiClient";
import api, { API_ID } from "../config/api";
import { IForm } from "./useForms";

// export interface Entries {
//   : string;
//   Type: string;
//   isRequired: string;
// }

const useFormFields = (form: IForm) => {
  const [entries, setEntries] = useState<[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  if (form?.Hash) {
    useEffect(() => {
      const controler = new AbortController();
      setLoading(true);

      apiClient
        .get(api.getUri(API_ID, "/entries", form.Hash), {
          auth: api.getAuth(API_ID),
          signal: controler.signal,
        })
        .then((res) => {
          //console.log(res.data);
          setEntries(res.data.Entries);
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
  return { entries, error, isLoading };
};

export default useFormFields;
