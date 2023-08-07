import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Row } from "../../components/Row";
import { Search } from "../../components/Search";
import { Template } from "../components/Template";
import { TeamsViewTable } from "./_components/teams-view-table";
import { getTeams } from "./teams-view.service";
import { useEffect, useState } from "react";
import { Pagination } from "../../components/Pagination";

export default function TeamsView() {
  const router = useNavigate();
  const [teams, setTeams] = useState<TeamListServiceProps>();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState("1");
  const pageSize = "15";
  const totalItems = teams?.total || 0;
  const firstPageIndex = (Number(page) - 1) * Number(pageSize) + 1;
  const lastPageIndex = Number(page) - 1 + (totalItems - 1);
  const isNotViewPagination = Number(pageSize) >= totalItems;

  function onPageChange(pageNumber: number) {
    setPage(String(pageNumber));
  }

  async function fetchGetTeams() {
    try {
      const response = await getTeams({ page, pageSize });
      setTeams(response);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchGetTeams();
  }, [loading, page]);

  function handleUpdateList(value: boolean) {
    setLoading(value);
  }
  return (
    <Template documentTitle="Equipes" title="Equipes">
      <Row>
        <Search />
        <Button variant="success" onClick={() => router("/teams-register")}>
          Cadastrar Equipe
        </Button>
      </Row>
      <Row>
        <TeamsViewTable data={teams} handleUpdateList={handleUpdateList} />
      </Row>
      <Row className="justify-end">
        {!isNotViewPagination && (
          <Pagination
            firstItemPage={firstPageIndex}
            totalItems={totalItems}
            lastItemPage={lastPageIndex}
            itemsPerPage={Number(pageSize)}
            onPageChange={onPageChange}
          />
        )}
      </Row>
    </Template>
  );
}
