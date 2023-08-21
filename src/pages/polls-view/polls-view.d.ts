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
}

interface IPollsProps {
  _id: string;
  title: string;
  createdByName: string;
  createdByEmail: string;
  createdByAvatar: string;
  feedbackType: string;
  scaleType: string | null;
  createdAt: string;
  description: string;
  feedbacks: IFeedback[];
}
