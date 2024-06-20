export interface MarketInfoData {
  average_daily_volume: string;
  average_daily_volume_change_basis: string;
  average_daily_volume_change_premium: string;
  average_daily_volume_q: string;
  best_ask: string;
  best_bid: string;
  fair_price: string;
  forced_margin: string;
  id: string;
  index_price: string;
  instant_daily_volume: string;
  instant_funding_rate: string;
  last_funding_rate_basis: string;
  last_funding_update_time: number;
  last_trade_price: string;
  last_trade_price_24h_change_basis: string;
  last_trade_price_24h_change_premium: string;
  last_trade_price_24high: string;
  last_trade_price_24low: string;
  last_update_sequence: number;
  last_update_time: number;
  liquidation_margin: string;
  market_price: string;
  min_initial_margin: string;
  min_order: string;
  min_tick: string;
  status: string;
}

export interface MarketInfo {
  data: MarketInfoData;
}