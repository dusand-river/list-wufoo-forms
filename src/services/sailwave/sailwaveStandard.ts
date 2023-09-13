import { IEntry } from "../mapper";

const setAdditionalSailwaveFields = (entry: IEntry): IEntry => {
  // fleet, rating, division
  return setPhrfFleetDivision(entry);
};

const setPhrfFleetDivision = (entry: IEntry): IEntry => {
  entry.division = 1;
  if (entry.selectionFleet?.substring(0, 10) === "Non-Flying") {
    let phrf: number = entry.phrf ? parseInt(entry.phrf) : 0;
    entry.fleet = "NFS";
    entry.rating = phrf.toString();
  }

  if (entry.selectionFleet?.substring(0, 6) === "Flying") {
    entry.fleet = "FS";
    entry.rating = entry.phrf;
  }
  if (entry.selectionFleet?.substring(0, 8) === "Cruising") {
    entry.fleet = "Cruising";
    entry.rating = entry.phrf;
  }

  if (entry.selectionFleet === "Shark") {
    entry.fleet = "Shark";
    entry.rating = entry.phrf;
  }

  return entry;
};

export default setAdditionalSailwaveFields;
