import React from "react";

const urlLcssLocal = "http://localhost/fbs-hris-department"; //from thunder client
const urlLcssLocalImg = "http://localhost/fbs-hris-department/public"; //from thunder client

// ONLINE DEV and LOCAL hris
export const devApiUrl = `${urlLcssLocal}/rest`;
export const devNavUrl = ""; //removed /v2
export const devBaseImgUrl = `${urlLcssLocalImg}`;
export const devBaseUrl = `${urlLcssLocal}`;

// dev key from thunder client
export const devKey =
  "$2a$12$47wDvbLInZif/PVS8B6P3.7WxyJvUpBzZAWCsnWJUKq3nrn4qgmeO";

// get focus on a button
export const GetFocus = (id) => {
  React.useEffect(() => {
    const obj = document.getElementById(id);
    obj.focus();
  }, []);
};

export const getUrlParam = (id) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  // const param = urlParams.get(id);
  // return param;
  return urlParams;
};
