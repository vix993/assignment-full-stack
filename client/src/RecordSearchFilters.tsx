import { Input } from "antd";
import { FormEvent, useCallback } from "react";
import BuyerSelectFilter from "./BuyerSelectFilter";

export type SearchFilters = {
  query: string;
  buyerId?: string;
};

type Props = {
  filters: SearchFilters;
  onChange: (newFilters: SearchFilters) => void;
};

function RecordSearchFilters(props: Props) {
  const { filters, onChange } = props;

  const handleQueryChange = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      onChange({
        ...filters,
        query: e.currentTarget.value,
      });
    },
    [onChange, filters]
  );

  const handleBuyerIdChange = useCallback(
    (buyerId: string | undefined) => {
      onChange({
        ...filters,
        buyerId,
      });
    },
    [onChange, filters]
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
      <Input
        placeholder="Search text..."
        value={filters.query}
        onChange={handleQueryChange}
      />
      {/* TODO: could be better in useContext */}
      <BuyerSelectFilter onChange={handleBuyerIdChange} />
    </div>
  );
}

export default RecordSearchFilters;
