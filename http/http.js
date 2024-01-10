import axios from "axios";
import UrlBase from "./UrlHttp";

axios.defaults.baseURL = UrlBase; //url
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
// axios.defaults.withCredentials = true;

export function get(url, config = { withCredentials: true }) {
  return axios.get(url, config).then((resposne) => resposne.data);
}

export function post(url, data, config = { withCredentials: true}) {
  return axios.post(url, data, config).then((resposne) => resposne.data);
}
