import { IEntry } from "../mapper";

const setAdditionalSailwaveFields = (entry: IEntry): IEntry => {
  // fleet, rating, division
  return setPhrfFleetDivision(entry);
};

const setPhrfFleetDivision = (entry: IEntry): IEntry => {
  entry.needPhrfCertificate = "";
  if (entry.selectionFleet?.substring(0, 10) === "Non Flying") {
    let phrf: number = entry.phrfNFS ? parseInt(entry.phrfNFS) : 0;
    if (phrf && phrf < 195 && phrf > 0) {
      entry.fleet = "NFS1";
      entry.rating = phrf.toString();
      entry.division = 3;
    } else {
      entry.fleet = "NFS2";
      entry.rating = phrf.toString();
      entry.division = 2;
    }
  }
  if (entry.selectionFleet?.substring(0, 6) === "Flying") {
    let phrf: number = entry.phrfFS ? parseInt(entry.phrfFS) : 0;
    if (phrf && phrf < 126 && phrf > 0) {
      entry.fleet = "FS1";
      entry.rating = phrf.toString();
      entry.division = 1;
    } else if (phrf && phrf > 126 && phrf > 0) {
      entry.fleet = "FS2";
      entry.rating = phrf.toString();
      entry.division = 3;
    }
    // else {
    //   entry.fleet = "FS3";
    //   entry.division = 2;
    // }
  }
  if (entry.selectionFleet?.substring(0, 8) === "Cruising") {
    let phrf: number = entry.phrfNFS ? parseInt(entry.phrfNFS) : 0;
    entry.fleet = "Cruising";
    entry.rating = phrf.toString();
    entry.division = 4;
  }

  if (entry.selectionFleet === "One Design") {
    entry.fleet = "Shark";
    entry.rating = "207";
    entry.division = 2;
  }

  return entry;
};

export default setAdditionalSailwaveFields;
