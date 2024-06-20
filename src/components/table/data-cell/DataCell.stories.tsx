import { DataCell, DataCellProps } from "./DataCell";

export default {
  title: "Components/Table/DataCell",
  component: DataCell,
  argTypes: {
    type: {
      control: {
        type: "select",
      },
      options: ["price", "amount", "total"],
      defaultValue: "price",
    },
    orderType: {
      control: {
        type: "select",
      },
      options: ["ask", "bid"],
      defaultValue: "ask",
    },
    isInitial: {
      control: {
        type: "boolean",
      },
    },
    backgroundPercentage: {
      control: {
        type: "range",
        min: 0,
        max: 100,
      },
    },
  },
};

export const InitialAskDataCell = () => (
  <DataCell text="0.00000001" highlight backgroundPercentage={50} />
);

export const AskPriceDataCell = () => (
  <DataCell text="0.00000001" orderType="ask" backgroundPercentage={50} />
);

export const BidPriceDataCell = () => (
  <DataCell text="0.00000001" orderType="bid" backgroundPercentage={100} />
);

export const AmountDataCell = () => (
  <DataCell text="0.00000001" type="amount" backgroundPercentage={50} />
);

export const TotalDataCell = () => (
  <DataCell text="0.00000001" type="total" backgroundPercentage={50} />
);

export const DefaultDataCell = (props: DataCellProps) => (
  <DataCell {...props} />
);

DefaultDataCell.args = {
  text: "0.00000001",
  type: "price",
  orderType: "ask",
  backgroundPercentage: 50,
};
