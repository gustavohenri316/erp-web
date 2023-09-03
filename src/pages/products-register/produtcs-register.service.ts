import axios from "axios";
import { baseURL } from "../../assets/data";

export async function createProduct(payload: IFormStateRegisterProducts) {
  return await axios.post(`${baseURL}/products`, payload);
}
