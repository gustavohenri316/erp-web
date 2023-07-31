import React from "react";
import { X } from "phosphor-react";

interface SelectedUsersListProps {
  selectedUsers: string[];
  users: UserProps[];
  handleUserClick: (userId: string) => void;
}

const SelectedUsersList: React.FC<SelectedUsersListProps> = ({
  selectedUsers,
  users,
  handleUserClick,
}) => {
  return (
    <div className="border rounded-sm border-dashed min-h-[48px] flex items-end p-2 gap-2 cursor-pointer hover:shadow-md">
      {selectedUsers.map((userId) => {
        const user = users.find((u) => u._id === userId);
        if (user) {
          return (
            <div
              key={user._id}
              className="flex items-center gap-2 p-2 bg-gray-100 rounded-sm"
              title={user?.firstName}
            >
              <img src={user.photo} className="h-12 w-12 rounded-full" alt="" />
              <div>
                <X
                  onClick={() => handleUserClick(user._id)}
                  className="hover:text-red-600 cursor-pointer"
                />
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default SelectedUsersList;
