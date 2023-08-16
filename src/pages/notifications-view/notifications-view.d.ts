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
  sentByInfo: {
    email: string;
    firstName: string;
    lastName: string;
    photo: string;
    team: string;
  };
  permissionDeleteNotifications: boolean;
  onDeleteNotification: (deletedId: string) => void;
}

type INotification = {
  directNotifications: NotificationsProps[];
  globalNotifications: NotificationsProps[];
  directNotificationsCount?: number;
  globalNotificationsCount?: number;
};
