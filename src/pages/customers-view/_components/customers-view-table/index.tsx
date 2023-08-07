import { Table } from "../../../../components/Table";

interface CustomersViewTableProps {}

export function CustomersViewTable({}: CustomersViewTableProps) {
  return (
    <Table.Root>
      <Table.Thead>
        <Table.Tr isHeader>
          <Table.Th>Imagem</Table.Th>
          <Table.Th>Vinculo</Table.Th>
          <Table.Th>Razão Social</Table.Th>
          <Table.Th>Nome Fantasia</Table.Th>
          <Table.Th>CNPJ</Table.Th>
          <Table.Th>Representante</Table.Th>
          <Table.Th textAlign="text-end">Ações</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <Table.Tr>
          <Table.Td>1</Table.Td>
          <Table.Td>oi</Table.Td>
          <Table.Td>oi</Table.Td>
          <Table.Td>oi</Table.Td>
          <Table.Td>oi</Table.Td>
          <Table.Td>oi</Table.Td>
          <Table.Td>oi</Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table.Root>
  );
}
