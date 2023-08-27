import { useState, FormEvent, useRef, useEffect } from "react";
import { Col } from "../../components/Col";
import { Input } from "../../components/Input";
import { Label } from "../../components/Label";
import { Row } from "../../components/Row";
import { Template } from "../components/Template";
import { applyCNPJMask } from "../../utils/cnpjMask";
import { Button } from "../../components/Button";
import { Check, ImageSquare, Plus } from "phosphor-react";
import { handleCloudinaryUpload } from "../../components/CloudinaryUpload";
import { useNavigate } from "react-router-dom";
import { Select } from "../../components/Select";
import { createCustomers } from "./customers-register.service";
import { toast } from "react-hot-toast";
import { getUsers } from "../users-view/users-view.service";
import { ButtonIcon } from "../../components/ButtonIcon";
import { Spinner } from "../../components/Spinner";

export default function CustomersRegister() {
  const router = useNavigate();
  const [document, setDocument] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [tradeName, setTradeName] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [representative, setRepresentative] = useState("");
  const [image, setImage] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [searchResponsible, setSearchResponsible] = useState("");
  const [responsibleProfile, setResponsibleProfile] = useState<User>();
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingCreated, setLoadingCreated] = useState(false);

  const [errors, setErrors] = useState<Errors>({
    companyName: false,
    tradeName: false,
    document: false,
    affiliation: false,
    representative: false,
  });

  async function fetchCreateCustomer(payload: ICreateCustomers) {
    try {
      setLoadingCreated(true);
      await createCustomers(payload);
      toast.success("Cliente cadastrado com sucesso!");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao cadastrar cliente!");
    } finally {
      setLoadingCreated(false);
      router(-1);
    }
  }

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !companyName ||
      !tradeName ||
      !document ||
      !affiliation ||
      !representative
    ) {
      toast.error("Campos obrigatórios não preenchidos");
      setErrors({
        companyName: !companyName,
        tradeName: !tradeName,
        document: !document,
        affiliation: !affiliation,
        representative: !representative,
      });
      return;
    }

    const payload: ICreateCustomers = {
      corporateReason: companyName,
      fantasyName: tradeName,
      responsible: representative,
      document,
      bond: affiliation,
      avatar_url: image,
    };

    fetchCreateCustomer(payload);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  async function fetchGetResponsible() {
    try {
      const response = await getUsers({
        currentPage: 1,
        pageSize: 999,
        search: searchResponsible,
      });
      setResponsibleProfile(response);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    if (searchResponsible) {
      fetchGetResponsible();
    }
  }, [searchResponsible]);

  const delay = (amount: number) =>
    new Promise((resolve) => setTimeout(resolve, amount));

  async function handleSelectedResponsible(id: string, name: string) {
    try {
      setLoading(true);
      await delay(100);
      setRepresentative(id);
      setSearchResponsible(name);
      setSelectedUser({ _id: id, name });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Template
      title="Cadastrar Cliente"
      documentTitle="Cadastrar Cliente"
      permissionPage="QCZZXPSK3JHROTQCKY48FQT7FEACGN"
    >
      <form onSubmit={handleFormSubmit}>
        <Row className="py-2">
          <Col>
            <Row className={`py-2 ${errors.companyName ? "has-error" : ""}`}>
              <Col>
                <Label>Razão Social</Label>
                <Input
                  value={companyName}
                  placeholder="Ex: Oliveiras Tecnologia LTDA"
                  onChange={(e) => setCompanyName(e.target.value)}
                />
                {errors.companyName && (
                  <span className="text-red-500">
                    Este campo é obrigatório.
                  </span>
                )}
              </Col>
            </Row>
            <Row className={`py-2 ${errors.tradeName ? "has-error" : ""}`}>
              <Col>
                <Label>Nome fantasia</Label>
                <Input
                  placeholder="Ex: Tecnologia Oliveira"
                  value={tradeName}
                  onChange={(e) => setTradeName(e.target.value)}
                />
                {errors.tradeName && (
                  <span className="text-red-500">
                    Este campo é obrigatório.
                  </span>
                )}
              </Col>
            </Row>
            <Row className={`py-2 ${errors.document ? "has-error" : ""}`}>
              <Col>
                <Label>CNPJ</Label>
                <Input
                  value={document}
                  placeholder="Ex: 00.000.000/0000-00"
                  maxLength={18}
                  onChange={(e) => setDocument(applyCNPJMask(e.target.value))}
                />
                {errors.document && (
                  <span className="text-red-500">
                    Este campo é obrigatório.
                  </span>
                )}
              </Col>
            </Row>
            <Row className={`py-2 ${errors.affiliation ? "has-error" : ""}`}>
              <Col>
                <Label>Vinculo</Label>
                <Select onChange={(e) => setAffiliation(e.target.value)}>
                  <option value="">Selecione</option>
                  <option value="Fornecedor">Fornecedor</option>
                  <option value="Comprador">Comprador</option>
                  <option value="Fornecedor/Comprador">
                    Fornecedor/Comprador
                  </option>
                </Select>

                {errors.affiliation && (
                  <span className="text-red-500">
                    Este campo é obrigatório.
                  </span>
                )}
              </Col>
            </Row>
            <Row className={`py-2 ${errors.representative ? "has-error" : ""}`}>
              <Col>
                <Label>Representante</Label>
                <Input
                  value={searchResponsible}
                  onChange={(e) => setSearchResponsible(e.target.value)}
                />
                {errors.representative && (
                  <span className="text-red-500">
                    Este campo é obrigatório.
                  </span>
                )}
              </Col>
            </Row>
            <Row>
              <div className="flex-col max-h-[200px] overflow-auto flex gap-2 w-full">
                {responsibleProfile &&
                  responsibleProfile.users.map((user) => {
                    const isSelected = selectedUser?._id === user._id;
                    return (
                      <div
                        className={`border rounded-md w-full p-2 px-4 flex items-center gap-2 justify-between ${
                          isSelected ? "bg-blue-100" : ""
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={user.photo}
                            alt=""
                            className="w-14 h-14 rounded-full"
                          />
                          <div className="flex flex-col">
                            <span>
                              {user.firstName} {user.lastName}
                            </span>
                            <span className="text-sm">{user.email}</span>
                          </div>
                        </div>
                        <div>
                          <ButtonIcon
                            size="sm"
                            variant={isSelected ? "success" : "primary"}
                            title="Selecionar"
                            onClick={() => {
                              const name = `${user.firstName} ${user.lastName}`;
                              handleSelectedResponsible(user._id, name);
                            }}
                          >
                            {loading && isSelected ? (
                              <Spinner size={14} />
                            ) : isSelected ? (
                              <Check />
                            ) : (
                              <Plus />
                            )}
                          </ButtonIcon>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </Row>
          </Col>
          <Col>
            <Row className="justify-center max-sm:flex-col flex-1">
              <Label htmlFor="photo">Foto</Label>
              <div className="border-dashed border-neutral-600 flex-1 max-w-[450px] border rounded-full flex items-center justify-center">
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
                      className="text-neutral-600 hover:text-neutral-400"
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
        <Row className="justify-end mt-16">
          <Button variant="outline-secondary" onClick={() => router(-1)}>
            Cancelar
          </Button>
          <Button variant="success" type="submit" disabled={loadingCreated}>
            {loadingCreated ? <Spinner /> : "Cadastrar"}
          </Button>
        </Row>
      </form>
    </Template>
  );
}
