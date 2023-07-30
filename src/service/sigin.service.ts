import axios from "axios";
import { baseURL } from "../assets/data";

type SigInProps = {
  email: string;
  password: string;
};
export async function sigInRequest({ email, password }: SigInProps) {
  const payload = {
    email: email,
    password: password,
  };
  const response = await axios.post(`${baseURL}/user/login`, payload);
  return response.data;
}
