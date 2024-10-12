import axios from "axios";

export default function api() {
  const token = localStorage.getItem("token");

  const instance = axios.create({ baseURL: "http://localhost:8080" });

  if (token) {
    instance.defaults.headers.common["Authorization"] = `${token}`;
  }
  return instance;
}
