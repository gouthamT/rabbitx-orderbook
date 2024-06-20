import { Table, TableProps } from "./Table";
import { mockTableData } from "./Table.mocks";

export default {
  title: "Components/Table",
  component: Table,
};

export const AskTable = (args: TableProps) => <Table {...args} />;
AskTable.args = {
  currency: "USD",
  crypto: "BTC",
  bids: [],
  asks: mockTableData,
  marketInfo: {
    marketPrice: "10000",
    lastMarketPrice: "9000",
  },
};

export const BidTable = (args: TableProps) => <Table {...args} />;
BidTable.args = {
  currency: "USD",
  crypto: "BTC",
  asks: [],
  bids: mockTableData.reverse(),
  marketInfo: {
    marketPrice: "10000",
    lastMarketPrice: "9000",
  },
};

export const OrderBook = (args: TableProps) => <Table {...args} />;
OrderBook.args = {
  currency: "USD",
  crypto: "BTC",
  asks: mockTableData,
  bids: mockTableData.slice().reverse(),
  marketInfo: {
    marketPrice: "10000",
    lastMarketPrice: "9000",
  },
};
