import { FormFields } from "../hooks/useFormFields";
import setAdditionalSailwaveFields from "./sailwave";
import { capitalizeFirstLetters } from "./text";

export interface IEntry {
  bhycId?: string;
  name?: string;
  boat?: string;
  class?: string;
  sailNo?: string;
  fleet?: string;
  rating?: string;
  division?: number;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  phrfNFS?: string;
  phrfFS?: string;
  homePhone?: string;
  cellPhone?: string;
  insuranceCompany?: string;
  insurancePolicyNumber?: string;
  phrfCertificate?: string;
  selectionFleet?: string;
  needPhrfCertificate?: string;
  [key: string]: any;
}

export const Map: { [key: string]: string } = {
  bhycId: "Membership Number",
  name: "Name",
  boat: "Boat Name",
  class: "Make/Model",
  sailNo: "Sail Number",
  email: "Email",
  firstName: "First",
  lastName: "Last",
  phrfFS: "Flying Sails ASP",
  phrfNFS: "Non-Flying Sails ASP",
  homePhone: "Home Phone Number",
  cellPhone: "Cell Phone Number",
  insuranceCompany: "Insurance Company",
  insurancePolicyNumber: "Policy Number",
  phrfCertificate: "PHRF Certificate Number",
  selectionFleet: "Flying Sails (includes PHRF Certificate)",
};

interface ImapEntriesProps {
  fields: FormFields[];
  entries: {}[];
}

type TmapperSimpleFields = {
  Title?: string;
  ID?: string;
};

const getMapperSimpleFields = (
  fields: FormFields[]
): TmapperSimpleFields[] | undefined => {
  const msf: TmapperSimpleFields[] = [];
  let msfLine: TmapperSimpleFields = { Title: "", ID: "" };

  fields.forEach((ff) => {
    if (ff.Choices && ff.Choices.length > 0) {
      ff.Choices.forEach((choice) =>
        msf.push({ Title: choice.Label, ID: ff.ID })
      );
    } else {
      if (ff.SubFields && ff.SubFields.length > 0) {
        ff.SubFields.forEach((SubField) =>
          msf.push({ Title: SubField.Label, ID: SubField.ID })
        );
      } else {
        // all other fields
        msf.push({ Title: ff.Title, ID: ff.ID });
      }
    }
  });
  return msf;
};

export const mapEntries = ({ fields, entries }: ImapEntriesProps): IEntry[] => {
  const lines: IEntry[] = [];

  const msf = getMapperSimpleFields(fields);

  for (let i = 0; i < entries.length; i++) {
    const mappedLine = mapEntry(entries[i], msf);
    lines.push(mappedLine);
  }
  return lines;
};

const mapEntry = (
  entry: any,
  msf: TmapperSimpleFields[] | undefined
): IEntry => {
  const mapped: { [key: string]: string } = {};

  let row: TmapperSimpleFields = {};

  for (let fld in Map) {
    let row1 = msf?.find((field) => {
      return field.Title === Map[fld];
    });
    row = row1!;

    if (row) {
      const idx = row?.ID;
      mapped[fld] = entry[idx!];
    }
  }

  // generated fields
  mapped.name = getName(mapped.lastName, mapped.firstName);
  mapped.boat = capitalizeFirstLetters(mapped.boat);
  // phone
  mapped.phone = getPhone(mapped.homePhone, mapped.cellPhone);

  return setAdditionalSailwaveFields(mapped);
  // return mapped;
};

export const getName = (
  lastName: string | undefined,
  firstName: string | undefined
) => {
  return capitalizeFirstLetters(
    !lastName ? firstName : `${lastName}, ${firstName}`
  );
};
const getPhone = (home: string | undefined, mobile: string | undefined) => {
  if (mobile) return mobile;
  return home ? home : "";
};

export default mapEntries;
