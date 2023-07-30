import axios from "axios";
import { baseURL } from "../../assets/data";

export async function findPermissionsNoPagination() {
  const response = await axios.get(`${baseURL}/permission`);
  return response.data;
}

export async function deletePermissions({ id }: DeletePermissionsService) {
  const response = await axios.delete(`${baseURL}/permission/${id}`);
  return response.data;
}

export async function findPermissions({
  search,
  page,
  pageSize,
}: SearchPermissionService) {
  const response = await axios.get(
    `${baseURL}/permission/search?searchTerm=${search}&page=${page}&perPage=${pageSize}`
  );
  return response.data;
}

export async function findPermissionByName({
  search,
}: FindPermissionByNameService) {
  const response = await axios.get(
    `${baseURL}/permission/search-by-name?name=${search}`
  );
  return response.data;
}
