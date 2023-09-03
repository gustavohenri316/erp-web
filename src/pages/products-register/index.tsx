import { useRef, useState } from "react";
import {
  Button,
  Col,
  Input,
  Label,
  Row,
  Spinner,
  handleCloudinaryUpload,
} from "../../components";
import { Template } from "../components/Template";
import { ImageSquare } from "phosphor-react";
import { createProduct } from "./produtcs-register.service";

const data = {
  image: "",
  description: "",
  code: "",
  ean: "",
  supplier: "",
  manufacturer: "",
  quantity: 0,
  replacementUnit: "",
  conversionFactor: 0,
  infoPrice: {
    wholesalePrice: 0,
    retailPrice: 0,
    posPrice: 0,
  },
  infoProduct: {
    weightUnit: "",
    netWeight: 0,
    grossWeight: 0,
    shelfLife: 0,
    height: 0,
    width: 0,
    depth: 0,
    volume: 0,
    length: 0,
  },
  infoLogistics: {
    layersPerPallet: 0,
    rowsPerPallet: 0,
    packagingQuantityPerPallet: 0,
  },
};
export default function ProductsRegister() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [formState, setFormState] = useState<IFormStateRegisterProducts>(data);
  const [loadingUploadFile, setLoadingUploadFile] = useState(false);
  const handleInputChange = (field: string, value: any) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleInfoPriceChange = (field: string, value: any) => {
    setFormState((prevState) => ({
      ...prevState,
      infoPrice: {
        ...prevState.infoPrice,
        [field]: value,
      },
    }));
  };

  const handleInfoProductChange = (field: string, value: any) => {
    setFormState((prevState) => ({
      ...prevState,
      infoProduct: {
        ...prevState.infoProduct,
        [field]: value,
      },
    }));
  };

  const handleInfoLogisticsChange = (field: string, value: any) => {
    setFormState((prevState) => ({
      ...prevState,
      infoLogistics: {
        ...prevState.infoLogistics,
        [field]: value,
      },
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setLoadingUploadFile(true);
      void handleCloudinaryUpload(e, setImage);
      const file = e.target.files && e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPhotoPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingUploadFile(false);
    }
  };

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const updatedFormState = {
      ...formState,
      image: image,
    };
    await createProduct(updatedFormState);
  }
  return (
    <Template
      title="Registrar Produtos"
      documentTitle="Registrar Produtos"
      permissionPage="R7RQLDH82EJO1KOOQT7BJ5SMYM2R64"
    >
      <form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Row>
              <Col>
                <div className="flex items-center gap-1">
                  <Label>Descrição </Label>
                  <span className="text-red-500">*</span>
                </div>
                <Input
                  value={formState.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="flex items-center gap-1">
                  <Label>EAN </Label>
                  <span className="text-red-500">*</span>
                </div>
                <Input
                  value={formState.ean}
                  onChange={(e) => handleInputChange("ean", e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="flex items-center gap-1">
                  <Label>Código </Label>
                  <span className="text-red-500">*</span>
                </div>
                <Input
                  value={formState.code}
                  onChange={(e) => {
                    handleInputChange("code", e.target.value);
                    setPhotoPreview(e.target.value);
                  }}
                />
              </Col>
            </Row>
          </Col>

          <Col>
            <Row>
              <Col>
                <Label>URL</Label>
                <Input
                  value={image}
                  onChange={(e) => {
                    setImage(e.target.value);
                    setPhotoPreview(e.target.value);
                  }}
                />
              </Col>
            </Row>
            <Row className="justify-center max-sm:flex-col">
              <div className="border-dashed border-neutral-300 w-full h-[180px]  border rounded-md flex items-center justify-center">
                <label
                  htmlFor="photo"
                  className="w-full h-full cursor-pointer flex items-center justify-center"
                >
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-full h-full object-scale-down rounded-md"
                    />
                  ) : loadingUploadFile ? (
                    <Spinner />
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
                  accept="image/"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onInput={handleFileChange}
                />
              </div>
            </Row>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Label>Fabricante</Label>
            <Input
              value={formState.manufacturer}
              onChange={(e) =>
                handleInputChange("manufacturer", e.target.value)
              }
            />
          </Col>
          <Col>
            <div className="flex items-center gap-1">
              <Label>Fornecedor </Label>
              <span className="text-red-500">*</span>
            </div>
            <Input
              value={formState.supplier}
              onChange={(e) => handleInputChange("supplier", e.target.value)}
            />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <div className="flex items-center gap-1">
              <Label>Quantidade </Label>
              <span className="text-red-500">*</span>
            </div>
            <Input
              value={formState.quantity}
              onChange={(e) => handleInputChange("quantity", e.target.value)}
            />
          </Col>
          <Col>
            <div className="flex items-center gap-1">
              <Label>Fator de conversão </Label>
              <span className="text-red-500">*</span>
            </div>
            <Input
              value={formState.conversionFactor}
              onChange={(e) =>
                handleInputChange("conversionFactor", e.target.value)
              }
            />
          </Col>
          <Col>
            <Label>Unidade de recolocação</Label>
            <Input
              value={formState.replacementUnit}
              onChange={(e) =>
                handleInputChange("replacementUnit", e.target.value)
              }
            />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Label>Preço atacado</Label>
            <Input
              value={formState.infoPrice.wholesalePrice}
              onChange={(e) =>
                handleInfoPriceChange("wholesalePrice", e.target.value)
              }
            />
          </Col>
          <Col>
            <Label>Preço varejo</Label>
            <Input
              value={formState.infoPrice.retailPrice}
              onChange={(e) =>
                handleInfoPriceChange("retailPrice", e.target.value)
              }
            />
          </Col>
          <Col>
            <Label>Preço PDV</Label>
            <Input
              value={formState.infoPrice.posPrice}
              onChange={(e) =>
                handleInfoPriceChange("posPrice", e.target.value)
              }
            />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Label>Unidade de peso</Label>
            <Input
              value={formState.infoProduct.weightUnit}
              onChange={(e) =>
                handleInfoProductChange("weightUnit", e.target.value)
              }
            />
          </Col>
          <Col>
            <Label>Peso bruto</Label>
            <Input
              value={formState.infoProduct.netWeight}
              onChange={(e) =>
                handleInfoProductChange("netWeight", e.target.value)
              }
            />
          </Col>
          <Col>
            <Label>Peso líquido</Label>
            <Input
              value={formState.infoProduct.grossWeight}
              onChange={(e) =>
                handleInfoProductChange("grossWeight", e.target.value)
              }
            />
          </Col>
          <Col>
            <Label>Validade</Label>
            <Input
              value={formState.infoProduct.shelfLife}
              onChange={(e) =>
                handleInfoProductChange("shelfLife", e.target.value)
              }
            />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Label>Altura</Label>
            <Input
              value={formState.infoProduct.height}
              onChange={(e) =>
                handleInfoProductChange("height", e.target.value)
              }
            />
          </Col>
          <Col>
            <Label>Largura</Label>
            <Input
              value={formState.infoProduct.width}
              onChange={(e) => handleInfoProductChange("width", e.target.value)}
            />
          </Col>
          <Col>
            <Label>Comprimento</Label>
            <Input
              value={formState.infoProduct.length}
              onChange={(e) =>
                handleInfoProductChange("length", e.target.value)
              }
            />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Label>Camada por pallet:</Label>
            <Input
              value={formState.infoLogistics.layersPerPallet}
              onChange={(e) =>
                handleInfoLogisticsChange("layersPerPallet", e.target.value)
              }
            />
          </Col>
          <Col>
            <Label>Lastro por pallet:</Label>
            <Input
              value={formState.infoLogistics.rowsPerPallet}
              onChange={(e) =>
                handleInfoLogisticsChange("rowsPerPallet", e.target.value)
              }
            />
          </Col>
          <Col>
            <Label>Quantidade de embalagem por pallet:</Label>
            <Input
              value={formState.infoLogistics.packagingQuantityPerPallet}
              onChange={(e) =>
                handleInfoLogisticsChange(
                  "packagingQuantityPerPallet",
                  e.target.value
                )
              }
            />
          </Col>
        </Row>
        <Row className="justify-end py-8">
          <Button type="button" variant="outline-secondary">
            Cancelar
          </Button>
          <Button type="submit" variant="success" disabled={loadingUploadFile}>
            Confirmar
          </Button>
        </Row>
      </form>
    </Template>
  );
}
