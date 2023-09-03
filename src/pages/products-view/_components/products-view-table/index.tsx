import { Table } from "../../../../components/Table";

interface IProductsViewTable {
  products: IProductsViewResponse[] | null;
}

export function ProductsViewTable({ products }: IProductsViewTable) {
  return (
    <Table.Root>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Imagem</Table.Th>
          <Table.Th>Código</Table.Th>
          <Table.Th>Descrição/EAN/Fabricante</Table.Th>
          <Table.Th>Fornecedor</Table.Th>
          <Table.Th>QTD.</Table.Th>
          <Table.Th>Un. Recolocação</Table.Th>
          <Table.Th>Fator de conversão</Table.Th>
          <Table.Th>Preço Fornecedor</Table.Th>
          <Table.Th>PVD</Table.Th>
          <Table.Th>Ações</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {products &&
          products.map((product) => {
            return (
              <Table.Tr key={product._id}>
                <Table.Td>{product.image}</Table.Td>
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
              </Table.Tr>
            );
          })}
      </Table.Tbody>
    </Table.Root>
  );
}
