import axios from "axios";
import { baseURL } from "../../assets/data";

type CreatePrivilegesService = {
  payload: any;
};
export async function createPrivileges({ payload }: CreatePrivilegesService) {
  const response = await axios.post(`${baseURL}/privileges`, payload);
  return response.data;
}
