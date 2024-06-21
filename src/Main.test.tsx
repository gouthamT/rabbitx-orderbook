import { render, screen, waitFor } from "@testing-library/react";
import { Main } from "./Main";
import { useSw } from "./services";
import { Subscription } from "centrifuge";

describe("Main", () => {
  it("should render the Main component", () => {
    const useOrderSwDI: typeof useSw = () =>
      [] as unknown as [Subscription | null];
    const useMarketSwDI: typeof useSw = () =>
      [] as unknown as [Subscription | null];

    render(<Main useOrderSwDI={useOrderSwDI} useMarketSwDI={useMarketSwDI} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render the Main component with the Table component", async () => {
    let hasFnBeenCalled = [false, false];
    const useOrderSwDI: typeof useSw = (_: string, fn: any) => {
      if (!hasFnBeenCalled[0]) {
        fn({
          data: {
            timestamp: 1718940929179338,
            sequence: 959226258,
            market_id: "BTC-USD",
            asks: new Array(11).fill(0).map((_, i) => [
              (i + 1) * 2000,
              (i + 1) * 0.01,
            ]),
            bids: new Array(11).fill(0).map((_, i) => [
              (i + 1) * 1000,
              (i + 1) * 0.01,
            ]),
          },
        } as unknown as Subscription);
        hasFnBeenCalled[0] = true;
      }
      return [] as unknown as [Subscription | null];
    };
    const useMarketSwDI: typeof useSw = (_: string, fn: any) => {
      if (!hasFnBeenCalled[1]) {
        fn({
          data: { market_price: 100 },
        } as unknown as Subscription);
        hasFnBeenCalled[1] = true;
      }
      return [] as unknown as [Subscription | null];
    };

    render(<Main useOrderSwDI={useOrderSwDI} useMarketSwDI={useMarketSwDI} />);

    await waitFor(() => {
      expect(screen.getByTestId("last-trade-price")).toHaveTextContent("100");
      const bidCells = screen.queryAllByTestId("data-cell");
      expect(bidCells).toHaveLength(66);
      expect(bidCells[0]).toHaveClass("data-cell data-cell--ask");
      expect(bidCells[0]).toHaveTextContent("22,000");
      expect(bidCells[1]).toHaveClass("data-cell data-cell--amount");
      expect(bidCells[1]).toHaveTextContent("0.11");
      expect(bidCells[2]).toHaveClass("data-cell data-cell--total");
      expect(bidCells[2]).toHaveTextContent("0.66");
      expect(bidCells[63]).toHaveClass("data-cell data-cell--bid");
      expect(bidCells[63]).toHaveTextContent("11,000");
      expect(bidCells[64]).toHaveClass("data-cell data-cell--amount");
      expect(bidCells[64]).toHaveTextContent("0.11");
      expect(bidCells[65]).toHaveClass("data-cell data-cell--total");
      expect(bidCells[65]).toHaveTextContent("0.66");
    });
  });
});
