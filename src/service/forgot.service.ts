import axios from "axios";
import { baseURL } from "../assets/data";

type ForgotServiceTypes = {
  email: string;
};
export async function forgotService({ email }: ForgotServiceTypes) {
  const payload = {
    email: email,
  };
  const response = await axios.post(`${baseURL}/forgot/generate-code`, payload);
  return response.data;
}

type VerifyCodeServiceTypes = {
  email: string;
  code: string;
};
export async function verifyCodeService({
  email,
  code,
}: VerifyCodeServiceTypes) {
  const payload = {
    email: email,
    code: code,
  };
  const response = await axios.post(`${baseURL}/forgot/verify-code`, payload);
  return response.data;
}
type NewPasswordServiceTypes = {
  id: string;
  password: string;
};
export async function newPasswordService(props: NewPasswordServiceTypes) {
  const { id, password } = props;
  const payload = {
    password: password,
  };
  const response = await axios.patch(`${baseURL}/user/${id}/password`, payload);
  return response.data;
}
