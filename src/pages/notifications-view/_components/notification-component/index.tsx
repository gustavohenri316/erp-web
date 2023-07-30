import { parseCookies } from "nookies";
import { Eye, EyeSlash, X } from "phosphor-react";
import { useState, useEffect } from "react";
import { ButtonIcon } from "../../../../components/ButtonIcon";
import { useAuth } from "../../../../context/AuthContext";
import DateDisplay from "../../../../utils/format-date-notifications";
import { findUser } from "../../../users-view/users-view.service";
import {
  markAsReadNotifications,
  deleteNotifications,
} from "../../notifications-view.service";

export function NotificationsComponent({
  _id,
  createdAt,
  isGlobal,
  sentBy,
  isRead,
  message,
  title,
}: NotificationsProps) {
  const { user, findNotifications } = useAuth();
  const [userSentBy, setUserSentBy] = useState<UserProps>();
  const [open, setOpen] = useState(false);
  const [localIsRead, setLocalIsRead] = useState(isRead);

  const { "Dashboard.UserToken": Token } = parseCookies();

  async function fetchMarkAsReadNotifications() {
    await markAsReadNotifications({
      id: user?.id as string,
      idNotification: _id,
    });
  }

  const handleOpen = async () => {
    if (!localIsRead) {
      await fetchMarkAsReadNotifications();
      setLocalIsRead(true);
    }
    setOpen(!open);
  };

  async function fetchFindUserReceivedBy() {
    const response = await findUser({ id: sentBy });
    setUserSentBy(response);
  }
  async function fetchDeleteNotifications() {
    await deleteNotifications({
      id: _id,
      userId: user?.id as string,
    });
  }

  useEffect(() => {
    if (_id) {
      fetchFindUserReceivedBy();
    }
  }, [_id]);

  useEffect(() => {
    findNotifications(Token);
  }, [localIsRead]);

  return (
    <div className="flex flex-col w-full">
      <div className="w-full border rounded-sm  cursor-pointer hover:shadow-xl text-neutral-100 shadow-md flex justify-between items-center ">
        <div className="flex items-start gap-4 flex-col justify-start bg-white  rounded-l-md px-8 py-8 text-black">
          <div className="flex items-center justify-center gap-4 bg-white w-[200px] ">
            <img
              src={userSentBy?.photo}
              alt=""
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-bold">{userSentBy?.firstName}</h3>
              <span className="text-sm">{userSentBy?.phoneNumber}</span>
            </div>
          </div>
          <p className="text-sm">{userSentBy?.email}</p>
        </div>
        <div
          className={`${
            isGlobal ? "bg-green-600" : "bg-gray-100 text-neutral-800"
          } flex-1 w-full h-full`}
        >
          <div className=" px-8 py-8 flex flex-col justify-between w-full h-full">
            <p className="text-2xl">{title}</p>

            <span className="text-end text-base">
              <DateDisplay date={createdAt} />
            </span>
            <div className="justify-between flex items-center ">
              <span className="text-base">
                Enviado para: {isGlobal ? "Todos" : "Somente você"}
              </span>
              {!isGlobal && (
                <div className="justify-end flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full  ${
                      localIsRead ? "bg-blue-500" : "bg-green-500"
                    }`}
                  ></div>
                  <span>{localIsRead ? "Visualizado" : "Não lida"}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className={`flex items-center justify-center h-full bg-white rounded-r-md`}
        >
          <div className="px-8 py-8 gap-2 flex items-center">
            <ButtonIcon size="md" variant="primary" onClick={handleOpen}>
              {!open ? <Eye /> : <EyeSlash />}
            </ButtonIcon>
            <ButtonIcon size="md" variant="danger">
              <X onClick={fetchDeleteNotifications} />
            </ButtonIcon>
          </div>
        </div>
      </div>
      {open && (
        <div className="w-full p-8 my-2 rounded-sm bg-white border">
          {<p className="text-base">{message}</p>}
        </div>
      )}
    </div>
  );
}
