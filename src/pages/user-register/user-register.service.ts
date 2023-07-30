import axios from "axios";
import { baseURL } from "../../assets/data";

type NewUserService = {
  payload: any;
};
export async function newUser({ payload }: NewUserService): Promise<void> {
  const response = await axios.post(`${baseURL}/user`, payload);
  return response.data;
}
