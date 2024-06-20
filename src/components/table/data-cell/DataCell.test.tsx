import { render, screen } from "@testing-library/react";
import { DataCell } from "./DataCell";

const renderWithTable = (props: any) => {
  render(
    <table>
      <tbody>
        <tr>
          <DataCell {...props} />
        </tr>
      </tbody>
    </table>
  );
};

describe("DataCell", () => {
  it("renders the text", () => {
    renderWithTable({ text: "test" });
    expect(screen.getByText("test")).toBeInTheDocument();
  });

  it("renders the background", () => {
    renderWithTable({
      text: "test",
      type: "price",
      orderType: "ask",
      backgroundPercentage: 50,
    });
    const cell = screen.getByTestId("data-cell");
    expect(cell).toHaveStyle(
      "background: linear-gradient(to right, #321E2D 50%, transparent 50%)"
    );
  });

  it("renders the background for bid", () => {
    renderWithTable({
      text: "test",
      type: "price",
      orderType: "bid",
      backgroundPercentage: 50,
    });
    const cell = screen.getByTestId("data-cell");
    expect(cell).toHaveStyle(
      "background: linear-gradient(to right, #122A2F 50%, transparent 50%)"
    );
  });

  it("renders the background for amount", () => {
    renderWithTable({ text: "test", type: "amount", backgroundPercentage: 50 });
    const cell = screen.getByTestId("data-cell");
    expect(cell).toHaveStyle("background: undefined");
  });

  it("renders the background for total", () => {
    renderWithTable({ text: "test", type: "total", backgroundPercentage: 50 });
    const cell = screen.getByTestId("data-cell");
    expect(cell).toHaveStyle("background: undefined");
  });

  it("renders the ask class", () => {
    renderWithTable({ text: "test", orderType: "ask" });
    const cell = screen.getByTestId("data-cell");
    expect(cell).toHaveClass("data-cell--ask");
  });

  it("renders the bid class", () => {
    renderWithTable({ text: "test", orderType: "bid" });
    const cell = screen.getByTestId("data-cell");
    expect(cell).toHaveClass("data-cell--bid");
  });

  it("renders the amount class", () => {
    renderWithTable({ text: "test", type: "amount" });
    const cell = screen.getByTestId("data-cell");
    expect(cell).toHaveClass("data-cell--amount");
  });

  it("renders the total class", () => {
    renderWithTable({ text: "test", type: "total" });
    const cell = screen.getByTestId("data-cell");
    expect(cell).toHaveClass("data-cell--total");
  });

  it("renders the highlight class", () => {
    renderWithTable({ text: "test", highlight: true });
    const cell = screen.getByTestId("data-cell");
    expect(cell).toHaveClass("data-cell--highlight");
  });
});
