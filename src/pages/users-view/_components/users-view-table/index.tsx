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
import { Table } from "../../../../components/Table";

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
      <Table.Root>
        <Table.Thead>
          <Table.Tr isHeader>
            <Table.Th>
              <Skeleton loading={Boolean(!user)}>Imagem</Skeleton>
            </Table.Th>
            <Table.Th>
              <Skeleton loading={Boolean(!user)}>Nome</Skeleton>
            </Table.Th>
            <Table.Th>
              <Skeleton loading={Boolean(!user)}>Sobrenome</Skeleton>
            </Table.Th>
            <Table.Th>
              <Skeleton loading={Boolean(!user)}>Email</Skeleton>
            </Table.Th>
            <Table.Th>
              <Skeleton loading={Boolean(!user)}>Telefone</Skeleton>
            </Table.Th>
            <Table.Th>
              <Skeleton loading={Boolean(!user)}>Equipe</Skeleton>
            </Table.Th>
            <Table.Th>
              <Skeleton loading={Boolean(!user)}>Privilégios</Skeleton>
            </Table.Th>
            <PermissionGate permission="N8AGIHK940BR31TLKCM3HMHMI7WOV4">
              <Table.Th textAlign="text-end">
                <Skeleton loading={Boolean(!user)}>Ações</Skeleton>
              </Table.Th>
            </PermissionGate>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {users?.users?.map((item: UserProps) => {
            return (
              <Table.Tr key={item._id}>
                <Table.Td>
                  <div>
                    <img
                      src={item.photo}
                      alt=""
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </div>
                </Table.Td>
                <Table.Td>{item.firstName}</Table.Td>
                <Table.Td>{item.lastName}</Table.Td>
                <Table.Td>{item.email}</Table.Td>
                <Table.Td>{item.phoneNumber}</Table.Td>
                <Table.Td>{item.team}</Table.Td>
                <Table.Td>{item.privileges?.[0]?.name}</Table.Td>
                <PermissionGate permission="N8AGIHK940BR31TLKCM3HMHMI7WOV4">
                  <Table.Td>
                    <div className="flex gap-1 justify-end">
                      <PermissionGate permission="WVV09CLGCYPJH1DMV0W0Y66VHG3TCS">
                        <ButtonIcon
                          variant="secondary"
                          size="sm"
                          onClick={() =>
                            router(`/user-view-details/${item._id}`)
                          }
                        >
                          <Eye size={22} />
                        </ButtonIcon>
                      </PermissionGate>
                      <PermissionGate permission="4LBA5ATT2E4XFJE3DQTTCQE1X2EV4Q">
                        <ButtonIcon variant="primary" size="sm">
                          <PencilSimple
                            size={22}
                            onClick={() => router(`/user-update/${item._id}`)}
                          />
                        </ButtonIcon>
                      </PermissionGate>
                      <PermissionGate permission="PIMYNO3AAO50BW1W6RH6E8LKGNXBH8">
                        <UsersViewModalDelete
                          handleDelete={() => fetchDeleteUser(item._id)}
                          loading={loading}
                          name={item.firstName}
                        />
                      </PermissionGate>
                    </div>
                  </Table.Td>
                </PermissionGate>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table.Root>
    </>
  );
}
