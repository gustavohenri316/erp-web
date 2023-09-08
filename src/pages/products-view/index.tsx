import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Button, Row, Pagination, Select } from "../../components";

import { Template } from "../components/Template";
import { ProductsViewTable } from "./_components/products-view-table";
import { getProducts } from "./products-view.service";
import { getCustomers } from "../customers-view/customers-view.service";

export default function ProductsView() {
  const [products, setProducts] = useState<IProductsViewResponse | null>(null);
  const [customers, setCustomers] = useState<ICustomersResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useNavigate();
  const [search, setSearch] = useState("");
  const [supplier, setSupplier] = useState("");
  const [page, setPage] = useState(1);

  function handleUpdate(value: boolean) {
    setLoading(value);
  }

  const pageSize = 11;
  const totalItems = products?.totalItems || 0;
  const firstPageIndex = (page - 1) * pageSize + 1;
  const lastPageIndex = Math.min(page * pageSize, totalItems);
  const isNotViewPagination = pageSize >= totalItems;

  function onPageChange(pageNumber: number) {
    setPage(pageNumber);
  }

  async function fetchGetProducts() {
    const params = {
      page: 1,
      query: search,
      supplier: supplier,
      pageSize: 20,
    };
    const response = await getProducts(params);
    setProducts(response);
  }

  useEffect(() => {
    fetchGetProducts();
  }, [search, supplier, loading]);

  async function fetchGetCustomers() {
    try {
      const response = await getCustomers();
      setCustomers(response);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchGetCustomers();
  }, []);

  return (
    <Template
      permissionPage="1YCCT7V2ER4MGL4L7W41E6GZQ8R6WE"
      documentTitle="Visualizar Produtos"
      title="Visualizar Produtos"
    >
      <Row>
        <Search handleSearch={setSearch} placeholder="Buscar por" />

        <Button variant="success" onClick={() => router("/products-register")}>
          Cadastrar produto
        </Button>
      </Row>
      <Row className="mt-4 justify-end">
        <div className="w-auto">
          <Select onChange={(e) => setSupplier(e.target.value)}>
            <option value="" selected disabled hidden>
              Selecione um Fornecedor
            </option>
            <option value="">Todos os fornecedores</option>
            {customers.map((customer) => (
              <option key={customer._id} value={customer._id}>
                {customer.corporateReason}
              </option>
            ))}
          </Select>
        </div>
      </Row>
      <Row>
        <ProductsViewTable products={products} handleUpdate={handleUpdate} />
      </Row>
      <Row className="justify-end">
        {!isNotViewPagination && (
          <Pagination
            firstItemPage={firstPageIndex}
            totalItems={totalItems}
            lastItemPage={lastPageIndex}
            itemsPerPage={pageSize}
            onPageChange={onPageChange}
          />
        )}
      </Row>
    </Template>
  );
}
