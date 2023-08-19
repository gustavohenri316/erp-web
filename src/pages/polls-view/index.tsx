import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import PermissionGate from "../../components/PermissionGate";
import { Row } from "../../components/Row";
import { Search } from "../../components/Search";
import { Template } from "../components/Template";
import { PollsTable } from "./_components/polls-view-table";
import { getPolls } from "./polls-view.service";
import { useEffect, useState } from "react";

export default function PollsView() {
  const navigate = useNavigate();
  const registerPolls = () => navigate("/polls-register");
  const [data, setData] = useState<IPolls>();
  const [loading, setLoading] = useState(false);

  function handleLoading(value: boolean) {
    setLoading(value);
  }

  async function fetchPolls() {
    try {
      const response = await getPolls();
      setData(response);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchPolls();
  }, [loading]);

  return (
    <Template
      documentTitle="Enquetes"
      title="Enquetes"
      permissionPage="49HW3N8E4IQNM9QE1J0J4O1KWVDUWF"
    >
      <Row>
        <Search />
        <PermissionGate permission="9TLTS6BVTFVWCLX9CPYJKXAZ9HDUXA">
          <Button onClick={registerPolls} variant="success">
            Nova Enquete
          </Button>
        </PermissionGate>
      </Row>
      <Row>
        <PollsTable data={data} handleLoading={handleLoading} />
      </Row>
    </Template>
  );
}
