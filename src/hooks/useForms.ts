import { useEffect, useState } from "react";
import apiClient, { CanceledError } from "../services/apiClient";
import api, { API_ID } from "../config/api";
import { getDefultForDisplay } from "../services/forms";

export interface IForm {
  Name: string;
  Description: string;
  Hash: string;
  isPublic: string;
  Url: string;
  StartDate: Date;
  EndDate: Date;
}

const useForms = () => {
  const [forms, setForms] = useState<IForm[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [firstActive, setFirstActive] = useState<IForm>();

  useEffect(() => {
    const controler = new AbortController();
    setLoading(true);

    apiClient
      .get(api.getUri(API_ID), {
        auth: api.getAuth(API_ID),
        signal: controler.signal,
      })
      .then((res) => {
        setForms(res.data.Forms);
        setLoading(false);
        setFirstActive(getDefultForDisplay(res.data.Forms));
        // setFirstActive(getFirstActive(res.data.Forms));
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setLoading(false);
        setError(err.message);
      });

    return () => controler.abort(); //to cancel first call in dev
  }, []);

  return { forms, error, isLoading, firstActive };
};

export default useForms;
