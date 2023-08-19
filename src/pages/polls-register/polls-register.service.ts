import axios from "axios";
import { baseURL } from "../../assets/data";

export async function createPolls(payload: IPayloadPolls) {
  const response = await axios.post(`${baseURL}/polls`, payload);
  return response.data;
}
