import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Button, Row } from "../../components";

import { Template } from "../components/Template";
import { ProductsViewTable } from "./_components/products-view-table";
import { getProducts } from "./products-view.service";

export default function ProductsView() {
  const [products, setProducts] = useState<IProductsViewResponse[] | null>(
    null
  );

  const router = useNavigate();
  async function fetchGetProducts() {
    const response = await getProducts();
    setProducts(response);
  }

  useEffect(() => {
    fetchGetProducts();
  }, []);
  return (
    <Template
      permissionPage="1YCCT7V2ER4MGL4L7W41E6GZQ8R6WE"
      documentTitle="Visualizar Produtos"
      title="Visualizar Produtos"
    >
      <Row>
        <Search />
        <Button variant="success" onClick={() => router("/products-register")}>
          Cadastrar produto
        </Button>
      </Row>
      <Row>
        <ProductsViewTable products={products} />
      </Row>
    </Template>
  );
}
