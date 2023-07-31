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
}
