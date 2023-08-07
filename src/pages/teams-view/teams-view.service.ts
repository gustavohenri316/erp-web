import axios from "axios";
import { baseURL } from "../../assets/data";

interface GetTeamsProps {
  page: string;
  pageSize: string;
}
export async function getTeams({ page = "1", pageSize = "10" }: GetTeamsProps) {
  const response = await axios.get(
    `${baseURL}/teams?page=${page}&pageSize=${pageSize}`
  );
  return response.data;
}

export async function deleteTeams(id: string) {
  const response = await axios.delete(`${baseURL}/teams/${id}`);
  return response.data;
}
