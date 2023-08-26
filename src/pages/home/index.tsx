import { Card } from "../../components/Card";
import { Col } from "../../components/Col";
import { Row } from "../../components/Row";
import { Template } from "../components/Template";

export default function HomePage() {
  return (
    <Template
      documentTitle="Inicio"
      title="Inicio"
      permissionPage="D9M76N89KR028H66IX4BA7DKS8E2K6"
    >
      <Row>
        <Col>
          <Card>
            <div>
              <h1 className="text-center">Produtos</h1>
              <p className="text-center">145 produtos</p>
            </div>
          </Card>
        </Col>
        <Col>
          <Card>
            <div>
              <h1 className="text-center">Clientes</h1>
              <p className="text-center">145 produtos</p>
            </div>
          </Card>
        </Col>
        <Col>
          <Card>
            <div>
              <h1 className="text-center">Notificações</h1>
              <p className="text-center">145 produtos</p>
            </div>
          </Card>
        </Col>
      </Row>
    </Template>
  );
}
