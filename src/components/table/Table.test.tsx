import { render, screen } from "@testing-library/react";
import { Table, TableProps } from "./Table";
import { formatAmount, formatPrice } from "../../helpers";

const mockTableProps: TableProps = {
  hasValidSequence: true,
  sequence: 1,
  currency: "USD",
  crypto: "BTC",
  marketInfo: {
    marketPrice: "10000",
    lastMarketPrice: "9500",
  },
  asks: [
    {
      id: 1,
      price: 82.5066612179699,
      size: 0.4818883146800468,
      total: 0.4818883146800469,
      // percentageUpdated: 100,
    },
    {
      id: 2,
      price: 13.622529848200116,
      size: 1.5825948738769147,
      total: 2.0644831885569612,
      // percentageUpdated: 95,
    },
  ],
  bids: [
    {
      id: 3,
      price: 22.072738682660287,
      size: 3.119991972113506,
      total: 5.184475160670467,
      // percentageUpdated: 90,
    },
    {
      id: 4,
      price: 57.34309136832776,
      size: 2.7375740816063776,
      total: 7.922049242276845,
      // percentageUpdated: 85,
    },
    {
      id: 5,
      price: 3.5843543653385934,
      size: 4.76567621085524,
      total: 12.687725453132085,
      // percentageUpdated: 80,
    },
  ],
};

describe("Table", () => {
  it("renders the table header correctly", () => {
    render(<Table {...mockTableProps} />);
    const table = screen.getByTestId("table");
    expect(table).toHaveAttribute("aria-label", "Orderbook table");
    const priceHeader = screen.getByText("Price");
    const amountHeader = screen.getByText("Amount");
    const totalHeader = screen.getByText("Total");
    expect(priceHeader).toBeInTheDocument();
    expect(amountHeader).toBeInTheDocument();
    expect(totalHeader).toBeInTheDocument();
  });

  it("renders the correct number of ask and bid rows", () => {
    render(<Table {...mockTableProps} />);
    const askRows = screen.getAllByTestId("ask-row");
    const bidRows = screen.getAllByTestId("bid-row");
    expect(askRows.length).toBe(mockTableProps.asks.length);
    expect(bidRows.length).toBe(mockTableProps.bids.length);
  });

  it("renders the correct data in ask rows", () => {
    render(<Table {...mockTableProps} />);
    mockTableProps.asks.forEach((ask) => {
      const priceElement = screen.getByText(formatPrice(ask.price));
      expect(priceElement).toBeInTheDocument();
    });
  });

  it("renders the correct data in bid rows", () => {
    render(<Table {...mockTableProps} />);
    const bidRows = screen.getAllByTestId("bid-row");
    bidRows.forEach((row, index) => {
      const priceElement = screen.getByText(formatPrice(mockTableProps.bids[index].price));
      const sizeElement = screen.getByText(formatAmount(mockTableProps.bids[index].size));
      const totalElement = screen.getByText(formatAmount(mockTableProps.bids[index].total));
      expect(priceElement).toBeInTheDocument();
      expect(sizeElement).toBeInTheDocument();
      expect(totalElement).toBeInTheDocument();
    });
  });

  it("renders the last trade price correctly", () => {
    render(<Table {...mockTableProps} />);
    const marketPrice = screen.getByTestId("last-trade-price");
    expect(marketPrice).toBeInTheDocument();
    expect(marketPrice).toHaveTextContent("10,000");
  });
});
