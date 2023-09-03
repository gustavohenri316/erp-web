import axios from "axios";
import { baseURL } from "../../assets/data";

export async function getProducts() {
  const response = await axios.get(`${baseURL}/products`);
  return response.data;
}
