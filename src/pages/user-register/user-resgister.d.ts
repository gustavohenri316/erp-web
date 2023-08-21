interface UserFormValues {
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
  startDate: string;
  privileges: Array<string>;
  salary: string;
  employmentType: string;
  username: string;
  corporateEmail: string;
  password: string;
}

interface FormErrors {
  firstName: string;
  email: string;
}
