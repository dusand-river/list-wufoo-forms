import { IForm } from "../hooks/useForms";

export const isActive = (form: IForm): boolean => {
  const start = new Date(form.StartDate);
  const end = new Date(form.EndDate);
  const today = new Date();
  return start <= today && today < end;
};

export const getFirstActive = (forms: IForm[]): IForm | undefined => {
  const activeForm = forms.filter((form) => {
    return isActive(form);
  });
  return activeForm.length > 0 ? activeForm[0] : undefined;
};
