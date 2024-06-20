import { render, fireEvent } from "@testing-library/react";
import { Pill } from "./Pill";

describe("Pill", () => {
  it("renders the label correctly", () => {
    const label = "Test Label";
    const { getByText } = render(<Pill label={label} />);
    const labelElement = getByText(label);
    expect(labelElement).toBeInTheDocument();
  });

  it("applies the color prop correctly", () => {
    const color = "red";
    const { container } = render(<Pill label="Test Label" color={color} />);
    const pillElement = container.firstChild as HTMLElement;
    expect(pillElement.style.color).toBe(color);
  });

  it("calls the onClick prop when clicked", () => {
    const onClick = jest.fn();
    const { container } = render(<Pill label="Test Label" onClick={onClick} />);
    const pillElement = container.firstChild as HTMLElement;
    fireEvent.click(pillElement);
    expect(onClick).toHaveBeenCalled();
  });
});
