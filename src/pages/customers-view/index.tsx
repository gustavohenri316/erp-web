import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Row } from "../../components/Row";
import { Search } from "../../components/Search";
import { Template } from "../components/Template";
import { CustomersViewTable } from "./_components/customers-view-table";

export default function CustomersView() {
  const router = useNavigate();
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
        <CustomersViewTable />
      </Row>
    </Template>
  );
}
