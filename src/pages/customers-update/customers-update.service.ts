import axios from "axios";
import { baseURL } from "../../assets/data";

export async function updateCustomers(id: string, payload: ICreateCustomers) {
  const response = await axios.put(`${baseURL}/customers/${id}`, payload);
  return response.data;
}
export async function findCustomersById(id: string) {
  const response = await axios.get(`${baseURL}/customers/${id}`);
  return response.data;
}
