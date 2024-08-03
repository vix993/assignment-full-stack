export type RecordSearchRequest = {
  textSearch?: string;
  buyerId?: string;
  offset: number;
  limit: number;
};

export type BuyerSearchQuery = {
  q?: string;
  offset: number;
  limit: number;
};

export type BuyerDto = {
  id: string;
  name: string;
};

export type ProcurementRecordDto = {
  id: string;
  title: string;
  description: string;
  buyer: BuyerDto;
  publishDate: string;
  value: any;
  stage: string;
  currency: string | null;
  closeDate: string | null;
  awardDate: string | null;
};

export type RecordSearchResponse = {
  records: ProcurementRecordDto[];
  endOfResults: boolean; // this is true when there are no more results to search
};

export type BuyerSearchResponse = {
  buyers: BuyerDto[];
  endOfResults: boolean; // this is true when there are no more results to search
};
