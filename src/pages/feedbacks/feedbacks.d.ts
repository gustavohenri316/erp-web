interface IFeedbacksUsersView {
  Token: string;
  data: IPollsProps | undefined;
  deleteFeedback: (id: string) => void;
  loading: boolean;
}

interface IUserPolls {
  data: IPollsProps | undefined;
}
