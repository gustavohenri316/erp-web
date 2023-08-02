import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Template } from "../components/Template";
import { getUsers } from "../users-view/users-view.service";
import { createNotifications } from "./notifications-register.service";
import { toast } from "react-hot-toast";
import { Spinner } from "../../components/Spinner";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Row } from "../../components/Row";
import { Col } from "../../components/Col";
import { Label } from "../../components/Label";
import { UserCirclePlus } from "phosphor-react";
import SelectedUsersList from "./_components/SelectedUserList";
import UsersList from "./_components/UserList";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import NotificationsEditor from "./_components/NotificationsEditor";

function NotificationsRegister() {
  const { user } = useAuth();
  const router = useNavigate();
  const [isSelectionOpen, setSelectionOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [, setUsersListOpen] = useState(false);
  const [isAllUsersSelected, setAllUsersSelected] = useState(false);
  const [users, setUsers] = useState<UserProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");

  async function fetchCreateNotifications() {
    try {
      setIsLoading(true);
      const response = await createNotifications({
        isGlobal: isAllUsersSelected,
        message: message,
        receivedBy: !isAllUsersSelected ? selectedUsers : [user?.id as string],
        sentBy: user?.id as string,
        title: title,
      });
      toast.success(response.message);
      window.location.href = "/notifications-view";
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
    <Template
      documentTitle=""
      title="Enviar Notificações"
      isBack
      permissionPage="create-notifications"
    >
      <Row className="my-4 text-md">
        <Col>
          <Label>Destinatário</Label>
          <div className="flex gap-2">
            <div
              className="whitespace-nowrap flex rounded-md bg-green-600 dark:bg-green-950 h-12 px-2 cursor-pointer items-center justify-center text-neutral-100 text-center"
              onClick={handleOpenSelection}
            >
              <UserCirclePlus size={32} />
            </div>
            <Col>
              {!isAllUsersSelected && (
                <SelectedUsersList
                  selectedUsers={selectedUsers}
                  users={users}
                  handleUserClick={handleUserClick}
                />
              )}
              {isSelectionOpen && (
                <UsersList
                  users={users}
                  isAllUsersSelected={isAllUsersSelected}
                  selectedUsers={selectedUsers}
                  handleUserClick={handleUserClick}
                  handleSelectAllUsers={handleSelectAllUsers}
                  handleDeselectAllUsers={handleDeselectAllUsers}
                />
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
          <NotificationsEditor value={message} onChange={setMessage} />
        </Col>
      </Row>
      <Row className="mt-4 justify-end">
        <Button variant="outline-secondary" onClick={() => router(-1)}>
          Cancelar
        </Button>
        <Button
          variant="success"
          onClick={fetchCreateNotifications}
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : "Enviar"}
        </Button>
      </Row>
    </Template>
  );
}

export default NotificationsRegister;
