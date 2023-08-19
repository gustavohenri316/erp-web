import { useState } from "react";
import { Col } from "../../components/Col";
import { Input } from "../../components/Input";
import { Label } from "../../components/Label";
import { Row } from "../../components/Row";
import { useAuth } from "../../context/AuthContext";
import { Template } from "../components/Template";
import { EditorMessages } from "../../components/EditorMessages";
import { Button } from "../../components/Button";
import { Select } from "../../components/Select";
import { createPolls } from "./polls-register.service";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../components/Spinner";

export default function PollsRegister() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [feedbackType, setFeedbackType] = useState("");
  const [scaleType, setScaleType] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useNavigate();

  async function handleSubmit() {
    const payload: IPayloadPolls = {
      title: title,
      createdByName: user?.name,
      createdByEmail: user?.email,
      createdByAvatar: user?.photo,
      feedbackType: feedbackType,
      scaleType: scaleType,
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
      <Row className="mt-4">
        <Col>
          <Label>Tipo de feedback</Label>
          <Select
            value={feedbackType}
            onChange={(e) => setFeedbackType(e.target.value)}
          >
            <option value="" disabled>
              Selecione o Tipo de Feedback
            </option>
            <option value="scale">Escala de 1 a 5</option>
            <option value="scaleWithMessage">
              Escala de 1 a 5 com Mensagem
            </option>
            <option value="message">Apenas Mensagem</option>
          </Select>
        </Col>
        <Col>
          <Label>Tipo de escala</Label>
          <Select
            value={scaleType}
            disabled={
              feedbackType !== "scale" && feedbackType !== "scaleWithMessage"
            }
            onChange={(e) => setScaleType(e.target.value)}
          >
            <option value="" disabled>
              Selecione o Tipo de Escala
            </option>
            <option value="heart">Coração</option>
            <option value="stars">Estrelas</option>
            <option value="balls">Bolas</option>
            <option value="plants">Plantas</option>
          </Select>
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
