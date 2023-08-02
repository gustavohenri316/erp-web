interface NotificationsProps {
  receivedBy: string;
  message: string;
  isGlobal: boolean;
  isRead: boolean;
  _id: string;
  createdAt: string;
  title: string;
  sentBy: string;
  handleLoading: (value: boolean) => void;
  timestamp: string;
  permissionDeleteNotifications: boolean;
}

type INotification = {
  directNotifications: NotificationsProps[];
  globalNotifications: NotificationsProps[];
  directNotificationsCount?: number;
  globalNotificationsCount?: number;
};
