import axios from "axios";
import { baseURL } from "../../assets/data";

export async function getAllNotifications(id: string) {
  const response = await axios.get(`${baseURL}/notifications/${id}`);
  return response.data;
}

export async function getNotificationsUnRead(id: string) {
  const response = await axios.get(
    `${baseURL}/notifications/unread-count/${id}`
  );
  return response.data;
}

type MarkAsReadNotificationsService = {
  id: string;
  idNotification: string;
};

export async function markAsReadNotifications({
  id,
  idNotification,
}: MarkAsReadNotificationsService) {
  const response = await axios.put(
    `${baseURL}/notifications/${idNotification}/mark-as-read?userId=${id}`
  );
  return response.data;
}
type DeleteNotifications = {
  id: string;
  userId: string;
};

export async function deleteNotifications({ id, userId }: DeleteNotifications) {
  const response = await axios.delete(
    `${baseURL}/notifications/${id}?userId=${userId}`
  );
  return response.data;
}
