import { Row } from "../../components/Row";
import { Template } from "../components/Template";
import { HomeCards } from "./_components/home-cards";

export default function HomePage() {
  return (
    <Template
      documentTitle="Inicio"
      title="Inicio"
      permissionPage="D9M76N89KR028H66IX4BA7DKS8E2K6"
    >
      <Row>
        <HomeCards
          description="145 clientes"
          title="Clientes"
          link="/customers-view"
        />
        <HomeCards
          description="145 produtos"
          title="Produtos"
          link="/products-view"
        />
      </Row>
    </Template>
  );
}
