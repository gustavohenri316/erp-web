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
import { defaultAvatarUrl } from "../../../../assets/data";
import { Spinner } from "../../../../components/Spinner";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function NotificationsComponent({
  _id,
  createdAt,
  isGlobal,
  sentBy,
  isRead,
  message,
  handleLoading,
  permissionDeleteNotifications,
  title,
}: NotificationsProps) {
  const { user, findNotifications } = useAuth();
  const [userSentBy, setUserSentBy] = useState<UserProps>();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localIsRead, setLocalIsRead] = useState(isRead);
  const router = useNavigate();

  const { "Dashboard.UserToken": Token } = parseCookies();

  async function fetchMarkAsReadNotifications() {
    await markAsReadNotifications({
      id: user?.id as string,
      idNotification: _id,
    });
  }

  const handleOpen = async () => {
    await fetchMarkAsReadNotifications();
    setLocalIsRead(true);

    setOpen(!open);
  };

  async function fetchFindUserReceivedBy() {
    const response = await findUser({ id: sentBy });
    setUserSentBy(response);
  }
  async function fetchDeleteNotifications() {
    try {
      handleLoading(true);
      setLoading(true);
      const response = await deleteNotifications({
        id: _id,
        userId: user?.id as string,
      });
      toast.success(response.message);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      handleLoading(false);

      router("/notifications-view");
    }
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
        <div className="flex items-start gap-4  text-start flex-col justify-start bg-white  rounded-l-md px-2 py-2 text-black">
          <div className="flex items-center justify-start gap-4 bg-white w-[180px] ">
            <img
              src={userSentBy?.photo || defaultAvatarUrl}
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="text-sm font-bold">{userSentBy?.firstName}</h3>
              <span className="text-sm">{userSentBy?.team}</span>
            </div>
          </div>
        </div>
        <div
          className={`${
            isGlobal ? "bg-green-600" : "bg-gray-100 text-neutral-800"
          } flex-1 w-full h-full`}
        >
          <div className=" px-8 py-2 flex items-center justify-between w-full h-full">
            <div className="text-xl">{title}</div>
            <div className="flex flex-col gap-1 text-sm">
              <div>{isGlobal ? "Todos" : "Somente você"}</div>
              <div>
                <DateDisplay date={createdAt} />
              </div>
              <div>
                {!localIsRead ? (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600"></div>
                    <span>Não visualizado</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    <span>Visualizado</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          className={`flex items-center justify-center h-full bg-white rounded-r-md`}
        >
          <div className="px-8 py-2 gap-2 flex items-center">
            <ButtonIcon size="md" variant="primary" onClick={handleOpen}>
              {!open ? <Eye /> : <EyeSlash />}
            </ButtonIcon>
            {permissionDeleteNotifications && (
              <ButtonIcon size="md" variant="danger" disabled={loading}>
                {loading ? (
                  <Spinner size={18} />
                ) : (
                  <X onClick={fetchDeleteNotifications} />
                )}
              </ButtonIcon>
            )}
          </div>
        </div>
      </div>
      {open && (
        <div className="w-full p-8 my-2 rounded-sm bg-white border">
          <div
            className="text-base"
            dangerouslySetInnerHTML={{ __html: message }}
          />
        </div>
      )}
    </div>
  );
}
