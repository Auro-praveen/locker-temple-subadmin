import React from "react";
import { json } from "stream/consumers";
import { JsonObjectExpression } from "typescript";


// const tuckitAdminServer = "http://192.168.0.182:8080/AuroTempleLockerAdmin/";

// testing urls

// const tuckitClientServer ="http://192.168.0.182:8080/AuroTempleLBEngine/AuroClientRequest";

// const tuckitAdminServer = "http://192.168.0.182:8080/AuroAutoLocker/";
// const tuckitLoginURL = "http://192.168.0.198:8080/AuroAutoLocker/";


// live urls
const tuckitClientServer ="https://temple.tuckit.in:8443/AuroTempleLBEngine/AuroClientRequest";

const tuckitAdminServer = "https://temple.tuckit.in:8443/AuroAutoLocker/";
const tuckitLoginURL = "https://app.tuckit.in:8443/AuroAutoLocker/";

export const HandleApiRequestForServerPost = async <T>(
  payload: string
): Promise<any> => {
  return await fetch(tuckitClientServer, {
    method: "POST",
    headers: {
      accept: "application/json",
    },
    body: payload,
  });
};

export const HandleApiRequestForServerGet = async <T>(params: string) => {
  try {
    await fetch(tuckitClientServer + "?" + params, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((data) => {
        return data.json();
      })
      .catch((err) => {
        console.log("error is : " + err);
      });
  } catch (error) {
    console.log("error is : " + error);
  }
};

export const ApiRequestForTuckitAdminServerPOST = async <T>(
  path: string,
  payload: string
): Promise<any> => {
  if (path === "FetchUserLoginDetails") {
    return await fetch(tuckitLoginURL + path, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: payload,
    });
  } else {
    return await fetch(tuckitAdminServer + path, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: payload,
    });
  }

  // .then((resp) => {
  //   console.log(resp);

  //   resp.json();
  // })
  // .then((resp) => {
  //   console.log("response from the server is :: " + resp);
  //   return resp;
  // })
  // .catch((err) => {
  //   console.log("error : " + err);
  // });
};

export const ApiRequestForTuckitAdminServerGET = async <T>(
  path: string,
  variable: string
): Promise<any> => {
  if (variable) {
    return await fetch(tuckitAdminServer + path + "?" + variable, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
  } else {
    return await fetch(tuckitAdminServer + path, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
  }
};

export const ApiRequestForHandlingLogs = async (dataObject: any) => {
  fetch(tuckitAdminServer + "UserLogDetails", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: JSON.stringify(dataObject),
  }).catch((err) => console.log("logs Error : " + err));
};
