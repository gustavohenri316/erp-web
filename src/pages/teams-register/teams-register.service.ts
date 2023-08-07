import axios from "axios";
import { baseURL } from "../../assets/data";

export async function createTeams({ payload }: CreateTeams) {
  const response = await axios.post(`${baseURL}/teams`, payload);
  return response.data;
}
