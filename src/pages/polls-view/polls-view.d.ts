interface IFeedback {
  name: string;
  email: string;
  createdAt: string;
  feedbackMessage: string;
  _id: string;
  assessment: number;
}

interface IPolls {
  polls: IPollsProps[];
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

interface IPollsProps {
  _id: string;
  title: string;
  createdByName: string;
  createdByEmail: string;
  createdByAvatar: string;
  isFeedbackPublic: boolean;
  createdAt: string;
  description: string;
  feedbacks: IFeedback[];
}
