import axios from "axios";
import { baseURL } from "../assets/data";

type GetUser = {
  Token: string;
};
export async function getUserProfile({ Token }: GetUser): Promise<void> {
  const response = await axios.get(`${baseURL}/user/${Token}/profile`);

  return response.data;
}

type NewUserService = {
  payload: UserFormValues;
};
export async function newUser({ payload }: NewUserService): Promise<void> {
  const response = await axios.post(`${baseURL}/user`, payload);
  return response.data;
}

type GetPermissionsService = {
  id: string;
};
export async function getPermissions({
  id,
}: GetPermissionsService): Promise<void> {
  const response = await axios.get(`${baseURL}/user/${id}/privilege`);

  return response.data;
}

type GetPermissionsUserService = {
  id: string;
  name: string;
};
export async function getPermissionsUser({
  id,
  name,
}: GetPermissionsUserService): Promise<void> {
  const response = await axios.get(
    `${baseURL}/user/${id}/permission-key?permissionName=${name}`
  );

  return response.data.key;
}
