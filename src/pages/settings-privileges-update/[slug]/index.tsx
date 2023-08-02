import { Spinner } from "../../../components/Spinner";
import { Input } from "../../../components/Input";
import { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../components/Button";
import { Col } from "../../../components/Col";
import { Label } from "../../../components/Label";
import { Row } from "../../../components/Row";
import { AuthContext } from "../../../context/AuthContext";
import { Template } from "../../components/Template";
import { findPermissionsNoPagination } from "../../settings-permission/user-permission.service";
import {
  findByIdPrivileges,
  updatePrivileges,
} from "../settings-privileges-update.service";

export default function SettingsPrivilegesUpdate() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const router = useNavigate();
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedItemSecondTable, setSelectedItemSecondTable] = useState("");
  const [loading, setLoading] = useState(false);

  const [privileges, setPrivileges] = useState<Privilege>();
  const [privilegePermissions, setPrivilegePermissions] = useState<
    Permission[]
  >([]);

  async function findPrivileges() {
    const response = await findByIdPrivileges({ id: id as string });
    setPrivileges(response);
    if (response && response.permissions) {
      setSelectedItems(response.permissions.map((perm: any) => perm._id));
      setPrivilegePermissions(response.permissions);
    }
  }
  useEffect(() => {
    findPrivileges();
    fetchGetPermissions();
  }, []);

  useEffect(() => {
    if (privileges) {
      setFormState({
        name: privileges.name,
        key: privileges.key,
        describe: privileges.description,
      });
      setPrivilegePermissions(privileges.permissions || []);
    }
  }, [privileges]);

  const [formState, setFormState] = useState({
    name: "",
    key: "",
    describe: "",
  });

  async function fetchGetPermissions() {
    try {
      const response = await findPermissionsNoPagination();
      setPermissions(response);
    } catch (error) {
      console.error(error);
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddItemToSecondTable = () => {
    if (selectedItem && !selectedItems.includes(selectedItem)) {
      setSelectedItems([...selectedItems, selectedItem]);
      const selectedPermission = permissions.find(
        (item) => item._id === selectedItem
      );
      if (selectedPermission) {
        setPrivilegePermissions([...privilegePermissions, selectedPermission]);
      }
      setSelectedItem(null);
    }
  };

  const handleRemoveItemFromSecondTable = () => {
    if (selectedItemSecondTable) {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((itemId) => itemId !== selectedItemSecondTable)
      );
      setPrivilegePermissions((prevPrivilegePermissions) =>
        prevPrivilegePermissions.filter(
          (permission) => permission._id !== selectedItemSecondTable
        )
      );
      setSelectedItem(selectedItemSecondTable);
      setSelectedItemSecondTable("");
    }
  };

  async function fetchUpdatePrivileges(payload: any) {
    try {
      setLoading(true);
      await updatePrivileges({ payload, id: id as string });
      toast.success("Editado com sucesso!");
    } catch (err: any) {
      toast.error("Erro ao cadastrar");
    } finally {
      setLoading(false);
      router("/settings-privileges");
    }
  }

  const handleSubmit = () => {
    if (!formState.name || !formState.key || !formState.describe) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    if (selectedItems.length === 0) {
      toast.error("Por favor, adicione pelo menos uma permissão.");
      return;
    }

    const payload = {
      name: formState.name,
      createdByUser: user?.email,
      key: privileges?.key,
      description: formState.describe,
      permissions: selectedItems,
    };

    fetchUpdatePrivileges(payload);
  };

  return (
    <Template
      title="Atualizar Privilégios"
      documentTitle="Atualizar Privilégios"
    >
      <Row className="flex-col ">
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
              <Input name="key" disabled value={privileges?.key ?? ""} />
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
                        .filter(
                          (item) =>
                            !selectedItems.includes(item._id) &&
                            !privilegePermissions.some(
                              (p) => p._id === item._id
                            ) // Filter out permissions already in the second table
                        )
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
                      {privilegePermissions.map((item: Permission) => (
                        <tr
                          className={`cursor-pointer ${
                            selectedItemSecondTable === item._id
                              ? "border-b border-dashed bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-900 text-neutral-100 dark:text-neutral-100 cursor-pointer"
                              : "border-b border-dashed dark:text-neutral-100 dark:border-neutral-900 hover:bg-neutral-400 dark:hover:bg-neutral-700 cursor-pointer"
                          }`}
                          key={item._id}
                          onClick={() => setSelectedItemSecondTable(item._id)}
                        >
                          <td className="py-4 px-4 text-center">{item.name}</td>
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
          </Row>
          <Row className="my-4 justify-end">
            <Button variant="outline-secondary" onClick={() => router(-1)}>
              Cancelar
            </Button>
            <Button variant="success" onClick={handleSubmit} disabled={loading}>
              {loading ? <Spinner /> : "Atualizar"}
            </Button>
          </Row>
        </Row>
      </Row>
    </Template>
  );
}
