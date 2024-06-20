import { formatPrice, formatAmount, useDocumentTitle } from "./";
import { renderHook } from "@testing-library/react";

describe("formatPrice", () => {
  it("should format price correctly", () => {
    expect(formatPrice(1234.567)).toBe("1,235");
    expect(formatPrice(0.1234)).toBe("0");
    expect(formatPrice("1234.567")).toBe("1,235");
    expect(formatPrice("0.1234")).toBe("0");
    expect(formatPrice("")).toBe("");
    expect(formatPrice(undefined)).toBe("");
  });

  it("should format amount correctly", () => {
    expect(formatAmount(1234.567)).toBe("1,234.567");
    expect(formatAmount(0.1234)).toBe("0.1234");
  });
});

describe("useDocumentTitle", () => {
  it("should set document title correctly", () => {
    renderHook(() => useDocumentTitle("BTC", "RabbitX", "1234.567"));

    expect(document.title).toBe("1,235 | BTC | RabbitX");
  });
});
