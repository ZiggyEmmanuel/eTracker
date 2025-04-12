import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Using the environment variable
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-Csrftoken",
});

export default instance;
