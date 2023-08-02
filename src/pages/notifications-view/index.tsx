import { PaperPlaneTilt, CaretUp, CaretDown } from "phosphor-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Col } from "../../components/Col";
import { Row } from "../../components/Row";
import { useAuth } from "../../context/AuthContext";
import { Template } from "../components/Template";
import { NotificationsComponent } from "./_components/notification-component";
import { getAllNotifications } from "./notifications-view.service";
import { Search } from "../../components/Search";
import PermissionGate from "../../components/PermissionGate";

export default function NotificationsView() {
  const { user } = useAuth();
  const router = useNavigate();
  const [notifications, setNotifications] = useState<INotification>({
    directNotifications: [],
    globalNotifications: [],
  });
  const [openNotificationsGlobal, setOpenNotificationsGlobal] = useState(false);
  const [openNotificationsDirect, setOpenNotificationsDirect] = useState(false);
  const [loadingDirect, setLoadingDirect] = useState(false);
  const [loadingGlobal, setLoadingGlobal] = useState(false);
  const [hasMoreDirect, setHasMoreDirect] = useState(true);
  const [hasMoreGlobal, setHasMoreGlobal] = useState(true);
  const [pageDirect, setPageDirect] = useState(1);
  const [pageGlobal, setPageGlobal] = useState(1);
  const containerRefDirect = useRef<HTMLDivElement>(null);
  const [initialLoad, setInitialLoad] = useState(false);
  const containerRefGlobal = useRef<HTMLDivElement>(null);
  const [permissionDeleteNotifications, setPermissionDeleteNotifications] =
    useState(false);

  function handleNotificationGlobal() {
    setOpenNotificationsGlobal(!openNotificationsGlobal);
    setInitialLoad(false);
  }

  function handleNotificationDirect() {
    setOpenNotificationsDirect(!openNotificationsDirect);
    setInitialLoad(false);
  }

  async function fetchListAllNotifications() {
    if (user) {
      const response = await getAllNotifications(user.id, pageDirect);

      setNotifications((prevNotifications) => ({
        directNotifications: [
          ...prevNotifications.directNotifications,
          ...response.directNotifications,
        ],
        globalNotifications: [
          ...prevNotifications.globalNotifications,
          ...response.globalNotifications,
        ],
        directNotificationsCount: response.directNotificationsCount,
        globalNotificationsCount: response.globalNotificationsCount,
      }));

      setLoadingDirect(false);
      setLoadingGlobal(false);
      setHasMoreDirect(response.directNotifications.length > 0);
      setHasMoreGlobal(response.globalNotifications.length > 0);
    }
  }

  useEffect(() => {
    fetchListAllNotifications();
  }, [user, pageDirect, pageGlobal]);

  async function handleLoadMoreDirect() {
    if (!loadingDirect && hasMoreDirect) {
      setLoadingDirect(true);
      setPageDirect((prevPage) => prevPage + 1);
    }
  }

  async function handleLoadMoreGlobal() {
    if (!loadingGlobal && hasMoreGlobal) {
      setLoadingGlobal(true);
      setPageGlobal((prevPage) => prevPage + 1);
    }
  }

  function handleScrollDirect() {
    if (
      containerRefDirect.current &&
      containerRefDirect.current.scrollHeight -
        containerRefDirect.current.scrollTop -
        containerRefDirect.current.clientHeight <
        100
    ) {
      if (!loadingDirect) {
        handleLoadMoreDirect();
      }
    }
  }

  function handleScrollGlobal() {
    if (
      containerRefGlobal.current &&
      containerRefGlobal.current.scrollHeight -
        containerRefGlobal.current.scrollTop -
        containerRefGlobal.current.clientHeight <
        100
    ) {
      if (!loadingGlobal) {
        handleLoadMoreGlobal();
      }
    }
  }

  useEffect(() => {
    if (containerRefDirect.current) {
      containerRefDirect.current.addEventListener("scroll", handleScrollDirect);
      return () => {
        containerRefDirect.current?.removeEventListener(
          "scroll",
          handleScrollDirect
        );
      };
    }
  }, [handleScrollDirect, loadingDirect, hasMoreDirect]);

  useEffect(() => {
    if (containerRefGlobal.current) {
      containerRefGlobal.current.addEventListener("scroll", handleScrollGlobal);
      return () => {
        containerRefGlobal.current?.removeEventListener(
          "scroll",
          handleScrollGlobal
        );
      };
    }
  }, [handleScrollGlobal, loadingGlobal, hasMoreGlobal]);

  function handleLoadingDirect(value: boolean) {
    setLoadingDirect(value);
  }

  function handleLoadingGlobal(value: boolean) {
    setLoadingGlobal(value);
  }

  return (
    <Template
      title="Notificações"
      documentTitle="Notificações"
      permissionPage="view-notifications"
    >
      <PermissionGate
        permission="delete-notifications"
        onLoading={setPermissionDeleteNotifications}
      />
      <Row className="h-16 my-4">
        <Search />
        <PermissionGate permission="create-notifications">
          <Button
            variant="success"
            onClick={() => router("/notifications-register")}
          >
            <PaperPlaneTilt />
            Enviar Notificação
          </Button>
        </PermissionGate>
      </Row>

      <Row className="py-2">
        <Col>
          <div
            className="rounded-sm border py-4 px-4 cursor-pointer hover:shadow-md flex items-center justify-between gap-4"
            onClick={handleNotificationDirect}
          >
            <div className="flex items-center gap-4">
              <div className="h-6 w-6 text-white flex items-center justify-center rounded-full bg-gray-500">
                {notifications.directNotificationsCount || 0}
              </div>
              Notificações Diretas
            </div>
            <div>{openNotificationsDirect ? <CaretUp /> : <CaretDown />}</div>
          </div>
          {openNotificationsDirect && (
            <div className="flex-1 overflow-auto" ref={containerRefDirect}>
              {notifications.directNotifications.map(
                (item: NotificationsProps) => (
                  <Row key={item._id} className="my-2">
                    <NotificationsComponent
                      permissionDeleteNotifications={
                        permissionDeleteNotifications
                      }
                      handleLoading={handleLoadingDirect}
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
              <Row className="justify-center">
                {!initialLoad &&
                  hasMoreDirect &&
                  notifications.directNotifications.length > 5 && (
                    <Button variant="success" onClick={handleLoadMoreDirect}>
                      Carregar mais
                    </Button>
                  )}
              </Row>
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
                {notifications.globalNotificationsCount || 0}
              </div>
              Notificações Globais
            </div>
            <div>{openNotificationsGlobal ? <CaretUp /> : <CaretDown />}</div>
          </div>
          {openNotificationsGlobal && (
            <div className="flex-1 overflow-auto" ref={containerRefGlobal}>
              {notifications.globalNotifications.map(
                (item: NotificationsProps) => (
                  <Row key={item._id} className="my-2">
                    <NotificationsComponent
                      permissionDeleteNotifications={
                        permissionDeleteNotifications
                      }
                      _id={item._id}
                      handleLoading={handleLoadingGlobal}
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
              <Row className="justify-center">
                {!initialLoad &&
                  hasMoreDirect &&
                  notifications.directNotifications.length > 5 && (
                    <Button variant="success" onClick={handleLoadMoreDirect}>
                      Carregar mais
                    </Button>
                  )}
              </Row>
            </div>
          )}
        </Col>
      </Row>
    </Template>
  );
}
