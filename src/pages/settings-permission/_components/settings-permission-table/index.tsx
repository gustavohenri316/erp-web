import { useState } from "react";
import { deletePermissions } from "../../user-permission.service";
import { toast } from "react-hot-toast";
import { SettingsPermissionModalDelete } from "../settings-permission-modal-delete";
import { Table } from "../../../../components/Table";

export function SettingsPermissionsTable({
  permissions,
  handleLoading,
}: SettingsPermissionsTableProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiedItem, setCopiedItem] = useState("");

  const fetchDeletePermissions = async (id: string) => {
    try {
      handleLoading(true);
      setLoading(true);
      const response = await deletePermissions({ id });
      toast.success(response.message);
    } catch (err: any) {
      toast.error(err);
    } finally {
      setLoading(false);
      handleLoading(false);
    }
  };

  const copyItem = (item: string) => {
    navigator.clipboard.writeText(item).then(() => {
      setIsCopied(true);
      setCopiedItem(item);
      setTimeout(() => {
        setIsCopied(false);
        setCopiedItem("");
      }, 3000);
    });
  };

  return (
    <Table.Root>
      <Table.Thead>
        <Table.Tr isHeader>
          <Table.Th>Nome</Table.Th>
          <Table.Th>Chave</Table.Th>
          <Table.Th>Descrição</Table.Th>
          <Table.Th>Criado por</Table.Th>
          <Table.Th textAlign="text-end">Ações</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {permissions &&
          permissions.map((item: Rule) => (
            <Table.Tr key={item._id}>
              <Table.Td py={4}>{item.name}</Table.Td>
              <Table.Td py={4}>
                <div className="flex items-center gap-2 w-full whitespace-nowrap">
                  <input
                    className="cursor-pointer dark:border-neutral-900 hover:text-black  dark:bg-neutral-800 whitespace-nowrap dark:hover:text-neutral-100 overflow-auto border p-2 rounded-md"
                    title={item.key}
                    defaultValue={item.key}
                  />

                  <div
                    className="border border-white rounded-md p-2 cursor-pointer whitespace-nowrap dark:border-neutral-900  hover:border-black "
                    onClick={() => copyItem(item.key)}
                  >
                    {isCopied && copiedItem === item.key ? "Copied" : "Copy"}
                  </div>
                </div>
              </Table.Td>
              <Table.Td py={4}>{item.description}</Table.Td>
              <Table.Td py={4}>{item.createdByUser}</Table.Td>
              <Table.Td py={4}>
                <div className="flex gap-1 whitespace-nowrap justify-end w-full">
                  <SettingsPermissionModalDelete
                    handleDelete={() => fetchDeletePermissions(item._id)}
                    loading={loading}
                    name={item.name}
                  />
                </div>
              </Table.Td>
            </Table.Tr>
          ))}
      </Table.Tbody>
    </Table.Root>
  );
}
