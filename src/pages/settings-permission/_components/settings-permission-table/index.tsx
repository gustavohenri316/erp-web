import { useState } from "react";
import { deletePermissions } from "../../user-permission.service";
import { toast } from "react-hot-toast";
import { SettingsPermissionModalDelete } from "../settings-permission-modal-delete";

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
    <div className="w-full flex-1">
      <div className="relative overflow-x-auto  w-full">
        <table className="w-full  text-left bg-neutral-100 rounded-md shadow-lg my-4">
          <thead className="border-b">
            <tr>
              <th scope="col" className="px-6 whitespace-nowrap py-3">
                Nome
              </th>
              <th scope="col" className="px-6 whitespace-nowrap py-3">
                Chave
              </th>
              <th scope="col" className="px-6 whitespace-nowrap py-3">
                Descrição
              </th>
              <th scope="col" className="px-6 whitespace-nowrap py-3">
                Criado por
              </th>

              <th className="py-4 px-4 text-end">Ações</th>
            </tr>
          </thead>
          <tbody>
            {permissions &&
              permissions.map((item: Rule) => (
                <tr key={item._id} className="border-b hover:bg-neutral-400">
                  <td className="py-4 px-4 text-start whitespace-nowrap">
                    {item.name}
                  </td>
                  <td className="py-4 px-4 text-start whitespace-nowrap">
                    <div className="flex items-center gap-2 w-full whitespace-nowrap">
                      <input
                        className="cursor-pointer  hover:text-black whitespace-nowrap  overflow-auto border p-2 rounded-md"
                        title={item.key}
                        defaultValue={item.key}
                      />

                      <div
                        className="border rounded-md p-2 cursor-pointer whitespace-nowrap hover:border-black "
                        onClick={() => copyItem(item.key)}
                      >
                        {isCopied && copiedItem === item.key
                          ? "Copied"
                          : "Copy"}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 whitespace-nowrap px-4 text-start">
                    {item.description}
                  </td>
                  <td className="py-4 px-4 text-start">{item.createdByUser}</td>

                  <td className="py-4 px-4 whitespace-nowrap text-end">
                    <div className="flex gap-1 whitespace-nowrap justify-end w-full">
                      <SettingsPermissionModalDelete
                        handleDelete={() => fetchDeletePermissions(item._id)}
                        loading={loading}
                        name={item.name}
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
