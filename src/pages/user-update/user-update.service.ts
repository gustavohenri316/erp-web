import axios from "axios";
import { baseURL } from "../../assets/data";

type NewUserService = {
  payload: any;
};
export async function newUser({ payload }: NewUserService): Promise<void> {
  const response = await axios.post(`${baseURL}/user`, payload);
  return response.data;
}

type UpdateUserService = {
  payload: any;
  id: string;
};

export async function updateUser({
  payload,
  id,
}: UpdateUserService): Promise<void> {
  const response = await axios.put(`${baseURL}/user/${id}`, payload);
  return response.data;
}
