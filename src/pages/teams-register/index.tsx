import { useState, useEffect } from "react";
import { Input } from "../../components/Input";
import { Col } from "../../components/Col";
import { Label } from "../../components/Label";
import { Row } from "../../components/Row";
import { Template } from "../components/Template";
import { Search } from "../../components/Search";
import { Button } from "../../components/Button";
import { getUsers } from "../users-view/users-view.service";
import { useNavigate } from "react-router-dom";
import { Check, Trash } from "phosphor-react";
import { ButtonIcon } from "../../components/ButtonIcon";
import { createTeams } from "./teams-register.service";
import { toast } from "react-hot-toast";
import { Spinner } from "../../components/Spinner";

export default function TeamsRegister() {
  const router = useNavigate();
  const [user, setUser] = useState<UserProps[]>([]);
  const [search, setSearch] = useState<string>("");
  const [teamMembers, setTeamMembers] = useState<UserProps[]>([]);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await getUsers({
          currentPage: 1,
          pageSize: 999999,
          search,
        });

        const availableUsers = response.users.filter(
          (user: UserProps) =>
            !teamMembers.some((member) => member._id === user._id)
        );

        setUser(availableUsers);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUsers();
  }, [search, teamMembers]);

  const handleAddMember = (selectedUser: UserProps) => {
    if (!teamMembers.some((member) => member._id === selectedUser._id)) {
      setTeamMembers([...teamMembers, selectedUser]);
      setUser(user.filter((user) => user._id !== selectedUser._id));
    }
  };

  const handleRemoveMember = (selectedUser: UserProps) => {
    const updatedMembers = teamMembers.filter(
      (member) => member._id !== selectedUser._id
    );
    setTeamMembers(updatedMembers);
    setUser([...user, selectedUser]);
  };

  const handleCancel = () => {
    router(-1);
  };

  async function fetchCreateTeamMembers(payload: PayloadProps) {
    try {
      setLoading(true);
      const response = await createTeams({ payload });
      toast.success(response.message);
      router(-1);
    } catch (err) {
      toast.error("Failed to create teams");
    } finally {
      setLoading(false);
    }
  }

  const handleRegister = () => {
    const members = teamMembers.map((member) => member._id);

    if (!members || !name || !description) {
      return toast.error("Campos obrigatórios não preenchidos!");
    }

    const payload = {
      name,
      description,
      members,
    };

    fetchCreateTeamMembers(payload);
  };

  return (
    <Template
      title="Cadastrar nova equipe"
      documentTitle="Cadastrar equipes"
      permissionPage="624RL3QL0UIDMX2NDA8I7AMYN2DWWO"
    >
      <Row>
        <Col>
          <Row className="py-4">
            <Col>
              <Label>Nome</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </Col>
          </Row>
          <Row className="py-4">
            <Col>
              <Label>Descrição</Label>
              <textarea
                className="border rounded-md shadow p-2 dark:bg-neutral-700 dark:border-neutral-900"
                rows={8}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col>
              <Label>Membros</Label>
              <div className="flex flex-col gap-2 overflow-auto h-80">
                {teamMembers.map((member) => (
                  <div
                    key={member._id}
                    className="w-full p-2 bg-neutral-200 dark:bg-neutral-700 dark:border-neutral-900 rounded-md flex items-center justify-between px-4"
                  >
                    <img
                      className="h-10 w-10 rounded-full"
                      alt=""
                      src={member.photo}
                    />
                    <span className="max-md:hidden">
                      {member.firstName} {member.lastName}
                    </span>
                    <span className="max-md:hidden">{member.email}</span>
                    <div>
                      <ButtonIcon
                        size="md"
                        variant="danger"
                        onClick={() => handleRemoveMember(member)}
                      >
                        <Trash />
                      </ButtonIcon>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <Row className="py-4">
            <Col>
              <Label>Adicionar membros</Label>
              <Search handleSearch={setSearch} />
            </Col>
          </Row>
          <Row>
            {user.length > 0 && (
              <div className="border w-full dark:border-neutral-900 rounded-md max-h-96 p-4 flex flex-col overflow-auto gap-1">
                {user.map((user) => (
                  <div
                    key={user._id}
                    className="w-full p-2 bg-neutral-200 dark:bg-neutral-700 dark:border-neutral-900 rounded-md flex items-center justify-between px-4"
                  >
                    <div className="flex items-center gap-8">
                      <img
                        className="h-10 w-10 rounded-full"
                        alt=""
                        src={user.photo}
                      />
                      <span>
                        {user.firstName} {user.lastName}
                      </span>
                      <span className="max-md:hidden">{user.email}</span>
                      <span className="max-md:hidden">{user.phoneNumber}</span>
                      <span className="max-md:hidden">{user.position}</span>
                    </div>
                    <div>
                      <ButtonIcon
                        size="md"
                        variant="primary"
                        onClick={() => handleAddMember(user)}
                      >
                        <Check />
                      </ButtonIcon>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Row>
        </Col>
      </Row>
      <Row className="mt-16 justify-end">
        <Button variant="outline-secondary" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button variant="success" onClick={handleRegister} disabled={loading}>
          {loading ? <Spinner /> : "Cadastrar"}
        </Button>
      </Row>
    </Template>
  );
}
