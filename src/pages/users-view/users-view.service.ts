import axios from "axios";
import { baseURL } from "../../assets/data";

type GetUsersServicesProps = {
  currentPage?: string;
  pageSize?: number;
};
export async function getUsers({
  currentPage = "1",
  pageSize = 10,
}: GetUsersServicesProps) {
  const response = await axios.get(
    `${baseURL}/user?page=${currentPage}&pageSize=${pageSize}`
  );
  return response.data;
}

type FindUserService = {
  id: string;
};
export async function findUser({ id }: FindUserService) {
  const response = await axios.get(`${baseURL}/user/${id}`);
  return response.data;
}
type DeleteUserService = {
  id: string;
};
export async function deleteUser({ id }: DeleteUserService) {
  const response = await axios.delete(`${baseURL}/user/${id}`);
  return response.data;
}
