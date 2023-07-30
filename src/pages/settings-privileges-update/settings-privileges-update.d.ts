type Permission = {
  _id: string;
  name: string;
  description: string;
};

interface PermissionTypes {
  _id: string;
  name: string;
  createdByUser: string;
  description: string;
  key: string;
  createdAt: string;
  __v: number;
}

interface Privilege {
  _id: string;
  name: string;
  createdByUser: string;
  description: string;
  key: string;
  permissions: PermissionTypes[];
  createdAt: string;
  __v: number;
}

type SettingsPrivilegesUpdateProps = {
  params: {
    slug: string;
  };
};
