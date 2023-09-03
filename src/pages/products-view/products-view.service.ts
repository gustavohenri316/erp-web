import axios from "axios";
import { baseURL } from "../../assets/data";

type IGetProductsParams = {
  page: number;
  query: string;
  supplier: string;
  pageSize: number;
};
export async function getProducts(params: IGetProductsParams) {
  const response = await axios.get(
    `${baseURL}/products?query=${params.query}&supplier=${params.supplier}&page=${params.page}&pageSize=${params.pageSize}`
  );
  return response.data;
}
