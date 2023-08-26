import { Spinner } from "../../components/Spinner";
import { Input } from "../../components/Input";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Col } from "../../components/Col";
import { Label } from "../../components/Label";
import { Row } from "../../components/Row";
import { AuthContext } from "../../context/AuthContext";
import { generateRandomHash } from "../../utils/generation-key";
import { Template } from "../components/Template";
import { createPermission } from "./settings-permission-register.service";

export default function SettingsPermissionRegister() {
  const { user } = useContext(AuthContext);
  const router = useNavigate();

  const [randomHash, setRandomHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    key: "",
    describe: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    key: "",
    describe: "",
  });

  const handleGenerateHash = () => {
    const generatedHash = generateRandomHash(30);
    setRandomHash(generatedHash);
    setFormState({ ...formState, key: generatedHash });
  };

  async function fetchCreateRules(payload: any) {
    try {
      setLoading(true);
      const response = await createPermission({ payload });
      if (response.success) {
        toast.success(response.message);
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
      console.error(err);
    } finally {
      setLoading(false);

      router(-1);
    }
  }

  const handleSubmit = () => {
    const { name, key, describe } = formState;

    if (!key) {
      toast.error("Você precisa gerar uma chave.");
    }
    if (!name && !describe) {
      toast.error("Campos obrigatórios não preenchidos");
    }
    const errors = {
      name: name.trim() === "" ? "Campo obrigatório" : "",
      key: key.trim() === "" ? "Campo obrigatório" : "",
      describe: describe.trim() === "" ? "Campo obrigatório" : "",
    };

    setFormErrors(errors);
    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }

    const payload = {
      name: name,
      createdByUser: user?.name,
      description: describe,
      key: key,
    };
    fetchCreateRules(payload);
  };

  return (
    <Template
      documentTitle="Cadastrar nova permissão"
      title="Cadastrar nova permissão"
      permissionPage="KWYDSE79H14EC98JOH6F4HK34ZKYQD"
    >
      <Row className="py-4">
        <Col>
          <Label>Criado por</Label>
          <Row>
            <Col>
              <Input disabled value={user?.name} />
            </Col>
            <Col>
              <Input disabled value={user?.email} />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="py-4">
        <Col>
          <Label>Nome</Label>
          <Input
            name="name"
            value={formState.name}
            onChange={(e) =>
              setFormState({ ...formState, name: e.target.value })
            }
          />
          {formErrors.name && (
            <span className="text-red-500">{formErrors.name}</span>
          )}
        </Col>
        <Col>
          <Label>Chave</Label>
          <Row>
            <Input
              name="key"
              disabled
              value={randomHash}
              onChange={(e) =>
                setFormState({ ...formState, key: e.target.value })
              }
            />
            <Button variant="outline-success" onClick={handleGenerateHash}>
              Gerar Chave
            </Button>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <Label>Descrição</Label>
          <Input
            name="describe"
            value={formState.describe}
            onChange={(e) =>
              setFormState({ ...formState, describe: e.target.value })
            }
          />
          {formErrors.describe && (
            <span className="text-red-500">{formErrors.describe}</span>
          )}
        </Col>
      </Row>
      <Row className="py-8 justify-end">
        <Button variant="outline-secondary" onClick={() => router(-1)}>
          Cancelar
        </Button>
        <Button variant="success" onClick={handleSubmit} disabled={loading}>
          {loading ? <Spinner /> : "Cadastrar"}
        </Button>
      </Row>
    </Template>
  );
}
