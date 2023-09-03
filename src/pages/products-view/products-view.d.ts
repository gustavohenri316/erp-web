type IProductsViewResponse = {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  data: IProductsViewItemsResponse[];
};

type IProductsViewItemsResponse = {
  _id: string;
  image: string;
  description: string;
  code: string;
  ean: string;
  supplier: {
    corporateReason: string;
    _id: string;
  };
  manufacturer: string;
  quantity: string;
  replacementUnit: string;
  conversionFactor: string;
  infoPrice: {
    wholesalePrice: string;
    retailPrice: string;
    posPrice: string;
  };
  infoProduct: {
    weightUnit: string;
    netWeight: string;
    grossWeight: string;
    shelfLife: string;
    height: string;
    width: string;
    depth: string;
    volume: string;
    length: string;
  };
  infoLogistics: {
    layersPerPallet: string;
    rowsPerPallet: string;
    packagingQuantityPerPallet: string;
  };
};
