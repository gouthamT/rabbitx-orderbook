import { useRef, useMemo, useCallback, useState } from "react";
import {
  OrderbookData,
  Stocks,
  EnrichedStocks,
  OrderbookState,
} from "./Orderbook.types";

const mapsToEnrichedStocks = (
  stocks: Stocks,
  prevTotal: number = 0
): EnrichedStocks => {
  return stocks.reduce((acc, [price, size], idx) => {
    const sizeNumber = parseFloat(size);
    const total =
      idx === 0 ? prevTotal + sizeNumber : acc[idx - 1].total + sizeNumber;
    acc.push({
      id: Math.random(),
      price: parseFloat(price),
      size: sizeNumber,
      total,
    });
    return acc;
  }, [] as EnrichedStocks);
};

const computeStocks = (
  oldStocks: EnrichedStocks,
  newStocks: Stocks
): EnrichedStocks => {
  const filteredNewStocks = newStocks.filter(
    ([_, size]) => parseFloat(size) !== 0
  );

  if (oldStocks.length === 0) return mapsToEnrichedStocks(filteredNewStocks);

  if (filteredNewStocks.length === 0) return oldStocks;

  const lastOldStock = oldStocks[oldStocks.length - 1];
  const enrichedNewStocks = mapsToEnrichedStocks(
    filteredNewStocks,
    lastOldStock.total
  );
  return oldStocks.concat(enrichedNewStocks).slice(-11);
};

const isValidSequence = (
  oldOrderbook: OrderbookState | null,
  newOrderbook: OrderbookData
): boolean => {
  if (!oldOrderbook?.sequence) return true;
  return newOrderbook.sequence - oldOrderbook.sequence === 1;
};

export const mergeOrderbook = (
  oldEnrichedStocks: OrderbookState | null,
  newOrderbook: OrderbookData
): OrderbookState => {
  if (!isValidSequence(oldEnrichedStocks, newOrderbook)) {
    return {
      ...oldEnrichedStocks,
      hasValidSequence: false,
    } as OrderbookState;
  }

  return {
    hasValidSequence: true,
    sequence: newOrderbook.sequence,
    currency:
      oldEnrichedStocks?.currency || newOrderbook.market_id?.split("-")[0],
    crypto: oldEnrichedStocks?.crypto || newOrderbook.market_id?.split("-")[1],
    asks: computeStocks(oldEnrichedStocks?.asks ?? [], newOrderbook.asks ?? []),
    bids: computeStocks(oldEnrichedStocks?.bids ?? [], newOrderbook.bids ?? []),
  };
};

// since we are using the real-time subscription, we need to merge the new data
// some times there would be multiple requests with the same sequence number
// we need to ignore those requests
// memoize the result of the mergeOrderbook function
// so that we don't have to recompute the result if the input is the same
// even if the function is called multiple times or the computation is in progress
// if helps use sequence number to ignore the duplicate requests
// if the sequence number is not in order, we can throw an error
// and handle it in the UI
// we can also use the sequence number to determine if the data is stale
// and request the data again

export const useOrderbook = () => {
  const [orderbook, setOrderbook] = useState<OrderbookState | null>(null);
  const orderbookRef = useRef<OrderbookState | null>(null);

  const mergeOrderbookMemoized = useMemo(() => mergeOrderbook, []);

  const updateOrderbook = useCallback(
    (ctx: OrderbookData) => {
      orderbookRef.current = mergeOrderbookMemoized(orderbookRef.current, ctx);
      setOrderbook(orderbookRef.current);
    },
    [mergeOrderbookMemoized]
  );

  const resetOrderbook = useCallback(() => {
    orderbookRef.current = null;
    setOrderbook(null);
  }, []);

  return { orderbook, updateOrderbook, resetOrderbook };
};
