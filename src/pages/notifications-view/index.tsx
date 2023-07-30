import { PaperPlaneTilt, CaretUp, CaretDown } from "phosphor-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Col } from "../../components/Col";
import { Row } from "../../components/Row";
import { useAuth } from "../../context/AuthContext";
import { Template } from "../components/Template";
import { NotificationsComponent } from "./_components/notification-component";
import { getAllNotifications } from "./notifications-view.service";
import { Search } from "../../components/Search";

type INotification = {
  directNotifications: NotificationsProps[];
  globalNotifications: NotificationsProps[];
};

export default function NotificationsView() {
  const { user } = useAuth();
  const router = useNavigate();
  const [notifications, setNotifications] = useState<INotification>();
  const [openNotificationsGlobal, setOpenNotificationsGlobal] = useState(false);
  const [openNotificationsDirect, setOpenNotificationsDirect] = useState(false);

  function handleNotificationGlobal() {
    setOpenNotificationsGlobal(!openNotificationsGlobal);
  }
  function handleNotificationDirect() {
    setOpenNotificationsDirect(!openNotificationsDirect);
  }
  async function fetchListAllNotifications() {
    const response = await getAllNotifications(user?.id as string);
    setNotifications(response);
  }

  useEffect(() => {
    if (user) {
      fetchListAllNotifications();
    }
  }, [user]);

  return (
    <Template
      title="Notificações"
      documentTitle="Notificações"
      permissionPage="register-new-user"
    >
      <Row className="h-16 my-4">
        <Search />
        <Button
          variant="success"
          onClick={() => router("/notifications-register")}
        >
          <PaperPlaneTilt />
          Enviar Notificação
        </Button>
      </Row>

      <Row className="py-2">
        <Col>
          <div
            className="rounded-sm border py-4 px-4 cursor-pointer hover:shadow-md flex items-center justify-between gap-4"
            onClick={handleNotificationDirect}
          >
            <div className="flex items-center gap-4">
              <div className="h-6 w-6 text-white flex items-center justify-center rounded-full bg-gray-500">
                {notifications?.directNotifications.length}
              </div>
              Notificações Diretas
            </div>
            <div>{openNotificationsDirect ? <CaretUp /> : <CaretDown />}</div>
          </div>
          {openNotificationsDirect && (
            <div className="flex-1 overflow-auto">
              {notifications &&
                notifications?.directNotifications.map(
                  (item: NotificationsProps) => (
                    <Row key={item._id} className="my-2">
                      <NotificationsComponent
                        _id={item._id}
                        createdAt={item.createdAt}
                        isGlobal={item.isGlobal}
                        isRead={item.isRead}
                        sentBy={item.sentBy}
                        message={item.message}
                        receivedBy={item.receivedBy}
                        title={item.title}
                        timestamp={item.timestamp}
                      />
                    </Row>
                  )
                )}
            </div>
          )}
        </Col>
      </Row>
      <Row className="py-2">
        <Col>
          <div
            className="rounded-sm border py-4 px-4 cursor-pointer hover:shadow-md flex items-center justify-between gap-4"
            onClick={handleNotificationGlobal}
          >
            <div className="flex items-center gap-4">
              <div className="h-6 w-6 text-white flex items-center justify-center rounded-full bg-gray-500">
                {notifications?.globalNotifications.length}
              </div>
              Notificações Globais
            </div>
            <div>{openNotificationsGlobal ? <CaretUp /> : <CaretDown />}</div>
          </div>
          {openNotificationsGlobal && (
            <div className="flex-1 overflow-auto">
              {notifications &&
                notifications?.globalNotifications.map(
                  (item: NotificationsProps) => (
                    <Row key={item._id} className="my-2">
                      <NotificationsComponent
                        _id={item._id}
                        createdAt={item.createdAt}
                        isGlobal={item.isGlobal}
                        isRead={item.isRead}
                        sentBy={item.sentBy}
                        message={item.message}
                        receivedBy={item.receivedBy}
                        title={item.title}
                        timestamp={item.timestamp}
                      />
                    </Row>
                  )
                )}
            </div>
          )}
        </Col>
      </Row>
    </Template>
  );
}
