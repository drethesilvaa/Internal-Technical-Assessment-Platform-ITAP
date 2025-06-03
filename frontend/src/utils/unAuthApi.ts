import axios from "axios";

export const unAuthApi = axios.create({
  baseURL: "http://localhost:3001",
});
