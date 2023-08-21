import { useState } from "react";
import { Col } from "../../components/Col";
import { Input } from "../../components/Input";
import { Label } from "../../components/Label";
import { Row } from "../../components/Row";
import { useAuth } from "../../context/AuthContext";
import { Template } from "../components/Template";
import { EditorMessages } from "../../components/EditorMessages";
import { Button } from "../../components/Button";
import { createPolls } from "./polls-register.service";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../components/Spinner";

export default function PollsRegister() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const router = useNavigate();

  async function handleSubmit() {
    const payload: IPayloadPolls = {
      title: title,
      createdByName: user?.name,
      createdByEmail: user?.email,
      createdByAvatar: user?.photo,
      feedbackType: "scaleWithMessage",
      scaleType: "stars",
      description: description,
      feedbacks: [],
    };

    try {
      setLoading(true);
      const response = await createPolls(payload);
      toast.success(response.message);
    } catch (err) {
      console.error(err);
      toast.error("Error ao criar nova enquete!");
    } finally {
      setLoading(false);
      router(-1);
    }
  }

  return (
    <Template
      title="Registrar nova enquete"
      documentTitle="Registrar | Enquete"
      permissionPage="9TLTS6BVTFVWCLX9CPYJKXAZ9HDUXA"
      isBack
    >
      <Row>
        <Col>
          <Label>Nome</Label>
          <Input disabled value={user?.name} />
        </Col>
        <Col>
          <Label>Email</Label>
          <Input disabled value={user?.email} />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Label>Título</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Label>Descrição</Label>
          <EditorMessages value={description} onChange={setDescription} />
        </Col>
      </Row>

      <Row className="mt-4 justify-end">
        <Button variant="outline-secondary">Cancelar</Button>
        <Button variant="success" onClick={handleSubmit} disabled={loading}>
          {loading ? <Spinner /> : "Confirmar"}
        </Button>
      </Row>
    </Template>
  );
}
