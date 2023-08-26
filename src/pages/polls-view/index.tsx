import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import PermissionGate from "../../components/PermissionGate";
import { Row } from "../../components/Row";
import { Search } from "../../components/Search";
import { Template } from "../components/Template";
import { PollsTable } from "./_components/polls-view-table";
import { getPolls } from "./polls-view.service";
import { useContext, useEffect, useState } from "react";
import { Pagination } from "../../components/Pagination";
import { AuthContext } from "../../context/AuthContext";

export default function PollsView() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const registerPolls = () => navigate("/polls-register");
  const [data, setData] = useState<IPolls>();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const pageSize = 11;

  const totalItems = data?.totalCount || 0;
  const firstPageIndex = (page - 1) * pageSize + 1;
  const lastPageIndex = Math.min(page * pageSize, totalItems);

  function onPageChange(pageNumber: number) {
    setPage(pageNumber);
  }

  const isNotViewPagination = pageSize >= totalItems;

  function handleLoading(value: boolean) {
    setLoading(value);
  }

  async function fetchPolls() {
    try {
      if (user) {
        const response = await getPolls({
          page,
          pageSize,
          search,
          userId: user?.id as string,
        });
        setData(response);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchPolls();
  }, [loading, search, page, user]);

  return (
    <Template
      documentTitle="Enquetes"
      title="Enquetes"
      permissionPage="49HW3N8E4IQNM9QE1J0J4O1KWVDUWF"
    >
      <Row>
        <Search
          handleSearch={setSearch}
          placeholder="Buscar por Titulo/Criador"
        />
        <PermissionGate permission="9TLTS6BVTFVWCLX9CPYJKXAZ9HDUXA">
          <Button onClick={registerPolls} variant="success">
            Nova Enquete
          </Button>
        </PermissionGate>
      </Row>
      <Row>
        <PollsTable data={data} handleLoading={handleLoading} />
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
