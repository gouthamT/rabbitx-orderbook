import { PublicationContext } from "centrifuge";

export type Stock = [price: string, size: string];

export type Stocks = Stock[];

export interface OrderbookData {
  timestamp: number;
  sequence: number;
  market_id: string;
  asks: Stocks;
  bids: Stocks;
}

export interface Orderbook extends PublicationContext {
  data: OrderbookData;
}

export interface EnrichedStock {
  id: number;
  price: number;
  size: number;
  total: number;
  percentageUpdated: number;
}

export type EnrichedStocks = EnrichedStock[];

export interface OrderbookState {
  hasValidSequence?: boolean;
  sequence: number;
  currency: string;
  crypto: string;
  bids: EnrichedStocks;
  asks: EnrichedStocks;
}
