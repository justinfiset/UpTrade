import { Title, Table } from "@mantine/core";

const data = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 145.86,
    quantity: 10,
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 2767.39,
    quantity: 5,
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 289.67,
    quantity: 8,
  }
];

export default function Portfolio() {
  const rows = data.map((stock) => (
    <Table.Tr>
      <Table.Td>{stock.name}</Table.Td>
      <Table.Td>{stock.symbol}</Table.Td>
      <Table.Td>{stock.price}</Table.Td>
      <Table.Td>{stock.quantity}</Table.Td>
      <Table.Td>{(stock.price * stock.quantity).toFixed(2)}</Table.Td>
    </Table.Tr>
  ));
  
  return (
    <>
      <Title>Your stock portfolio</Title>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Symbol</Table.Th>
            <Table.Th>Price</Table.Th>
            <Table.Th>Quantity</Table.Th>
            <Table.Th>Total market value</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
}
