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
  const router = useNavigate();

  const [users, setUsers] = useState<User>();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const pageSize = 11;
  const totalItems = users?.totalItems || 0;
  const firstPageIndex = (page - 1) * pageSize + 1;
  const lastPageIndex = Math.min(page * pageSize, totalItems);

  const isNotViewPagination = pageSize >= totalItems;

  function onPageChange(pageNumber: number) {
    setPage(pageNumber);
  }

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await getUsers({
          currentPage: page,
          pageSize: pageSize,
          search,
        });

        setUsers(response);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUsers();
  }, [search, page, loading]);

  function handleSearch(value: string) {
    setSearch(value);
  }

  function handleLoading(value: boolean) {
    setLoading(value);
  }

  return (
    <Template
      documentTitle="Usuários"
      title="Visualizar Usuários"
      permissionPage="AX5BSOD5G8CT1Y5I8XGVWYIFLXK6WW"
    >
      <div className="w-full">
        <Row className="max-sm:flex-col">
          <Search
            placeholder="Faça uma busca pela descrição"
            handleSearch={handleSearch}
          />
          <PermissionGate permission="VOP7HCJL8DHRMIT7SE9H7OZVX044L8">
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
