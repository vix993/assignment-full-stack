export type BuyerOption = {
  value: string;
  text: string;
};

export type BuyersResponse = {
  buyers: { id: string; name: string }[];
  endOfResults: boolean;
};
