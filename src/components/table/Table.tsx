import classNames from "classnames";
import { Pill } from "../pill/Pill";
import { TableBody } from "./TableBody";
import { UpIcon, DownIcon } from "../svg";
import { OrderbookState } from "../../services";
import { formatPrice } from "../../helpers";
import "./Table.css";

export interface MarketPriceInfo {
  marketPrice: string;
  lastMarketPrice: string;
}

export interface TableProps extends OrderbookState {
  marketInfo?: MarketPriceInfo;
}

export const Table = ({
  currency,
  crypto,
  asks,
  bids,
  marketInfo,
}: TableProps) => {
  const isMarketPriceUp = marketInfo
    ? marketInfo.marketPrice > marketInfo.lastMarketPrice
    : false;
  return (
    <section className="table-container">
      <h2 className="table-title">Orderbook</h2>
      <table
        className="table"
        role="table"
        aria-label="Orderbook table"
        aria-rowcount={asks.length + bids.length}
        data-testid="table"
      >
        <thead>
          <tr role="row">
            <th className="table-price-header" role="columnheader">
              Price
              <Pill label={crypto} />
            </th>
            <th role="columnheader">
              Amount
              <Pill label={currency} />
            </th>
            <th role="columnheader">
              Total
              <Pill label={currency} />
            </th>
          </tr>
        </thead>
        <TableBody orderType="ask" data={asks.slice().reverse()} />

        <tbody>
          <tr className="last-trade-row">
            <td
              role="cell"
              className={classNames("last-trade-price", {
                "last-trade-price--up": isMarketPriceUp,
              })}
              colSpan={3}
              aria-label="Last trade price"
              data-testid="last-trade-price"
            >
              {marketInfo ? (
                <>
                  <span>{isMarketPriceUp ? <UpIcon /> : <DownIcon />}</span>
                  {formatPrice(marketInfo.marketPrice)}
                </>
              ) : (
                <span data-testid="loading" className="loading">
                  Loading...
                </span>
              )}
            </td>
            <td></td>
            <td></td>
          </tr>
        </tbody>

        <TableBody orderType="bid" data={bids} />
      </table>
    </section>
  );
};
