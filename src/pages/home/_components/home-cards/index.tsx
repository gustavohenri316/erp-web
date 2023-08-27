import { Card } from "../../../../components/Card";
import { Col } from "../../../../components/Col";

interface IHomeCards {
  title: string;
  description: string;
  image?: string;
  link?: string;
}
export function HomeCards({
  description = "lorem impus",
  link,
  title = "lorem impus",
}: IHomeCards) {
  return (
    <Col>
      <Card routerLink={link}>
        <div>
          <h1 className="text-center font-medium">{title}</h1>
          <p className="text-center">{description}</p>
        </div>
      </Card>
    </Col>
  );
}
