import { Eye, PencilSimple } from "phosphor-react";
import { useState, useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ButtonIcon } from "../../../../components/ButtonIcon";
import PermissionGate from "../../../../components/PermissionGate";
import { Skeleton } from "../../../../components/Skeleton";
import { AuthContext } from "../../../../context/AuthContext";
import { deleteUser } from "../../users-view.service";
import { UsersViewModalDelete } from "../users-view-modal-delete";

interface UserTableProps {
  users: User | undefined;
  handleLoading: (value: boolean) => void;
}
export function UserTable({ users, handleLoading }: UserTableProps) {
  const [isEditPermission, setIsEditPermission] = useState(false);
  const [isDeletePermission, setIsDeletePermission] = useState(false);
  const router = useNavigate();
  const [isViewPermission, setIsViewPermission] = useState(false);
  const [isViewActionsPermission, setIsViewActionsPermission] = useState(false);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const fetchDeleteUser = async (id: string) => {
    try {
      handleLoading(true);
      setLoading(true);
      const response = await deleteUser({ id });
      toast.success(response.message);
    } catch (err: any) {
      toast.error("");
    } finally {
      setLoading(false);
      handleLoading(false);
    }
  };

  return (
    <>
      <PermissionGate
        permission="view-actions-table-user"
        onLoading={setIsViewActionsPermission}
      />
      <PermissionGate
        permission="view-users-details"
        onLoading={setIsViewPermission}
      />
      <PermissionGate permission="edit-users" onLoading={setIsEditPermission} />
      <PermissionGate
        permission="delete-user"
        onLoading={setIsDeletePermission}
      />
      <div className="w-full flex-1">
        <div className="relative overflow-x-auto  w-full">
          <table className="w-full  text-left bg-neutral-50 dark:text-neutral-100 dark:bg-neutral-800 rounded-md shadow my-4">
            <thead className="border-b dark:border-neutral-900">
              <tr>
                <th className="py-4 px-4 text-start">
                  <Skeleton loading={Boolean(!user)}>Imagem</Skeleton>
                </th>
                <th className="py-4 px-4 text-start">
                  <Skeleton loading={Boolean(!user)}>Nome</Skeleton>
                </th>
                <th className="py-4 px-4 text-start">
                  <Skeleton loading={Boolean(!user)}>Sobrenome</Skeleton>
                </th>
                <th className="py-4 px-4 text-start">
                  <Skeleton loading={Boolean(!user)}>Email</Skeleton>
                </th>
                <th className="py-4 px-4 text-start">
                  <Skeleton loading={Boolean(!user)}>Telefone</Skeleton>
                </th>
                <th className="py-4 px-4 text-start">
                  <Skeleton loading={Boolean(!user)}>Equipe</Skeleton>
                </th>
                <th className="py-4 px-4 text-start">
                  <Skeleton loading={Boolean(!user)}>Privilégios</Skeleton>
                </th>
                {isViewActionsPermission && (
                  <th className="px-4 text-end">
                    <Skeleton loading={Boolean(!user)}>Ações</Skeleton>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {users?.users.map((item: UserProps) => {
                return (
                  <tr
                    className="border-b hover:bg-neutral-400 dark:hover:bg-neutral-900 dark:border-neutral-900 dark:text-neutral-100"
                    key={item._id}
                  >
                    <td className="py-2 px-4">
                      <div>
                        <img
                          src={item.photo}
                          alt=""
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-2 px-4">{item.firstName}</td>
                    <td className="py-2 px-4">{item.lastName}</td>
                    <td className="py-2 px-4">{item.email}</td>
                    <td className="py-2 px-4">{item.phoneNumber}</td>
                    <td className="py-2 px-4">{item.team}</td>
                    <td className="py-2 px-4">{item.privileges?.[0]?.name}</td>
                    {isViewActionsPermission && (
                      <td className="py-2 px-4  text-end">
                        <div className="flex gap-1 justify-end">
                          {isViewPermission && (
                            <ButtonIcon
                              variant="secondary"
                              size="sm"
                              onClick={() =>
                                router(`/user-view-details/${item._id}`)
                              }
                            >
                              <Eye size={22} />
                            </ButtonIcon>
                          )}
                          {isEditPermission && (
                            <ButtonIcon variant="primary" size="sm">
                              <PencilSimple
                                size={22}
                                onClick={() =>
                                  router(`/user-update/${item._id}`)
                                }
                              />
                            </ButtonIcon>
                          )}
                          {isDeletePermission && (
                            <UsersViewModalDelete
                              handleDelete={() => fetchDeleteUser(item._id)}
                              loading={loading}
                              name={item.firstName}
                            />
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
