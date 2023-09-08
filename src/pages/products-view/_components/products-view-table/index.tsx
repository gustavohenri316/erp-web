import { toast } from "react-hot-toast";

import { Table } from "../../../../components/Table";
import { deleteProducts } from "../../products-view.service";
import { ProductsViewModalDelete } from "../products-view-modal-delete";
import { useState } from "react";

interface IProductsViewTable {
  products: IProductsViewResponse | null;
  handleUpdate: (value: boolean) => void;
}

export function ProductsViewTable({
  products,
  handleUpdate,
}: IProductsViewTable) {
  const [loading, setLoading] = useState(false);
  async function fetchDeleteProduct(id: string) {
    try {
      setLoading(true);
      handleUpdate(true);
      await deleteProducts(id);
      toast.success("Product deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      handleUpdate(false);
    }
  }

  return (
    <Table.Root>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Imagem</Table.Th>
          <Table.Th>Código</Table.Th>
          <Table.Th>Descrição/EAN/Fabricante</Table.Th>
          <Table.Th>Fornecedor</Table.Th>
          <Table.Th>QTD.</Table.Th>
          <Table.Th>Tipo de embalagem</Table.Th>
          <Table.Th>Fator de conversão</Table.Th>
          <Table.Th>Preço Fornecedor</Table.Th>
          <Table.Th>PVD</Table.Th>
          <Table.Th>Ações</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {products &&
          products?.data.map((product: IProductsViewItemsResponse) => {
            return (
              <Table.Tr key={product._id}>
                <Table.Td>
                  <img
                    src={product.image}
                    className="w-14 h-14 rounded-full"
                    alt=""
                  />
                </Table.Td>
                <Table.Td>{product.code}</Table.Td>
                <Table.Td>
                  <div className="flex flex-col">
                    <span>{product.description}</span>
                    <span className="text-sm italic underline">
                      {product.ean}
                    </span>
                    <span className="text-sm text-neutral-500">
                      {product.manufacturer}
                    </span>
                  </div>
                </Table.Td>
                <Table.Td>{product.supplier.corporateReason}</Table.Td>
                <Table.Td>{product.quantity}</Table.Td>
                <Table.Td>{product.replacementUnit}</Table.Td>
                <Table.Td>{product.conversionFactor}</Table.Td>
                <Table.Td>{product.infoPrice.retailPrice}</Table.Td>
                <Table.Td>{product.infoPrice.posPrice}</Table.Td>
                <Table.Td>
                  <div>
                    <ProductsViewModalDelete
                      handleDelete={() => fetchDeleteProduct(product._id)}
                      loading={loading}
                      name={product.ean}
                    />
                  </div>
                </Table.Td>
              </Table.Tr>
            );
          })}
      </Table.Tbody>
    </Table.Root>
  );
}
