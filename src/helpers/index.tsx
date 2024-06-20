import { useEffect } from "react";

export const formatPrice = (price?: string | number) => {
  if (!price) return "";
  const _price = parseFloat(price.toString());
  return _price.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export const formatAmount = (amount: number) => {
  return amount.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 4,
  });
};

export const useDocumentTitle = (
  crypto: string,
  brand: string,
  price?: string
) => {
  useEffect(() => {
    document.title = [formatPrice(price), crypto, brand]
      .filter(Boolean)
      .join(" | ");
  }, [price, crypto, brand]);
};
