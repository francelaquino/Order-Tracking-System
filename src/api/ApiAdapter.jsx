import axios, { post, put } from "axios";
import {} from "react-router-dom";
const GET = "get";
const POST = "post";
const PUT = "put";
const DELETE = "delete";
const PATCH = "patch";

const getCurrentAccessToken = () => {
  if (localStorage.getItem("jwtToken") === null) {
    return "";
  } else {
    return localStorage.getItem("jwtToken");
  }
};
var authAxios = axios.create({
  headers: {
    "Content-type": "Application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    Authorization: `Bearer ${getCurrentAccessToken()}`,
  },
});

const request = (
  url,
  type,
  data,
  params,
  headers = {
    "Content-type": "Application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers":
      "Origin, Content-Type, X-Auth-Token, Authorization",
    Authorization: `Bearer ${getCurrentAccessToken()}`,
  }
) => {
  let baseUrl = process.env.REACT_APP_API_ENDPOINT;
  const routePath = baseUrl + url;
  const options = {
    method: type,
    url: routePath,
    data,
    params,
    headers: headers,
  };

  return authAxios(options)
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
      const statusCode = error.response.status;
      if (statusCode === 401 || statusCode === 403) {
        localStorage.clear();
        window.location.href = "/client/login";
      } else {
      }

      return { error: error };
    });
};

export { request, GET, POST, PUT, DELETE, PATCH };
