import setAdditionalSailwaveFields from "../sailwave/sailwaveBronteRocks";
import { capitalizeFirstLetters, toUpper } from "../../common/service/text";
import {
  IEntry,
  IMap,
  ImapEntriesProps,
  TmapperSimpleFields,
  getMapperSimpleFields,
} from "../mapper";
import { getName, getPhone } from "../formatter";

export const MapBR: IMap = {
  bhycId: "Membership Number",
  name: "Name",
  boat: "Boat Name",
  class: "Boat Model (i.e. C&C30, J 35):",
  sailNo: "Sail Number",
  email: "Email",
  firstName: "First",
  lastName: "Last",
  phrfFS: "Rating",
  phrfNFS: "Rating",
  homePhone: "Home Phone Number",
  cellPhone: "Phone Number",
  insuranceCompany: "Insurance Company",
  insurancePolicyNumber: "Policy Number",
  phrfCertificate: "PHRF Certificate Number",
  selectionFleet: "Flying Sails",
  bronteRocks: "Saturday Aug 30th - Bronte Rocks",
  candcRace: "Sunday Aug 31st - C&C Owners at Bronte Rocks",
  handicap: "PHRF",
  club: "Yacht Club",
};

export const mapEntriesBR = ({ fields, entries, formHash }: ImapEntriesProps): IEntry[] => {
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

  for (let fld in MapBR) {
    let row1 = msf?.find((field) => {
      return field.Title === MapBR[fld];
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
  // handicap
  if (mapped.handicap == "One Design") {
    mapped.selectionFleet = mapped.handicap;
  }
  // race
  mapped.bronteRocks = mapped.bronteRocks ? "Yes" : "";
  mapped.candcRace = mapped.candcRace ? "Yes" : "";
  //Club
  if (mapped.club) mapped.club = toUpper(mapped.club);

  return setAdditionalSailwaveFields(mapped);
  // return mapped;
};

export default mapEntriesBR;
