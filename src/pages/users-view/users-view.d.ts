interface User {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  users: UsersProps[]
}

interface UserProps {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  cpf: string;
  rg: string;
  birthDate: string; 
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  countryRegion: string;
  zipCode: string;
  position: string;
  education: string;
  photo: string;
  startDate: string; 
  salary: string; 
  employmentType: string;
  username: string;
  corporateEmail: string;
  password: string;
  team: string;
  privileges: Privilege[];
  __v: number;
}

interface Privilege {
  _id: string;
  name: string;
  createdByUser: string;
  description: string;
  key: string;
  permissions: string[];
  createdAt: string; 
  __v: number;
}