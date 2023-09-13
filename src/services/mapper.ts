import { FormFields } from "../hooks/useFormFields";
import { mapEntriesBR } from "./mapping/mapperBronteRocks";
import { FormHash } from "../config/api";
import mapEntriesClubRacingSeries from "./mapping/mapperClubRacingSeries";
import { mapEntriesStandard } from "./mapping/mapperStandard";

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

export interface IMap {
  [key: string]: string;
}

export interface ImapEntriesProps {
  fields: FormFields[];
  entries: {}[];
  formHash?: string;
}

export type TmapperSimpleFields = {
  Title?: string;
  ID?: string;
};
export const getMapperSimpleFields = (fields: FormFields[]): TmapperSimpleFields[] | undefined => {
  const msf: TmapperSimpleFields[] = [];
  let msfLine: TmapperSimpleFields = { Title: "", ID: "" };

  fields.forEach((ff) => {
    if (ff.Choices && ff.Choices.length > 0) {
      ff.Choices.forEach((choice) => msf.push({ Title: choice.Label, ID: ff.ID }));
    } else {
      if (ff.SubFields && ff.SubFields.length > 0) {
        ff.SubFields.forEach((SubField) => msf.push({ Title: SubField.Label, ID: SubField.ID }));
      } else {
        // all other fields
        msf.push({ Title: ff.Title, ID: ff.ID });
      }
    }
  });
  return msf;
};

export const mapEntries = ({ fields, entries, formHash }: ImapEntriesProps): IEntry[] => {
  let lines: IEntry[] = [];

  switch (formHash) {
    case FormHash.bronteRocks:
      lines = mapEntriesBR({ fields, entries, formHash: formHash });
      break;
    case FormHash.racingSeries:
      // lines = mapEntriesClubRacingSeries({ fields, entries, formHash: formHash });
      lines = mapEntriesClubRacingSeries({ fields, entries, formHash });
      break;

    default:
      lines = mapEntriesStandard({ fields, entries, formHash: formHash });
      break;
  }
  return lines;
};

export default mapEntries;
