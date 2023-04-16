import { IEntry, Map } from "./mapper";

const setAdditionalSailwaveFields = (entry: IEntry): IEntry => {
  // fleet, rating, division
  return setPhrfFleetDivision(entry);
};

const setPhrfFleetDivision = (entry: IEntry): IEntry => {
  if (entry.selectionFleet?.substring(0, 10) === "Non-Flying") {
    let phrf: number = entry.phrfNFS ? parseInt(entry.phrfNFS) : 0;
    if (phrf && phrf < 174 && phrf > 0) {
      entry.fleet = "NFS1";
      entry.division = 3;
    } else {
      entry.fleet = "NFS2";
      entry.division = 2;
    }
    entry.rating = phrf.toString();
  }
  if (entry.selectionFleet?.substring(0, 6) === "Flying") {
    let phrf: number = entry.phrfFS ? parseInt(entry.phrfFS) : 0;
    if (phrf && phrf < 130 && phrf > 0) {
      entry.fleet = "FS1";
      entry.division = 1;
    } else {
      entry.fleet = "FS2";
      entry.division = 3;
    }
    entry.rating = phrf.toString();
  }
  if (entry.selectionFleet?.substring(0, 8) === "Cruising") {
    let phrf: number = entry.phrfNFS ? parseInt(entry.phrfNFS) : 0;
    entry.fleet = "Cruising";
    entry.division = 4;
    entry.rating = phrf.toString();
  }
  if (entry.selectionFleet?.substring(0, 5) === "Multi") {
    entry.fleet = "Shark";
    entry.division = 2;
    entry.rating = entry.phrfFS;
  }

  return entry;
};

export default setAdditionalSailwaveFields;
