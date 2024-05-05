import { IEntry } from "../mapper";

const setAdditionalSailwaveFields2024 = (entry: IEntry): IEntry => {
  // fleet, rating, division
  return setPhrfFleetDivision(entry);
};

const setPhrfFleetDivision = (entry: IEntry): IEntry => {
  entry.needPhrfCertificate = "Yes";
  if (entry.selectionFleet?.substring(0, 10) === "Non-Flying") {
    let phrf: number = entry.phrfNFS ? parseInt(entry.phrfNFS) : 0;
    if (phrf && phrf < 189 && phrf > 0) {
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
    if (phrf && phrf < 126 && phrf > 0) {
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
    entry.fleet = "FS1";
    entry.division = 1;
    let phrf: number = entry.phrfFS ? parseInt(entry.phrfFS) : 18;
    entry.rating = phrf.toString();
    entry.needPhrfCertificate = "No";
  }
  if (entry.selectionFleet === "One Design (inclues PHRF Certificate)") {
    entry.fleet = "Shark";
    entry.division = 2;
    entry.rating = entry.phrfFS;
  }
  if (entry.selectionFleet === "One Design (no PHRF Certificate)") {
    entry.fleet = "Shark";
    entry.division = 2;
    entry.rating = "219";
    entry.needPhrfCertificate = "No";
  }

  // determine series
  switch (entry.selectSeries) {
    case "$95 Thursday Evening Series":
      entry.registerFor = "Thursday";
      break;
    case "$95 Tuesday Evening Series":
      entry.registerFor = "Tuesday";
      break;
    case "$95 Fall Evening Series":
      entry.registerFor = "Fall";
      break;

    default:
      entry.registerFor = "All";
      break;
  }

  return entry;
};

export default setAdditionalSailwaveFields2024;
