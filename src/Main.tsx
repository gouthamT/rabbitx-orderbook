import { useEffect, useState } from "react";
import {
  MarketInfo,
  Orderbook,
  useOrderbook,
  useSw,
} from "./services";
import { MarketPriceInfo, Table } from "./components";
import { useDocumentTitle } from "./helpers";
import { MARKET_KEY, CRYPTO_KEY, BRAND_NAME, CURRENCY_KEY } from "./constants";

export const Main = ({
  useOrderSwDI = useSw,
  useMarketSwDI = useSw,
}) => {
  const [marketInfo, setMarketInfo] = useState<MarketPriceInfo>();
  const { orderbook, updateOrderbook, resetOrderbook } = useOrderbook();
  const [orderSub] = useOrderSwDI(`orderbook:${MARKET_KEY}`, (ctx: Orderbook) => {
    updateOrderbook(ctx.data);
  });
  useMarketSwDI(`market:${MARKET_KEY}`, (ctx: MarketInfo) => {
    if (typeof ctx.data !== "object" || !ctx.data.market_price) return;
    setMarketInfo((prev) => ({
      marketPrice: ctx.data.market_price,
      lastMarketPrice: prev?.marketPrice || ctx.data.market_price,
    }));
  });
  useDocumentTitle(CRYPTO_KEY, BRAND_NAME, marketInfo?.marketPrice);
  const hasInValidSequence = orderbook?.hasValidSequence === false;

  useEffect(() => {
    if (hasInValidSequence) {
      console.log("Unsubscribe -> Invalid sequence number");
      orderSub?.unsubscribe();
      console.log("Reconnecting...");
      orderSub?.subscribe();
      resetOrderbook();
    }
  }, [hasInValidSequence, orderSub, resetOrderbook]);

  if (!orderbook) return <Table hasValidSequence={false} sequence={0} currency={CURRENCY_KEY} crypto={CRYPTO_KEY} bids={[]} asks={[]} />;

  return  <Table {...orderbook} marketInfo={marketInfo} />;
};
