import { PencilSimple } from "phosphor-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { deletePrivileges } from "../../settings-privileges.service";
import { SettingsPrivilegesModalDelete } from "../settings-privileges-modal-delete";
import { useNavigate } from "react-router-dom";
import { ButtonIcon } from "../../../../components/ButtonIcon";
import { Table } from "../../../../components/Table";

export function SettingsPrivilegesTable({
  privileges,
  handleLoading,
}: SettingsPrivilegesTableProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiedItem, setCopiedItem] = useState("");
  const router = useNavigate();

  const fetchDeletePrivileges = async (id: string) => {
    try {
      handleLoading(true);
      setLoading(true);
      const response = await deletePrivileges({ id });
      toast.success(response.message);
    } catch (err: any) {
      console.error(err);
    } finally {
      handleLoading(false);
      setLoading(false);
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
          <Table.Th textAlign="text-end">Ações</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {privileges &&
          privileges.map((item: Privilege) => {
            return (
              <Table.Tr key={item._id}>
                <Table.Td py={4}>{item.name}</Table.Td>
                <Table.Td py={4}>
                  <div className="flex items-center gap-2 whitespace-nowrap  w-full">
                    <input
                      className="cursor-pointer w-full dark:border-neutral-900 hover:text-black  dark:bg-neutral-800 whitespace-nowrap dark:hover:text-neutral-100 overflow-auto border p-2 rounded-md"
                      title={item.key}
                      defaultValue={item.key}
                    />

                    <div
                      className="border rounded-md p-2 cursor-pointer whitespace-nowrap dark:border-neutral-900  hover:border-black "
                      onClick={() => copyItem(item.key)}
                    >
                      {isCopied && copiedItem === item.key ? "Copied" : "Copy"}
                    </div>
                  </div>
                </Table.Td>
                <Table.Td py={4}>{item.description}</Table.Td>
                <Table.Td py={4}>
                  <div className="flex gap-1 justify-end">
                    <ButtonIcon
                      variant="primary"
                      size="sm"
                      onClick={() =>
                        router(`/settings-privileges-update/${item._id}`)
                      }
                    >
                      <PencilSimple size={22} />
                    </ButtonIcon>
                    <SettingsPrivilegesModalDelete
                      loading={loading}
                      name={item.name}
                      handleDelete={() => fetchDeletePrivileges(item._id)}
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
