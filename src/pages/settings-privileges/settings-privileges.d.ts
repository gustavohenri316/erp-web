interface Permission {
  _id: string;
  name: string;
  description: string;
  key: string;
  createdAt: string;
  createdByUser: string;
  __v: number;
}

interface Privilege {
  _id: string;
  name: string;
  description: string;
  key: string;
  createdAt: string;
  createdByUser: string;
  permissions: Permission[];
  __v: number;
}


interface SettingsPrivilegesTableProps {
  privileges: Privilege[] | undefined;
  handleLoading: (value: boolean) => void 
}