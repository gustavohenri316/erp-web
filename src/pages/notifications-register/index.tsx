import { X } from "phosphor-react";
import { useState, useEffect } from "react";
import { Button } from "../../components/Button";
import { Col } from "../../components/Col";
import { Label } from "../../components/Label";
import { Row } from "../../components/Row";
import { useAuth } from "../../context/AuthContext";
import { Template } from "../components/Template";
import { getUsers } from "../users-view/users-view.service";
import { createNotifications } from "./notifications-register.service";
import { Input } from "../../components/Input";

export default function NotificationsRegister() {
  const { user } = useAuth();
  const [isSelectionOpen, setSelectionOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isUsersListOpen, setUsersListOpen] = useState(false);
  const [isAllUsersSelected, setAllUsersSelected] = useState(false);
  const [users, setUsers] = useState<UserProps[]>([]);

  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");

  async function fetchCreateNotifications() {
    await createNotifications({
      isGlobal: isAllUsersSelected,
      message: message,
      receivedBy: isAllUsersSelected ? selectedUsers : [user?.id as string],
      sentBy: user?.id as string,
      title: title,
    });
  }

  function handleOpenSelection() {
    setSelectionOpen(!isSelectionOpen);
    setUsersListOpen(true);
  }

  function handleSelectAllUsers() {
    setAllUsersSelected(true);
    setUsersListOpen(false);
  }

  function handleDeselectAllUsers() {
    setAllUsersSelected(false);
    setUsersListOpen(true);
  }

  async function fetchUsers() {
    try {
      const response = await getUsers({ pageSize: 999999999 });
      setUsers(response.users);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserClick = (userId: string) => {
    if (userId === "") {
      setSelectedUsers([""]);
    } else if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  return (
    <Template documentTitle="" title="Enviar Notificações">
      <Row className="my-4">
        <Col>
          <Label>Destinatário</Label>
          <div className="flex gap-2">
            <div
              className="whitespace-nowrap flex rounded-sm bg-green-600 h-12 px-2 cursor-pointer items-center justify-center text-neutral-100 text-center"
              onClick={handleOpenSelection}
            >
              Selecionar usuário
            </div>
            <Col>
              {!isAllUsersSelected && (
                <div className="border rounded-sm border-dashed min-h-[48px] flex items-end p-2 gap-2 cursor-pointer hover:shadow-md">
                  {selectedUsers.map((userId) => {
                    const user = users.find((u) => u._id === userId);
                    if (user) {
                      return (
                        <div
                          key={user._id}
                          className="flex items-center gap-2 p-2 bg-gray-100 rounded-sm"
                        >
                          <img
                            src={user.photo}
                            className="h-12 w-12 rounded-full"
                            alt=""
                          />

                          <div>
                            <X
                              onClick={() => handleUserClick(user._id)}
                              className="hover:text-red-600 cursor-pointer"
                            />
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              )}
              {isSelectionOpen && (
                <div className="h-45 gap-2 rounded-sm overflow-x-auto border p-2 ">
                  <div
                    className={`border rounded-sm cursor-pointer hover:shadow-md flex items-center p-2 ${
                      selectedUsers.includes("") ? "bg-blue-100" : ""
                    }`}
                  >
                    <div
                      onClick={
                        isAllUsersSelected
                          ? handleDeselectAllUsers
                          : handleSelectAllUsers
                      }
                      className="w-full flex justify-between"
                    >
                      <h3 className="text-lg font-bold">
                        Todos os usuários do sistema
                      </h3>
                      {isAllUsersSelected && (
                        <X
                          onClick={handleDeselectAllUsers}
                          className="hover:text-red-600 cursor-pointer"
                        />
                      )}
                    </div>
                  </div>

                  {isUsersListOpen &&
                    users.map((item: UserProps) => {
                      if (item._id !== "") {
                        return (
                          <div
                            key={item._id}
                            onClick={() => handleUserClick(item._id)}
                            className={`border gap-4 rounded-sm mt-2 cursor-pointer hover:shadow-md flex items-center p-2 ${
                              selectedUsers.includes(item._id)
                                ? "bg-blue-100"
                                : ""
                            }`}
                          >
                            <img
                              src={item.photo}
                              className="h-12 w-12 rounded-full"
                              alt=""
                            />
                            <div>
                              <h3 className="text-sm font-bold">
                                {item.firstName} {item.lastName}
                              </h3>
                              <p className="text-sm">{item.email}</p>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })}
                </div>
              )}
            </Col>
          </div>
        </Col>
      </Row>
      <Row className="my-4">
        <Col>
          <Label>Assunto</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Col>
      </Row>
      <Row className="my-4">
        <Col>
          <Label>Mensagem</Label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border border-dashed rounded-sm p-4 "
            rows={12}
            placeholder="Escreva a mensagem "
          ></textarea>
        </Col>
      </Row>
      <Row className="mt-4 justify-end">
        <Button variant="outline-secondary">Cancelar</Button>
        <Button variant="success" onClick={fetchCreateNotifications}>
          Enviar
        </Button>
      </Row>
    </Template>
  );
}
