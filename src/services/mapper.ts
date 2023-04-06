import { FormFields } from "../hooks/useFormFields";

interface IEntry {
  name?: string;
  email?: string;
  boatName?: string;
  class?: string;
  sailNo?: string;
  firstName?: string;
  lastName?: string;
  phrfNFS?: string;
  phrfFS?: string;
}

const Map: { [key: string]: string } = {
  firstName: "First",
  lastName: "Last",
  boat: "Boat Name",
  sailNo: "SailNumber",
  email: "Email",
  class: "Make/Model",
  phrfFS: "Flying Sails ASP",
  phrfNFS: "Non-Flying Sails ASP",
  name: "Name",
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

  //     if (entries.length > 0) {
  //     const mappedLine = mapEntry(entries[0], msf);
  //     lines.push(mappedLine);
  //   }
  //  TEST
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
    //console.log(row);
    if (row) {
      const idx = row?.ID;
      mapped[fld] = entry[idx!];
    }
  }
  //  console.log("mapped:", mapped);
  return mapped;
};

export default mapEntries;
