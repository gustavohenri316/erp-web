interface IFormStateRegisterProducts {
  image: string;
  description: string;
  code: string;
  ean: string;
  supplier: string;
  manufacturer: string;
  quantity: number;
  replacementUnit: string;
  conversionFactor: number;
  infoPrice: {
    wholesalePrice: number;
    retailPrice: number;
    posPrice: number;
  };
  infoProduct: {
    weightUnit: string;
    netWeight: number;
    grossWeight: number;
    shelfLife: number;
    height: number;
    width: number;
    depth: number;
    volume: number;
    length: number;
  };
  infoLogistics: {
    layersPerPallet: number;
    rowsPerPallet: number;
    packagingQuantityPerPallet: number;
  };
}
