import classnames from "classnames";
import "./DataCell.css";

export type OrderType = "ask" | "bid";
type DataCellType = "price" | "amount" | "total";

export interface DataCellProps {
  text: string;
  orderType?: OrderType;
  type?: DataCellType;
  highlight?: boolean;
  backgroundPercentage?: number;
}

const getBackgroundStyle = (
  orderType: OrderType,
  backgroundPercentage: number
): string | undefined => {
  if (!backgroundPercentage || !["ask", "bid"].includes(orderType)) {
    return undefined;
  }
  const backgroundFillColor = orderType === "ask" ? "#321E2D" : "#122A2F";
  return `linear-gradient(to right, ${backgroundFillColor} ${backgroundPercentage}%, transparent ${backgroundPercentage}%)`;
};

export const DataCell: React.FC<DataCellProps> = ({
  type = "price",
  orderType = "ask",
  text,
  highlight = false,
  backgroundPercentage = 0,
}) => {
  const background = getBackgroundStyle(
    orderType,
    highlight ? 100 : backgroundPercentage
  );
  return (
    <td
      role="cell"
      className={classnames("data-cell", {
        "data-cell--ask": type === "price" && orderType === "ask",
        "data-cell--bid": type === "price" && orderType === "bid",
        "data-cell--amount": type === "amount",
        "data-cell--total": type === "total",
        "data-cell--highlight": highlight,
      })}
      data-testid="data-cell"
      style={{
        background,
      }}
    >
      {text}
    </td>
  );
};
