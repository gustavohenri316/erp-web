import axios from "axios";
import { baseURL } from "../../assets/data";

export async function getPrivileges() {
  const response = await axios.get(`${baseURL}/privileges`);
  return response.data;
}
type DeletePrivilegesServices = { id: string };

export async function deletePrivileges({ id }: DeletePrivilegesServices) {
  const response = await axios.delete(`${baseURL}/privileges/${id}`);
  return response.data;
}
