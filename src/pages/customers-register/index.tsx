import { useState, FormEvent, useRef } from "react";
import { Col } from "../../components/Col";
import { Input } from "../../components/Input";
import { Label } from "../../components/Label";
import { Row } from "../../components/Row";
import { Template } from "../components/Template";
import { applyCNPJMask } from "../../utils/cnpjMask";
import { Button } from "../../components/Button";
import { ImageSquare } from "phosphor-react";
import { handleCloudinaryUpload } from "../../components/CloudinaryUpload";
import { useNavigate } from "react-router-dom";
import { Select } from "../../components/Select";

export default function CustomersRegister() {
  const router = useNavigate();
  const [document, setDocument] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [tradeName, setTradeName] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [representative, setRepresentative] = useState("");
  const [image, setImage] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  console.log(image);

  const [errors, setErrors] = useState<Errors>({
    companyName: false,
    tradeName: false,
    document: false,
    affiliation: false,
    representative: false,
  });

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !companyName ||
      !tradeName ||
      !document ||
      !affiliation ||
      !representative
    ) {
      setErrors({
        companyName: !companyName,
        tradeName: !tradeName,
        document: !document,
        affiliation: !affiliation,
        representative: !representative,
      });
      return;
    }
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
                  value={representative}
                  onChange={(e) => setRepresentative(e.target.value)}
                />
                {errors.representative && (
                  <span className="text-red-500">
                    Este campo é obrigatório.
                  </span>
                )}
              </Col>
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
          <Button variant="success" type="submit">
            Cadastrar
          </Button>
        </Row>
      </form>
    </Template>
  );
}
