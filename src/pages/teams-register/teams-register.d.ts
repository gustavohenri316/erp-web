type PayloadProps = {
  name: string;
  description: string;
  members: Array<string>;
};

type CreateTeams = {
  payload: PayloadProps;
};
