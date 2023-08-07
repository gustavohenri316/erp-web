import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Col } from "../../../components/Col";
import { Label } from "../../../components/Label";
import { Row } from "../../../components/Row";
import { Template } from "../../components/Template";
import { findUser } from "../../users-view/users-view.service";

export default function UserViewDetails() {
  const { id } = useParams();
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
    team: "",
  });

  const [image, setImage] = useState("");

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
        team: data.team,
      });
      setSelectedPrivilege(data.privileges[0].name);
      setImage(data.photo || null);
    }
  }

  useEffect(() => {
    if (id) {
      fetchFindUser();
    }
  }, [id]);

  return (
    <Template
      documentTitle="Editar | Usuário"
      title="Editar Usuário"
      permissionPage="WVV09CLGCYPJH1DMV0W0Y66VHG3TCS"
    >
      <Row className="pb-4">
        <span className="text-2xl my-4 font-semibold">
          Informações pessoais
        </span>
      </Row>
      <Row className="my-4 max-sm:flex-col">
        <Col>
          <Row className="max-sm:flex-col">
            <Col className="mr-8">
              <Label>Nome</Label>
              <b className="text-neutral-500 text-xl">{formValues.firstName}</b>
            </Col>
            <Col>
              <Label>Sobrenome</Label>
              <b className="text-neutral-500 text-xl">{formValues.lastName}</b>
            </Col>
          </Row>
          <Row className="my-4 max-sm:flex-col">
            <Col className="mr-8">
              <Label>Email</Label>
              <b className="text-neutral-500 text-xl">{formValues.email}</b>
            </Col>
            <Col>
              <Label>Telefone</Label>
              <b className="text-neutral-500 text-xl">
                {formValues.phoneNumber}
              </b>
            </Col>
          </Row>

          <Row className="my-4 max-sm:flex-col">
            <Col className="mr-8">
              <Label>CPF</Label>
              <b className="text-neutral-500 text-xl">{formValues.cpf}</b>
            </Col>
            <Col>
              <Label>RG</Label>
              <b className="text-neutral-500 text-xl">{formValues.rg}</b>
            </Col>
            <Col>
              <Label>Data de nascimento</Label>
              <b className="text-neutral-500 text-xl">
                {formValues.birthDate || "-"}
              </b>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row className="justify-center my-4">
            <Label htmlFor="photo">Foto</Label>
            <div className="border-dashed w-[210px] h-[210px]  border rounded-full flex items-center justify-center">
              <label
                htmlFor="photo"
                className="w-full h-full cursor-pointer flex items-center justify-center"
              >
                <img
                  src={image}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-full"
                />
              </label>
            </div>
          </Row>
        </Col>
      </Row>
      <Row className="my-4 max-sm:flex-col">
        <span className="text-2xl my-4 font-semibold">
          Informações de endereço
        </span>
      </Row>
      <Row className="max-sm:flex-col">
        <Col className="mr-8">
          <Label>Rua</Label>
          <b className="text-neutral-500 text-xl">{formValues.street}</b>
        </Col>
        <Col>
          <Row className="max-sm:flex-col">
            <Col>
              <Label>Número</Label>
              <b className="text-neutral-500 text-xl">{formValues.number}</b>
            </Col>
            <Col>
              <Label>Complemento</Label>
              <b className="text-neutral-500 text-xl">
                {formValues.complement}
              </b>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="my-4 max-sm:flex-col">
        <Col className="mr-8">
          <Row className="max-sm:flex-col">
            <Col>
              <Label>Bairro</Label>
              <b className="text-neutral-500 text-xl">
                {formValues.neighborhood}
              </b>
            </Col>
            <Col>
              <Label>Cidade</Label>
              <b className="text-neutral-500 text-xl">{formValues.city}</b>
            </Col>
            <Col>
              <Label>Estado</Label>
              <b className="text-neutral-500 text-xl">{formValues.state}</b>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row className="max-sm:flex-col">
            <Col>
              <Label>País/região</Label>
              <b className="text-neutral-500 text-xl">
                {formValues.countryRegion}
              </b>
            </Col>
            <Col>
              <Label>CEP</Label>
              <b className="text-neutral-500 text-xl">{formValues.zipCode}</b>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="my-4 max-sm:flex-col">
        <span className="text-2xl my-4 font-semibold">
          Informações profissionais
        </span>
      </Row>
      <Row className="my-4 max-sm:flex-col">
        <Col className="mr-8">
          <Row className="max-sm:flex-col">
            <Col>
              <Label>Cargo</Label>
              <b className="text-neutral-500 text-xl">{formValues.position}</b>
            </Col>
            <Col>
              <Label>Formação</Label>
              <b className="text-neutral-500 text-xl">{formValues.education}</b>
            </Col>
            <Col>
              <Label>Data de início</Label>
              <b className="text-neutral-500 text-xl">{formValues.startDate}</b>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row className="max-sm:flex-col">
            <Col>
              <Label>Salário</Label>
              <b className="text-neutral-500 text-xl">{formValues.salary}</b>
            </Col>
            <Col>
              <Label>Tipo de contratação</Label>
              <b className="text-neutral-500 text-xl">
                {formValues.employmentType}
              </b>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="my-4 max-sm:flex-col">
        <span className="text-2xl my-4 font-semibold">
          Informações de acesso
        </span>
      </Row>
      <Row className="my-4 max-sm:flex-col">
        <Col>
          <Row className="max-sm:flex-col">
            <Col>
              <Label>Username</Label>
              <b className="text-neutral-500 text-xl">{formValues.username}</b>
            </Col>
            <Col>
              <Label>Email corporativo</Label>
              <b className="text-neutral-500 text-xl">
                {formValues.corporateEmail}
              </b>
            </Col>
            <Col> </Col>
          </Row>
        </Col>
      </Row>
      <Row className="my-4 max-sm:flex-col">
        <span className="text-2xl my-4 font-semibold">
          Informações de usuário
        </span>
      </Row>
      <Row className="my-4 max-sm:flex-col">
        <Col>
          <Row className="max-sm:flex-col">
            <Col>
              <Label>Equipe</Label>
              <b className="text-neutral-500 text-xl">{formValues.team}</b>
            </Col>
            <Col>
              <Label>Privilégios</Label>
              <b className="text-neutral-500 text-xl">{selectedPrivilege}</b>
            </Col>
          </Row>
        </Col>
      </Row>
    </Template>
  );
}
