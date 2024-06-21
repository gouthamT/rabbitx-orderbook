import { EnrichedStocks } from "../../services";
import { DataCell, OrderType } from "./data-cell/DataCell";
import "./Table.css";
import { formatAmount, formatPrice } from "../../helpers";

export interface TableProps {
  orderType: OrderType;
  data: EnrichedStocks;
}

export const TableBody = ({ orderType, data }: TableProps) => {
  const isAsk = orderType === "ask";
  const fillSkeleton = (count = 10) =>
    Array.from({ length: count }).map((_, idx) => (
      <tr key={idx} role="row">
        <DataCell type="price" orderType={orderType} text="..." />
        <DataCell type="amount" orderType={orderType} text="..." />
        <DataCell type="total" text="..." orderType={orderType} />
      </tr>
    ));
  return (
    <tbody data-testid={`table-${orderType}`}>
      {isAsk && data.length < 11 && fillSkeleton(11 - data.length)}
      {data.map((stockData, idx) => (
        <tr
          key={stockData.id}
          role="row"
          aria-rowindex={idx + 1}
          data-testid={`${orderType}-row`}
        >
          <DataCell
            type="price"
            orderType={orderType}
            text={formatPrice(stockData.price)}
            highlight={isAsk ? idx === data.length - 1 : idx === 0}
          />
          <DataCell
            type="amount"
            orderType={orderType}
            text={formatAmount(stockData.size)}
          />
          <DataCell
            type="total"
            text={formatAmount(stockData.total)}
            orderType={orderType}
            backgroundPercentage={stockData.percentageUpdated}
          />
        </tr>
      ))}
      {!isAsk && data.length < 11 && fillSkeleton(11 - data.length)}
    </tbody>
  );
};
