import axios from "axios";
import { baseURL } from "../../assets/data";

type CreateNotifications = {
  receivedBy?: Array<string>;
  message: string;
  title: string;
  sentBy: string;
  isGlobal: boolean;
};

export async function createNotifications({
  isGlobal,
  message,
  receivedBy,
  sentBy,
  title,
}: CreateNotifications) {
  const payload = {
    isGlobal,
    message,
    receivedBy,
    sentBy,
    title,
  };
  const response = await axios.post(`${baseURL}/notifications/`, payload);
  return response.data;
}
