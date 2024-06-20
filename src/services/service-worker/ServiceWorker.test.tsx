import { renderHook, act, waitFor, render } from "@testing-library/react";
import { Centrifuge, PublicationContext } from "centrifuge";
import { SwProvider, useSw } from "./ServiceWorker";

jest.mock("centrifuge");

describe("useSw", () => {
  it("should initialize Centrifuge on first render", async () => {
    const callback = jest.fn();

    const TestComponent = () => {
      useSw<PublicationContext>("type", callback);
      return null;
    };

    render(
      <SwProvider>
        <TestComponent />
      </SwProvider>
    );

    await waitFor(() => {
      expect(callback).toHaveBeenCalled();
    });
  });
});
