type DeletePermissionsService = {
  id: string;
};

type SearchPermissionService = {
  search: string;
  page: number;
  pageSize: number;
};

type FindPermissionByNameService = {
  search: string;
};

interface SettingsPermissionModalDeleteProps {
  name: string;
  handleDelete: () => void;
  loading: boolean;
}

interface Rule {
  _id: string;
  name: string;
  createdByUser: string;
  description: string;
  key: string;
  createdAt: string;
  __v: number;
}

interface SettingsPermissionsTableProps {
  permissions: any;
  handleLoading: (value: boolean) => void;
}
