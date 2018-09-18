import axios from "axios";

const api = axios.create({
  baseURL: process.env.VUE_APP_API_ROOT,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default api;
