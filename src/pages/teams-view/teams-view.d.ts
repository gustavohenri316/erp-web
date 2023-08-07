interface TeamListServiceProps {
  teams: Team[];
  total: number;
}
interface Team {
  _id: string;
  name: string;
  createdAt: string;
  description: string;
  members: string[];
  __v: number;
}
interface TeamsViewTableProps {
  data: TeamListServiceProps | undefined;
  handleUpdateList: (value: boolean) => void;
}
