import setAdditionalSailwaveFields from "./sailwaveDefault";
import { capitalizeFirstLetters } from "../../common/service/text";
import {
  IEntry,
  IMap,
  ImapEntriesProps,
  TmapperSimpleFields,
  getMapperSimpleFields,
} from "../mapper";
import { getName, getPhone } from "../formatter";

export const MapDefault: IMap = {
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

export const mapEntriesDefault = ({ fields, entries, formHash }: ImapEntriesProps): IEntry[] => {
  const lines: IEntry[] = [];

  const msf = getMapperSimpleFields(fields);

  for (let i = 0; i < entries.length; i++) {
    const mappedLine = mapEntry(entries[i], msf);
    lines.push(mappedLine);
  }
  return lines;
};

const mapEntry = (entry: any, msf: TmapperSimpleFields[] | undefined): IEntry => {
  const mapped: { [key: string]: string } = {};

  let row: TmapperSimpleFields = {};

  for (let fld in MapDefault) {
    let row1 = msf?.find((field) => {
      return field.Title === MapDefault[fld];
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

export default mapEntriesDefault;
