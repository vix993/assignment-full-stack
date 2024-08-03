import { CSSProperties } from "react";

export type SearchInputProps = {
  placeholder: string;
  style: CSSProperties;
  onChange: (newBuyerId: string | undefined) => void;
};

export type BuyerSelectFilterProps = {
  onChange: (newBuyerId: string | undefined) => void;
};
