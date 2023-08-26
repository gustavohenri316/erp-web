import { Spinner } from "../../components/Spinner";
import { Input } from "../../components/Input";
import { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Col } from "../../components/Col";
import { Label } from "../../components/Label";
import { Row } from "../../components/Row";
import { AuthContext } from "../../context/AuthContext";
import { generateRandomHash } from "../../utils/generation-key";
import { Template } from "../components/Template";
import { findPermissionsNoPagination } from "../settings-permission/user-permission.service";
import { createPrivileges } from "./settings-privileges-register.service";

type Permission = {
  _id: string;
  name: string;
  description: string;
};

export default function SettingsPrivilegesRegister() {
  const { user } = useContext(AuthContext);
  const router = useNavigate();
  const [randomHash, setRandomHash] = useState("");
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedItemSecondTable, setSelectedItemSecondTable] = useState("");
  const [loading, setLoading] = useState(false);

  const [formState, setFormState] = useState({
    name: "",
    key: "",
    describe: "",
  });

  useEffect(() => {
    fetchGetPermissions();
  }, []);

  async function fetchGetPermissions() {
    try {
      const response = await findPermissionsNoPagination();
      setPermissions(response);
    } catch (error) {
      console.error(error);
    }
  }

  const handleGenerateHash = () => {
    const generatedHash = generateRandomHash(30);
    setRandomHash(generatedHash);
    setFormState((prevState) => ({ ...prevState, key: generatedHash }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleAddItemToSecondTable = () => {
    if (selectedItem && !selectedItems.includes(selectedItem)) {
      setSelectedItems([...selectedItems, selectedItem]);
    }
  };

  const handleRemoveItemFromSecondTable = () => {
    if (selectedItemSecondTable) {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((itemId) => itemId !== selectedItemSecondTable)
      );
      setSelectedItemSecondTable("");
    }
  };

  async function fetchCreatePrivileges(payload: any) {
    try {
      setLoading(true);
      const response = await createPrivileges({ payload });
      toast.success(response.message);
    } catch (err: any) {
      toast.error("Erro ao cadastrar");
    } finally {
      setLoading(false);

      router(-1);
    }
  }

  const handleSubmit = () => {
    // Validar campos obrigatórios
    if (!formState.name || !formState.key || !formState.describe) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Verificar se há permissões associadas
    if (selectedItems.length === 0) {
      toast.error("Por favor, adicione pelo menos uma permissão.");
      return;
    }

    const payload = {
      name: formState.name,
      createdByUser: user?.email,
      key: formState.key,
      description: formState.describe,
      permissions: selectedItems,
    };

    fetchCreatePrivileges(payload);
  };

  return (
    <Template
      title="Cadastrar novo privilegio"
      documentTitle="Cadastro de Privilegio"
      permissionPage="XDXW1DUQKO4YPB6T3HKH6CT9LIDE1I"
    >
      <Row className="flex-col">
        <Row>
          <Col>
            <Label>Criado por</Label>
            <Row>
              <Input disabled value={user?.name} />
              <Input disabled value={user?.email} />
            </Row>
          </Col>
        </Row>
        <Row className="my-4">
          <Col>
            <Label>Nome</Label>
            <Input
              name="name"
              value={formState.name}
              onChange={handleInputChange}
            />
          </Col>
          <Col>
            <Label>Chave</Label>
            <Row>
              <Input
                name="key"
                disabled
                value={randomHash}
                onChange={handleInputChange}
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
              onChange={handleInputChange}
            />
          </Col>
        </Row>
        <Row className="flex-col h-full">
          <Label>Incluir permissões</Label>
          <Row className="h-full">
            <Col>
              <div className="w-full border h-full max-h-[500px] overflow-auto ">
                <div className="relative overflow-x-auto  w-full">
                  <table className="second-table flex-1 w-full overflow-auto   rounded-md shadow text-neutral-700 dark:border-neutral-900">
                    <thead className="border-b border-dashed dark:border-neutral-900">
                      <tr className="dark:text-neutral-100">
                        <th className="py-4 px-4 text-center">Name</th>
                        <th className="py-4 px-4 text-center">Descrição</th>
                      </tr>
                    </thead>
                    <tbody>
                      {permissions
                        .filter((item) => !selectedItems.includes(item._id))
                        .map((item: Permission) => (
                          <tr
                            className={
                              selectedItem === item._id
                                ? "border-b border-dashed bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-900 text-neutral-100 dark:text-neutral-100 cursor-pointer"
                                : "border-b border-dashed dark:text-neutral-100 dark:border-neutral-900 hover:bg-neutral-400 dark:hover:bg-neutral-700 cursor-pointer"
                            }
                            key={item._id}
                            onClick={() => setSelectedItem(item._id)}
                          >
                            <td className="py-4 px-4 text-center">
                              {item.name}
                            </td>
                            <td className="py-4 px-4 text-center">
                              {item.description}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Col>
            <div className="h-full flex justify-center items-center flex-col gap-2">
              <Button variant="success" onClick={handleAddItemToSecondTable}>
                Adicionar
              </Button>
              <Button
                variant="danger"
                onClick={handleRemoveItemFromSecondTable}
              >
                Remover
              </Button>
            </div>
            <Col>
              <div className="w-full border h-full max-h-[500px] overflow-auto ">
                <div className="relative overflow-x-auto  w-full">
                  <table className="second-table flex-1 w-full overflow-auto   rounded-md shadow text-neutral-700 dark:border-neutral-900">
                    <thead className="border-b border-dashed dark:border-neutral-900">
                      <tr className="dark:text-neutral-100">
                        <th className="py-4 px-4 text-center">Name</th>
                        <th className="py-4 px-4 text-center">Descrição</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedItems.map((itemId) => {
                        const item: Permission | undefined = permissions.find(
                          (p) => p._id === itemId
                        );
                        return (
                          <tr
                            className={`cursor-pointer ${
                              selectedItemSecondTable === itemId
                                ? "border-b border-dashed bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-900 text-neutral-100 dark:text-neutral-100 cursor-pointer"
                                : "border-b border-dashed dark:text-neutral-100 dark:border-neutral-900 hover:bg-neutral-400 dark:hover:bg-neutral-700 cursor-pointer"
                            }`}
                            key={item?._id}
                            onClick={() => setSelectedItemSecondTable(itemId)}
                          >
                            <td className="py-4 px-4 text-center">
                              {item?.name}
                            </td>
                            <td className="py-4 px-4 text-center">
                              {item?.description}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="my-4 justify-end">
            <Button variant="outline-secondary" onClick={() => router(-1)}>
              Cancelar
            </Button>
            <Button variant="success" onClick={handleSubmit} disabled={loading}>
              {loading ? <Spinner /> : "Cadastrar"}
            </Button>
          </Row>
        </Row>
      </Row>
    </Template>
  );
}
