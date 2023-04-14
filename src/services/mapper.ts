import { FormFields } from "../hooks/useFormFields";
import { capitalizeFirstLetters } from "./text";

export interface IEntry {
  name?: string;
  email?: string;
  boatName?: string;
  class?: string;
  sailNo?: string;
  firstName?: string;
  lastName?: string;
  phrfNFS?: string;
  phrfFS?: string;
  homePhone?: string;
  cellPhone?: string;
  bhycId?: string;
  insuranceCompany?: string;
  insurancePolicyNumber?: string;
  phrfCertificate?: string;
}

const Map: { [key: string]: string } = {
  firstName: "First",
  lastName: "Last",
  boatName: "Boat Name",
  sailNo: "Sail Number",
  email: "Email",
  class: "Make/Model",
  phrfFS: "Flying Sails ASP",
  phrfNFS: "Non-Flying Sails ASP",
  name: "Name",
  homePhone: "Home Phone Number",
  cellPhone: "Cell Phone Number",
  bhycId: "Membership Number",
  insuranceCompany: "Insurance Company",
  insurancePolicyNumber: "Policy Number",
  phrfCertificate: "PHRF Certificate Number",
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
  // generate name
  mapped.name = capitalizeFirstLetters(
    !mapped.lastName
      ? mapped.firstName
      : `${mapped.lastName}, ${mapped.firstName}`
  );
  mapped.name = getName(mapped.lastName, mapped.firstName);
  return mapped;
};

export const getName = (
  lastName: string | undefined,
  firstName: string | undefined
) => {
  return capitalizeFirstLetters(
    !lastName ? firstName : `${lastName}, ${firstName}`
  );
};

export default mapEntries;
