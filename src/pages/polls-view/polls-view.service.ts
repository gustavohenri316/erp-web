import axios from "axios";
import { baseURL } from "../../assets/data";

export async function getPolls() {
  const response = await axios.get(`${baseURL}/polls`);
  return response.data;
}

export async function getPollsById(id: string, isPrivate: boolean = false) {
  const response = await axios.get(
    `${baseURL}/polls/${id}?isPrivate=${isPrivate}`
  );
  return response.data;
}

export async function deletePolls(id: string) {
  const response = await axios.delete(`${baseURL}/polls/${id}`);
  return response.data;
}
