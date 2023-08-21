import axios from "axios";
import { baseURL } from "../assets/data";

type SigInProps = {
  email: string;
  password: string;
};
export async function sigInRequest({ email, password }: SigInProps) {
  const payload = {
    identifier: email,
    password: password,
  };

  try {
    const response: any = await axios.post(`${baseURL}/user/login`, payload);

    return response.data;
  } catch (err) {
    console.log(err);
  }
}
