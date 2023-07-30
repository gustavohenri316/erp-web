import axios from "axios";
import { baseURL } from "../../assets/data";

type FindPermissionService = {
  payload: any;
};
export async function createPermission({ payload }: FindPermissionService) {
  const response = await axios.post(`${baseURL}/permission`, payload);
  return response.data;
}
