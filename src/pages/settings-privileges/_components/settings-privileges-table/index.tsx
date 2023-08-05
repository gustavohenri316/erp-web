import { PencilSimple } from "phosphor-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { deletePrivileges } from "../../settings-privileges.service";
import { SettingsPrivilegesModalDelete } from "../settings-privileges-modal-delete";
import { useNavigate } from "react-router-dom";
import { ButtonIcon } from "../../../../components/ButtonIcon";

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
    <div className="w-full flex-1">
      <div className="relative overflow-x-auto  w-full">
        <table className="w-full  text-left bg-neutral-200 dark:text-neutral-100 dark:bg-neutral-800 rounded-md shadow my-4">
          <thead className="border-b border-neutral-300 dark:border-neutral-900">
            <tr>
              <th className="py-4 px-4 text-center whitespace-nowrap">Nome</th>
              <th className="py-4 px-4 text-center whitespace-nowrap">Chave</th>
              <th className="py-4 px-4 text-center whitespace-nowrap">
                Descrição
              </th>
              <th className="py-4 px-4 text-end whitespace-nowrap">Ações</th>
            </tr>
          </thead>
          <tbody>
            {privileges &&
              privileges.map((item: Privilege) => {
                return (
                  <tr
                    key={item._id}
                    className="border-b border-neutral-300 hover:bg-neutral-400 dark:hover:bg-neutral-900 dark:border-neutral-900 dark:text-neutral-100"
                  >
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      {item.name}
                    </td>
                    <td className="py-4 px-4 text-center whitespace-nowrap">
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
                          {isCopied && copiedItem === item.key
                            ? "Copied"
                            : "Copy"}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-center">
                      {item.description}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-center">
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
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
