import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Pagination } from "../../components/Pagination";
import PermissionGate from "../../components/PermissionGate";
import { Row } from "../../components/Row";
import { Template } from "../components/Template";
import { getUsers } from "./users-view.service";
import { Search } from "../../components/Search";
import { UserTable } from "./_components/users-view-table";

export default function UsersView() {
  const [users, setUsers] = useState<User>();
  const router = useNavigate();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState("1");

  const pageSize = 13;
  const totalItems = users?.totalItems || 0;
  const firstPageIndex = (Number(page) - 1) * pageSize + 1;
  const lastPageIndex = Number(page) - 1 + (totalItems - 1);

  const isNotViewPagination = pageSize >= totalItems;

  function onPageChange(pageNumber: number) {
    setPage(String(pageNumber));
  }

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await getUsers({
          currentPage: page as string,
          pageSize: pageSize,
        });

        setUsers(response);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUsers();
  }, [loading]);

  function handleLoading(value: boolean) {
    setLoading(value);
  }

  return (
    <Template
      documentTitle="Usuários"
      title="Visualizar Usuários"
      permissionPage="view-users"
    >
      <div className="w-full">
        <Row>
          <Search placeholder="Faça uma busca pela descrição" />
          <PermissionGate permission="register-new-user">
            <Button variant="success" onClick={() => router("/user-register")}>
              Cadastrar usuário
            </Button>
          </PermissionGate>
        </Row>
        <Row>
          {users && <UserTable users={users} handleLoading={handleLoading} />}
        </Row>
        <Row className="justify-end">
          {!isNotViewPagination && (
            <Pagination
              firstItemPage={firstPageIndex}
              totalItems={totalItems}
              lastItemPage={lastPageIndex}
              itemsPerPage={pageSize}
              onPageChange={onPageChange}
            />
          )}
        </Row>
      </div>
    </Template>
  );
}
