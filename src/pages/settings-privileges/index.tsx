import { useNavigate } from "react-router-dom";
import { Search } from "../../components/Search";
import { SettingsPrivilegesTable } from "./_components/settings-privileges-table";
import { useEffect, useState } from "react";
import { getPrivileges } from "./settings-privileges.service";
import { Button } from "../../components/Button";
import { Row } from "../../components/Row";
import { Template } from "../components/Template";

export default function SettingsPrivileges() {
  const router = useNavigate();
  const [privileges, setPrivileges] = useState<Privilege[]>();

  const [loading, setLoading] = useState(false);

  function handleLoading(value: boolean) {
    setLoading(value);
  }

  async function fetchGetPrivileges() {
    try {
      const response = await getPrivileges();
      setPrivileges(response);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchGetPrivileges();
  }, [loading]);

  return (
    <Template
      title="Privilégios de usuário"
      documentTitle="Privilégios de usuário"
    >
      <Row>
        <Search />
        <Button
          onClick={() => router("/settings-privileges-register")}
          variant="success"
        >
          Cadastrar novo privilégio
        </Button>
      </Row>
      <Row>
        <SettingsPrivilegesTable
          privileges={privileges}
          handleLoading={handleLoading}
        />
      </Row>
    </Template>
  );
}
