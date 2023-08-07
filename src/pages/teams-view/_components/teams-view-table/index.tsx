import { PencilSimple, Trash } from "phosphor-react";
import { ButtonIcon } from "../../../../components/ButtonIcon";
import { Table } from "../../../../components/Table";
import { deleteTeams } from "../../teams-view.service";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { TeamsViewModalDelete } from "../teams-view-modal-delete";

export function TeamsViewTable({
  data,
  handleUpdateList,
}: TeamsViewTableProps) {
  const [loading, setLoading] = useState(false);

  async function handleDeleteTeams(id: string) {
    try {
      handleUpdateList(true);
      setLoading(true);
      await deleteTeams(id);
      toast.success("Equipe deletada com sucesso!");
    } catch (err: any) {
      toast.error("Error deleting teams", err);
      console.log(err);
    } finally {
      setLoading(false);
      handleUpdateList(false);
    }
  }
  return (
    <Table.Root>
      <Table.Thead>
        <Table.Tr isHeader>
          <Table.Th>Nome</Table.Th>
          <Table.Th>Descrição</Table.Th>
          <Table.Th textAlign="text-center">Quantidade de membros</Table.Th>
          <Table.Th textAlign="text-end">Ações</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data &&
          data.teams.map((team: Team) => {
            return (
              <Table.Tr key={team._id}>
                <Table.Td py={4}>{team.name}</Table.Td>
                <Table.Td py={4}>{team.description}</Table.Td>
                <Table.Td py={4} textAlign="text-center">
                  {team.members.length} membros
                </Table.Td>
                <Table.Td py={4} textAlign="text-end">
                  <div className="flex gap-1 justify-end">
                    <ButtonIcon variant="primary" size="sm">
                      <PencilSimple size={22} />
                    </ButtonIcon>

                    <TeamsViewModalDelete
                      handleDelete={() => handleDeleteTeams(team._id)}
                      loading={loading}
                      name={team.name}
                    />
                  </div>
                </Table.Td>
              </Table.Tr>
            );
          })}
      </Table.Tbody>
    </Table.Root>
  );
}
