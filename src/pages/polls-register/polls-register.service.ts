import axios from "axios";
import { baseURL } from "../../assets/data";

export async function createPolls(userId: string, payload: IPayloadPolls) {
  const response = await axios.post(`${baseURL}/polls/${userId}`, payload);
  return response.data;
}
