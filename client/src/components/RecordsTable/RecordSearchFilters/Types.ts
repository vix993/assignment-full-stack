export type SearchFilters = {
  query: string;
  buyerId?: string;
};

export type RecordSearchFiltersProps = {
  filters: SearchFilters;
  onChange: (newFilters: SearchFilters) => void;
};
