import axios from "axios";

import { api } from "../urlconfig";

axios.defaults.withCredentials = true;
const instance = axios.create(
  {
    baseURL: api,
  }
);

export default instance;
