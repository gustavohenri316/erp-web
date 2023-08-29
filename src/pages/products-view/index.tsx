import { Row } from "../../components/Row";
import { Search } from "../../components/Search";
import { Template } from "../components/Template";

export default function ProductsView() {
  return (
    <Template
      permissionPage="1YCCT7V2ER4MGL4L7W41E6GZQ8R6WE"
      documentTitle="Visualizar Produtos"
      title="Visualizar Produtos"
    >
      <Row>
        <Search />
      </Row>
    </Template>
  );
}
