import { mergeOrderbook, isValidSequence } from "./Orderbook";
import { OrderbookData, OrderbookState } from "./Orderbook.types";

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;

describe("mergeOrderbook", () => {
  it("should merge the new orderbook data with the old enriched stocks", () => {
    const oldEnrichedStocks = {
      hasValidSequence: true,
      sequence: 100,
      currency: "USD",
      crypto: "BTC",
      bids: [
        {
          id: 1,
          price: 100,
          size: 10,
          total: 1000,
          percentageUpdated: 0,
        },
      ],
      asks: [
        {
          id: 2,
          price: 110,
          size: 5,
          total: 550,
          percentageUpdated: 0,
        },
      ],
    };

    const newOrderbook = {
      timestamp: 1000,
      sequence: 101,
      market_id: "USD-BTC",
      bids: [["105", "15"]],
      asks: [["115", "8"]],
    } as OrderbookData;

    const expectedMergedOrderbook = {
      hasValidSequence: true,
      sequence: 101,
      currency: "USD",
      crypto: "BTC",
      asks: [
        {
          id: 0.5,
          price: 110,
          size: 5,
          total: 5,
          percentageUpdated: 38,
        },
        {
          id: 0.5,
          price: 115,
          size: 8,
          total: 13,
          percentageUpdated: 100,
        },
      ],
      bids: [
        {
          id: 0.5,
          price: 100,
          size: 10,
          total: 10,
          percentageUpdated: 40,
        },
        {
          id: 0.5,
          price: 105,
          size: 15,
          total: 25,
          percentageUpdated: 100,
        },
      ],
    };

    const mergedOrderbook = mergeOrderbook(oldEnrichedStocks, newOrderbook);
    expect(mergedOrderbook).toEqual(expectedMergedOrderbook);
  });
});

describe("isValidSequence", () => {
  it("should return true if the sequence number is in order", () => {
    const oldOrderbook = {
      sequence: 100,
      currency: "USD",
      crypto: "BTC",
      bids: [],
      asks: [],
    };

    const newOrderbook = {
      sequence: 101,
    } as OrderbookData;

    const isValid = isValidSequence(oldOrderbook, newOrderbook);

    expect(isValid).toBe(true);
  });

  it("should return false if the sequence number is not in order", () => {
    const oldOrderbook = {
      sequence: 100,
    } as OrderbookState;

    const newOrderbook = {
      sequence: 99,
    } as OrderbookData;

    const isValid = isValidSequence(oldOrderbook, newOrderbook);

    expect(isValid).toBe(false);
  });
});
