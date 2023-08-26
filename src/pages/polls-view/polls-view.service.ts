import axios from "axios";
import { baseURL } from "../../assets/data";

interface IGetPolls {
  page: number;
  pageSize: number;
  search: string;
  userId: string;
}
export async function getPolls({ search, page, pageSize, userId }: IGetPolls) {
  const response = await axios.get(
    `${baseURL}/polls/${userId}?page=${page}&pageSize=${pageSize}&filter=${search}`
  );
  return response.data;
}

export async function getPollsById(
  id: string,
  isPrivate: boolean = false,
  userId: string
) {
  const response = await axios.get(
    `${baseURL}/polls/${userId}/${id}?isPrivate=${isPrivate}`
  );
  return response.data;
}

export async function deletePolls(userId: string, id: string) {
  const response = await axios.delete(`${baseURL}/polls/${userId}/${id}`);
  return response.data;
}
