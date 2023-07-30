import axios from "axios";
import { baseURL } from "../../assets/data";

type CreatePrivilegesService = {
  payload: any;
};
export async function createPrivileges({ payload }: CreatePrivilegesService) {
  const response = await axios.post(`${baseURL}/privileges`, payload);
  return response.data;
}
type UpdatePrivilegesService = {
  payload: any;
  id: string;
};
export async function updatePrivileges({
  payload,
  id,
}: UpdatePrivilegesService) {
  const response = await axios.put(`${baseURL}/privileges/${id}`, payload);
  return response.data;
}

type FindByIdPrivilegesService = {
  id: string;
};
export async function findByIdPrivileges({ id }: FindByIdPrivilegesService) {
  const response = await axios.get(`${baseURL}/privileges/${id}`);
  return response.data;
}
