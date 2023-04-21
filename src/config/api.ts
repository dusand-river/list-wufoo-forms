// NOTE: this setings is ONLY valid for Wufoo Forms!!!
const uriFormsBase = "https://{{subdomain}}.wufoo.com/api/v3/forms";
const uriFormsOther = "{{formid}}{{endPoint}}.{{format}}";

export const API_ID = "admin";

const settings = [
  {
    id: "admin",
    accessId: "Y3VO-26SD-XJBC-RBO4",
    subdomain: "bhycadmin",
    format: "json",
  },
  {
    id: "test",
    subdomain: "bhyctest",
    accessId: "AXLK-1Q4V-GMTC-UETL",
    format: "json",
  },
];

export const currentActiveForms = ["bhyc-club-racing-series-2023"];
export const currentDefaultForDisplay = "bhyc-club-racing-series-2023";

const getSetting = (id: string) => {
  return settings.filter((item) => item.id === id)[0];
};

const getUri = (id: string, endPoint?: string, formId?: string) => {
  const { subdomain, format } = getSetting(id);

  let localBase = uriFormsBase.replace("{{subdomain}}", subdomain);
  let localOther = uriFormsOther.replace("{{formid}}", formId ? `/${formId}` : "");
  localOther = localOther.replace("{{endPoint}}", endPoint ? endPoint : "");
  localOther = localOther.replace("{{format}}", format ? format : "json");
  const uri = `${localBase}${localOther}`;
  return uri;
};

const getAuth = (id: string) => {
  const { accessId } = getSetting(id);
  return {
    username: accessId,
    password: "anyPass",
  };
};

const getAuthEncoded = (id: string) => {
  const { accessId } = getSetting(id);
  return btoa(`${accessId}:anyPass`);
};

export default {
  getSetting,
  getUri,
  getAuth,
  getAuthEncoded,
};
