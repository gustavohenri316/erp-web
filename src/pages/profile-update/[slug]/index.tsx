import { ImageSquare } from "phosphor-react";
import { Spinner } from "../../../components/Spinner";
import { Input } from "../../../components/Input";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../components/Button";
import { handleCloudinaryUpload } from "../../../components/CloudinaryUpload";
import { Col } from "../../../components/Col";
import { Label } from "../../../components/Label";
import { Row } from "../../../components/Row";
import { Select } from "../../../components/Select";
import { Template } from "../../components/Template";
import { getPrivileges } from "../../settings-privileges/settings-privileges.service";
import { findUser } from "../../users-view/users-view.service";
import { updateUser } from "../profile-update.service";
import PermissionGate from "../../../components/PermissionGate";

export default function ProfileUpdate() {
  const { id } = useParams();
  const router = useNavigate();
  const [selectedPrivilege, setSelectedPrivilege] = useState<string>("");
  const [formValues, setFormValues] = useState<UserFormValues>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    cpf: "",
    rg: "",
    birthDate: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    countryRegion: "",
    zipCode: "",
    position: "",
    education: "",
    startDate: "",
    salary: "",
    employmentType: "",
    privileges: [""],
    username: "",
    corporateEmail: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    firstName: "",
    email: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  async function fetchFindUser() {
    const data = await findUser({ id: id as string });

    if (data) {
      setFormValues({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        cpf: data.cpf,
        rg: data.rg,
        birthDate: data.birthDate,
        street: data.street,
        number: data.number,
        complement: data.complement,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
        countryRegion: data.countryRegion,
        zipCode: data.zipCode,
        position: data.position,
        education: data.education,
        startDate: data.startDate,
        salary: data.salary,
        employmentType: data.employmentType,
        privileges: [""],
        username: data.username,
        corporateEmail: data.corporateEmail,
        password: "",
      });
      setSelectedPrivilege(data.privileges[0]._id);
      setPhotoPreview(data.photo || null);
      setImage(data.photo || null);
    }
  }

  useEffect(() => {
    if (id) {
      fetchFindUser();
    }
  }, [id]);

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    void handleCloudinaryUpload(e, setImage);
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateRequiredField = (value: string) => {
    return value.trim() !== "";
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedPrivilege(selectedValue);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors: FormErrors = {
      firstName: "",
      email: "",
    };

    if (!validateRequiredField(formValues.firstName)) {
      errors.firstName = "Campo obrigatório.";
    }

    if (!validateEmail(formValues.email)) {
      errors.email = "Formato de email inválido.";
    }

    setFormErrors(errors);

    const payload = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      phoneNumber: formValues.phoneNumber,
      cpf: formValues.cpf,
      rg: formValues.rg,
      birthDate: formValues.birthDate,
      street: formValues.street,
      number: formValues.number,
      complement: formValues.complement,
      neighborhood: formValues.neighborhood,
      city: formValues.city,
      state: formValues.state,
      countryRegion: formValues.countryRegion,
      zipCode: formValues.zipCode,
      position: formValues.position,
      education: formValues.education,
      startDate: formValues.startDate,
      salary: formValues.salary,
      employmentType: formValues.employmentType,
      privileges: [selectedPrivilege],
      photo: image,
      username: formValues.username,
      corporateEmail: formValues.corporateEmail,
      password: formValues.password,
    };

    try {
      setLoading(true);
      const response: any = await updateUser({
        payload,
        id: id as string,
      });
      toast.success(response.message);
      router(-1);
    } catch (error) {
      toast.error("Erro ao editar o usuário");
    } finally {
      setLoading(false);
    }
  };

  const [privileges, setPrivileges] = useState<Privilege[]>();

  async function fetchGetPrivileges() {
    try {
      const response = await getPrivileges();
      setPrivileges(response);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchGetPrivileges();
  }, []);
  return (
    <Template
      documentTitle="Editar | Perfil"
      title="Editar Usuário"
      permissionPage="A8PB8LX6VF1R476N7QYY2AGSPFMZ5E"
    >
      <form onSubmit={handleSubmit} className="my-4">
        <Row className="pb-4">
          <span className="text-xl font-semibold">Informações pessoais</span>
        </Row>
        <Row className="max-sm:flex-col">
          <Col>
            <Row className="max-sm:flex-col">
              <Col className="mr-8">
                <Label>Nome</Label>
                <Input
                  name="firstName"
                  value={formValues.firstName}
                  onChange={handleChange}
                  onBlur={() => {
                    if (!validateRequiredField(formValues.firstName)) {
                      setFormErrors((prevState) => ({
                        ...prevState,
                        firstName: "Campo obrigatório.",
                      }));
                    }
                  }}
                />
                {formErrors.firstName && (
                  <span className="text-red-500">{formErrors.firstName}</span>
                )}
              </Col>
              <Col>
                <Label>Sobrenome</Label>
                <Input
                  name="lastName"
                  value={formValues.lastName}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row className="mt-2 max-sm:flex-col">
              <Col className="mr-8">
                <Label>Email</Label>
                <Input
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  onBlur={() => {
                    if (!validateEmail(formValues.email)) {
                      setFormErrors((prevState) => ({
                        ...prevState,
                        email: "Formato de email inválido.",
                      }));
                    }
                  }}
                />
                {formErrors.email && (
                  <span className="text-red-500">{formErrors.email}</span>
                )}
              </Col>
              <Col>
                <Label>Telefone</Label>
                <Input
                  name="phoneNumber"
                  value={formValues.phoneNumber}
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <Row className="mt-2 max-sm:flex-col">
              <Col className="mr-8">
                <Label>CPF</Label>
                <Input
                  name="cpf"
                  value={formValues.cpf}
                  onChange={handleChange}
                />
              </Col>
              <Col>
                <Label>RG</Label>
                <Input
                  name="rg"
                  value={formValues.rg}
                  onChange={handleChange}
                />
              </Col>
              <Col>
                <Label>Data de nascimento</Label>
                <Input
                  name="birthDate"
                  type="date"
                  value={formValues.birthDate}
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </Col>
          <Col>
            <Row className="justify-center">
              <Label htmlFor="photo">Foto</Label>
              <div className="border-dashed w-[210px] h-[210px]  border rounded-full flex items-center justify-center">
                <label
                  htmlFor="photo"
                  className="w-full h-full cursor-pointer flex items-center justify-center"
                >
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <ImageSquare
                      size={100}
                      className="text-neutral-200 hover:text-neutral-400"
                      onClick={handleIconClick}
                    />
                  )}
                </label>
                <Input
                  type="file"
                  name="photo"
                  id="photo"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onInput={handleFileChange}
                />
              </div>
            </Row>
          </Col>
        </Row>
        <PermissionGate permission="9ZVFK3GS3AM2IZQJOXZ4DWUCYOATQ3">
          <Row className="my-4 max-sm:flex-col">
            <span className="text-xl font-semibold">
              Informações de endereço
            </span>
          </Row>
          <Row className="max-sm:flex-col">
            <Col className="mr-8">
              <Label>Rua</Label>
              <Input
                name="street"
                value={formValues.street}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <Row className="max-sm:flex-col">
                <Col>
                  <Label>Número</Label>
                  <Input
                    name="number"
                    value={formValues.number}
                    onChange={handleChange}
                  />
                </Col>
                <Col>
                  <Label>Complemento</Label>
                  <Input
                    name="complement"
                    value={formValues.complement}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="mt-2 max-sm:flex-col">
            <Col className="mr-8">
              <Row className="max-sm:flex-col">
                <Col>
                  <Label>Bairro</Label>
                  <Input
                    name="neighborhood"
                    value={formValues.neighborhood}
                    onChange={handleChange}
                  />
                </Col>
                <Col>
                  <Label>Cidade</Label>
                  <Input
                    name="city"
                    value={formValues.city}
                    onChange={handleChange}
                  />
                </Col>
                <Col>
                  <Label>Estado</Label>
                  <Input
                    name="state"
                    value={formValues.state}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
            </Col>
            <Col>
              <Row className="max-sm:flex-col">
                <Col>
                  <Label>País/região</Label>
                  <Input
                    name="countryRegion"
                    value={formValues.countryRegion}
                    onChange={handleChange}
                  />
                </Col>
                <Col>
                  <Label>CEP</Label>
                  <Input
                    name="zipCode"
                    value={formValues.zipCode}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </PermissionGate>
        <PermissionGate permission="RANEI55YQQ1C7WPJUM5PJP9LPU6JP7">
          <Row className="my-4 max-sm:flex-col">
            <span className="text-xl font-semibold">
              Informações profissionais
            </span>
          </Row>
          <Row className="mt-2 max-sm:flex-col">
            <Col className="mr-8">
              <Row className="max-sm:flex-col">
                <Col>
                  <Label>Cargo</Label>
                  <Input
                    name="position"
                    value={formValues.position}
                    onChange={handleChange}
                  />
                </Col>
                <Col>
                  <Label>Formação</Label>
                  <Input
                    name="education"
                    value={formValues.education}
                    onChange={handleChange}
                  />
                </Col>
                <Col>
                  <Label>Data de início</Label>
                  <Input
                    name="startDate"
                    type="date"
                    value={formValues.startDate}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
            </Col>
            <Col>
              <Row className="max-sm:flex-col">
                <Col>
                  <Label>Salário</Label>
                  <Input
                    name="salary"
                    value={formValues.salary}
                    onChange={handleChange}
                  />
                </Col>
                <Col>
                  <Label>Tipo de contratação</Label>
                  <Select
                    name="employmentType"
                    value={formValues.employmentType}
                    onChange={handleChange}
                  >
                    <option value="">Selecione o tipo de contratação</option>
                    <option value="CLT">CLT</option>
                    <option value="PJ">PJ</option>
                    <option value="Estágio">Estágio</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Temporário">Temporário</option>
                    <option value="Aprendiz">Aprendiz</option>
                    <option value="Autônomo">Autônomo</option>
                    <option value="Tempo Determinado">Tempo Determinado</option>
                    <option value="Meio Período">Meio Período</option>
                  </Select>
                </Col>
              </Row>
            </Col>
          </Row>
        </PermissionGate>
        <Row className="my-4 max-sm:flex-col">
          <span className="text-xl font-semibold">Informações de acesso</span>
        </Row>
        <Row className="mt-2 max-sm:flex-col">
          <Col>
            <Row className="max-sm:flex-col">
              <Col>
                <Label>Username</Label>
                <Input
                  name="username"
                  value={formValues.username}
                  onChange={handleChange}
                />
              </Col>

              <Col>
                <Label>Senha</Label>
                <Input
                  name="password"
                  type="password"
                  value={formValues.password}
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <PermissionGate permission="CQUFBR7HV8703RQJCVAX9SZ2YGA6HW">
          <Row className="my-4 max-sm:flex-col">
            <span className="text-xl font-semibold">
              Informações de usuário
            </span>
          </Row>
          <Row className="mt-2 max-sm:flex-col">
            <Col>
              <Row className="max-sm:flex-col">
                <Col>
                  <Label>Privilégios</Label>
                  <Select
                    name="selectedPrivilege"
                    value={selectedPrivilege}
                    onChange={handleSelectChange}
                  >
                    <option value="">Selecione uma opção</option>
                    {privileges?.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </Select>
                </Col>
              </Row>
            </Col>
          </Row>
        </PermissionGate>
        <Row className="justify-end py-10">
          <Button
            variant="outline-secondary"
            type="button"
            onClick={() => router("/users-view")}
          >
            Cancelar
          </Button>
          <Button type="submit" variant="success" disabled={loading}>
            {loading ? <Spinner /> : "Salvar"}
          </Button>
        </Row>
      </form>
    </Template>
  );
}
