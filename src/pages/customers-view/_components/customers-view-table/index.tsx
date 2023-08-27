import { Table } from "../../../../components/Table";
import builds from "../../../../../public/buildings.svg";
import { PencilSimple } from "phosphor-react";
import { ButtonIcon } from "../../../../components/ButtonIcon";
import PermissionGate from "../../../../components/PermissionGate";
import { CustomersViewModalDelete } from "../customers-view-modal-delete";
import { useNavigate } from "react-router-dom";
import { deleteCustomers } from "../../customers-view.service";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface CustomersViewTableProps {
  data: ICustomersResponse[] | [];
  handleLoading: (value: boolean) => void;
}

export function CustomersViewTable({
  data,
  handleLoading,
}: CustomersViewTableProps) {
  const router = useNavigate();
  const [loadingDeleteCustomers, setLoadingDeleteCustomers] = useState(false);

  async function fetchDeleteCustomers(id: string) {
    try {
      setLoadingDeleteCustomers(true);
      handleLoading(true);
      await deleteCustomers(id);
      toast.success("Cliente deletado com sucesso!");
    } catch (err) {
      toast.error("Erro ao deletar cliente!");
      console.log(err);
    } finally {
      setLoadingDeleteCustomers(false);
      handleLoading(false);
    }
  }
  return (
    <Table.Root>
      <Table.Thead>
        <Table.Tr isHeader>
          <Table.Th>Imagem</Table.Th>
          <Table.Th>Vinculo</Table.Th>
          <Table.Th>Razão Social</Table.Th>
          <Table.Th>Nome Fantasia</Table.Th>
          <Table.Th>CNPJ</Table.Th>
          <Table.Th textAlign="text-end">Representante</Table.Th>
          <PermissionGate permission="ELNMH80J19LV1W19XUGQOOS6JM430F">
            <Table.Th textAlign="text-end">Ações</Table.Th>
          </PermissionGate>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data.map((customer) => (
          <Table.Tr key={customer._id}>
            <Table.Td>
              <img
                src={customer.avatar_url || builds}
                alt={customer.corporateReason}
                className="w-10 h-10 rounded-full"
              />
            </Table.Td>
            <Table.Td>{customer.bond}</Table.Td>
            <Table.Td>{customer.corporateReason}</Table.Td>
            <Table.Td>{customer.fantasyName}</Table.Td>
            <Table.Td>{customer.document}</Table.Td>
            <Table.Td textAlign="text-end">{customer.responsibleName}</Table.Td>
            <PermissionGate permission="ELNMH80J19LV1W19XUGQOOS6JM430F">
              <Table.Td>
                <div className="flex gap-1 justify-end">
                  <PermissionGate permission="GW7V0I3ZP6TCJFTJF3NXWLUITVYW7Z">
                    <ButtonIcon variant="primary" size="sm">
                      <PencilSimple
                        size={22}
                        onClick={() =>
                          router(`/customers-update/${customer._id}`)
                        }
                      />
                    </ButtonIcon>
                  </PermissionGate>
                  <PermissionGate permission="7WKG8USSAGRPK6ZZONM538YBCQ59JJ">
                    <CustomersViewModalDelete
                      handleDelete={() => fetchDeleteCustomers(customer._id)}
                      loading={loadingDeleteCustomers}
                      name={customer.fantasyName}
                    />
                  </PermissionGate>
                </div>
              </Table.Td>
            </PermissionGate>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table.Root>
  );
}
