import { X } from "phosphor-react";
import React from "react";
import PermissionGate from "../../../../components/PermissionGate";

interface UsersListProps {
  users: UserProps[];
  isAllUsersSelected: boolean;
  selectedUsers: string[];
  handleUserClick: (userId: string) => void;
  handleSelectAllUsers: () => void;
  handleDeselectAllUsers: () => void;
}

const UsersList: React.FC<UsersListProps> = ({
  users,
  isAllUsersSelected,
  selectedUsers,
  handleUserClick,
  handleSelectAllUsers,
  handleDeselectAllUsers,
}) => {
  return (
    <div className="max-h-[400px] gap-2 rounded-sm overflow-x-auto border p-2 ">
      <div
        className={`border rounded-sm cursor-pointer hover:shadow-md flex items-center p-2 ${
          selectedUsers.includes("") ? "bg-blue-100" : ""
        }`}
      >
        <div
          onClick={
            isAllUsersSelected ? handleDeselectAllUsers : handleSelectAllUsers
          }
          className="w-full flex justify-between"
        >
          <PermissionGate permission="create-global-notifications">
            <h3 className="text-lg font-bold">Todos os usuários do sistema</h3>
            {isAllUsersSelected && (
              <X
                onClick={handleDeselectAllUsers}
                className="hover:text-red-600 cursor-pointer"
              />
            )}
          </PermissionGate>
        </div>
      </div>

      {!isAllUsersSelected &&
        users.map((item: UserProps) => {
          if (item._id !== "") {
            return (
              <div
                key={item._id}
                onClick={() => handleUserClick(item._id)}
                className={`border gap-4 rounded-sm mt-2 cursor-pointer hover:shadow-md flex items-center p-2 ${
                  selectedUsers.includes(item._id) ? "bg-blue-100" : ""
                }`}
              >
                <img
                  src={item.photo}
                  className="h-12 w-12 rounded-full"
                  alt=""
                />
                <div>
                  <h3 className="text-sm font-bold">
                    {item.firstName} {item.lastName}
                  </h3>
                  <p className="text-sm">{item.email}</p>
                </div>
              </div>
            );
          }
          return null;
        })}
    </div>
  );
};

export default UsersList;
