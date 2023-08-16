import { parseCookies } from "nookies";
import { Eye, EyeSlash, X } from "phosphor-react";
import { useState } from "react";
import { ButtonIcon } from "../../../../components/ButtonIcon";
import { useAuth } from "../../../../context/AuthContext";
import DateDisplay from "../../../../utils/format-date-notifications";

import {
  markAsReadNotifications,
  deleteNotifications,
} from "../../notifications-view.service";
import { Spinner } from "../../../../components/Spinner";
import { toast } from "react-hot-toast";

export function NotificationsComponent({
  _id,
  createdAt,
  isGlobal,
  isRead,
  message,
  handleLoading,
  sentByInfo,
  permissionDeleteNotifications,
  onDeleteNotification,
  title,
}: NotificationsProps) {
  const { user, findNotifications } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
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
      findNotifications(Token);
    }

    setOpen(!open);
  };

  async function fetchDeleteNotifications() {
    try {
      handleLoading(true);
      setLoading(true);
      const response = await deleteNotifications({
        id: _id,
        userId: user?.id as string,
      });
      toast.success(response.message);
      onDeleteNotification(_id);
      findNotifications(Token);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      handleLoading(false);
    }
  }

  return (
    <div className="flex flex-col w-full">
      <div className="w-full border dark:border-neutral-900 rounded-md  dark:bg-neutral-700 cursor-pointer hover:shadow text-neutral-100 dark:text-neutral-800  flex justify-between items-center ">
        <div className="flex items-start gap-4  text-start flex-col justify-start   dark:bg-neutral-700 rounded-l-md px-2 py-2 text-black dark:text-neutral-100">
          <div className="flex items-center justify-start gap-4  dark:bg-neutral-700 w-[180px] ">
            <img
              src={sentByInfo?.photo}
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="text-sm font-bold">{sentByInfo?.firstName}</h3>
              <span className="text-sm">{sentByInfo?.team}</span>
            </div>
          </div>
        </div>
        <div
          className={`${
            isGlobal
              ? "bg-green-600 dark:bg-green-950 dark:text-neutral-100"
              : "bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100"
          } flex-1 w-full h-full`}
        >
          <div className=" px-8 py-2 flex items-center justify-between text-end w-full h-full">
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
          className={`flex items-center justify-center h-full bg-neutral-100 dark:bg-neutral-700 rounded-r-md`}
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
        <div className="w-full p-8 my-2 rounded-md bg-neutral-100 border">
          <div
            className="text-base"
            dangerouslySetInnerHTML={{ __html: message }}
          />
        </div>
      )}
    </div>
  );
}
