import axios from "axios";
import { baseURL } from "../../assets/data";

export async function createCustomers(payload: ICreateCustomers) {
  const response = await axios.post(`${baseURL}/customers`, payload);
  return response.data;
}
