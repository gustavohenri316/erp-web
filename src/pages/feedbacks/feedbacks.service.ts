import axios from "axios";
import { baseURL } from "../../assets/data";

export async function createNewFeedback(id: string, payload: any) {
  const response = await axios.post(
    `${baseURL}/polls/add-feedback/${id}`,
    payload
  );
  return response.data;
}

export async function deleteFeedback(idPolls: string, idFeedback: string) {
  const response = await axios.delete(
    `${baseURL}/polls/${idPolls}/feedbacks/${idFeedback}`
  );
  return response.data;
}
