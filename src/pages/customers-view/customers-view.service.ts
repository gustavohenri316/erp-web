import axios from "axios";
import { baseURL } from "../../assets/data";

export async function getCustomers() {
  const response = await axios.get(`${baseURL}/customers`);
  return response.data;
}
export async function deleteCustomers(id: string) {
  const response = await axios.delete(`${baseURL}/customers/${id}`);
  return response.data;
}
