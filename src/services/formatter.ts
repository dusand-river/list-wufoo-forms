import { capitalizeFirstLetters } from "../common/service/text";

export const getName = (lastName: string | undefined, firstName: string | undefined) => {
  return capitalizeFirstLetters(!lastName ? firstName : `${lastName}, ${firstName}`);
};
export const getPhone = (home: string | undefined, mobile: string | undefined) => {
  if (mobile) return mobile;
  return home ? home : "";
};
