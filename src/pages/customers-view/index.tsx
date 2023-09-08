import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Row } from "../../components/Row";
import { Search } from "../../components/Search";
import { Template } from "../components/Template";
import { CustomersViewTable } from "./_components/customers-view-table";
import { getCustomers } from "./customers-view.service";
import { useEffect, useState } from "react";

export default function CustomersView() {
  const [customers, setCustomers] = useState<ICustomersResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useNavigate();

  const handleLoading = (value: boolean) => setLoading(value);
  async function fetchGetCustomers() {
    try {
      const response = await getCustomers();
      setCustomers(response);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchGetCustomers();
  }, [loading]);

  return (
    <Template
      title="Clientes"
      documentTitle="Clientes"
      permissionPage="QNXJ9BQD4HTRWAF3UYGHMLQV9JKXBI"
    >
      <Row>
        <Search />
        <Button variant="success" onClick={() => router("/customers-register")}>
          Cadastrar cliente
        </Button>
      </Row>
      <Row>
        <CustomersViewTable data={customers} handleLoading={handleLoading} />
      </Row>
    </Template>
  );
}
