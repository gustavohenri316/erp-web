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
  const [isFeedbackPublic, setIsFeedbackPublic] = useState(false);

  const [loading, setLoading] = useState(false);
  const router = useNavigate();

  async function handleSubmit() {
    if (!title || !description) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const payload: IPayloadPolls = {
      title: title,
      createdByName: user?.name || "",
      createdByEmail: user?.email || "",
      createdByAvatar: user?.photo || "",
      isFeedbackPublic: isFeedbackPublic,
      description: description,
      feedbacks: [],
    };

    try {
      setLoading(true);
      if (user) {
        const response = await createPolls(user?.id, payload);
        toast.success(response.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Erro ao criar nova enquete!");
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
        <Col>
          <Label>Feedbacks Públicos?</Label>
          <Row>
            <div>
              <Row className="items-center">
                <label htmlFor="">Sim</label>
                <input
                  type="radio"
                  className="h-4 w-4"
                  checked={isFeedbackPublic === true}
                  onChange={() => setIsFeedbackPublic(true)}
                />
              </Row>
            </div>
            <div>
              <Row className="items-center">
                <label htmlFor="">Não</label>
                <input
                  type="radio"
                  className="h-4 w-4"
                  checked={isFeedbackPublic === false}
                  onChange={() => setIsFeedbackPublic(false)}
                />
              </Row>
            </div>
          </Row>
        </Col>
      </Row>
      <Row className="mt-4 ">
        <Col>
          <Label>Descrição</Label>
          <EditorMessages value={description} onChange={setDescription} />
        </Col>
      </Row>
      <Row className="mt-4 justify-end">
        <Button variant="outline-secondary" onClick={() => router(-1)}>
          Cancelar
        </Button>
        <Button variant="success" onClick={handleSubmit} disabled={loading}>
          {loading ? <Spinner /> : "Confirmar"}
        </Button>
      </Row>
    </Template>
  );
}
