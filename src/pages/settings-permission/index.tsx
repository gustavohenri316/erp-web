import { useState, useEffect } from "react";
import { Search } from "../../components/Search";
import { Button } from "../../components/Button";
import { Pagination } from "../../components/Pagination";
import { Row } from "../../components/Row";
import { Template } from "../components/Template";
import { SettingsPermissionsTable } from "./_components/settings-permission-table";
import { findPermissions } from "./user-permission.service";
import { useNavigate } from "react-router-dom";

export default function SettingsPermissions() {
  const router = useNavigate();
  const [permissions, setPermissions] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const pageSize = 15;
  const totalItems = permissions?.totalItems;
  const firstPageIndex = (Number(page) - 1) * pageSize + 1;
  const lastPageIndex = Number(page) - 1 + (totalItems - 1);

  const isNotViewPagination = pageSize >= totalItems;

  function handleSearch(value: string) {
    setSearch(value);
  }

  function handleLoading(value: boolean) {
    setLoading(value);
  }

  async function fetchGetPermissions() {
    try {
      const response = await findPermissions({ search, page, pageSize });
      setPermissions(response);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    fetchGetPermissions();
  }, [loading, search, page]);

  function onPageChange(pageNumber: number) {
    setPage(pageNumber);
  }
  return (
    <Template
      title="Permissões do sistema"
      documentTitle="Permissões do Sistema"
      permissionPage="IMJ7ZO07T9QI57X9FB3Y1K3UHZYKQF"
    >
      <Row>
        <Search handleSearch={handleSearch} />
        <Button
          onClick={() => router("/settings-permission-register")}
          variant="success"
        >
          Cadastrar nova permissão
        </Button>
      </Row>
      <Row>
        <SettingsPermissionsTable
          permissions={permissions?.permissions}
          handleLoading={handleLoading}
        />
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
    </Template>
  );
}
