import { Select } from "antd";
import { useCallback, useState } from "react";
import { BuyerSelectFilterProps, SearchInputProps } from "./Types";
import useBuyerOptions from "./hooks/useBuyerOptions";

// TODO: abstract as modular component
const SearchInput = (props: SearchInputProps) => {
  const [value, setValue] = useState<string>();
  const {
    refetch: getBuyers,
    data: buyerData,
    isLoading: loadingBuyers,
  } = useBuyerOptions({ q: "", limit: 10, initialOffset: 0 });

  // refetch when input changes
  const handleSearch = useCallback(
    (newValue: string) => {
      getBuyers(newValue);
    },
    [getBuyers]
  );

  // TODO: debounce this function
  const handleChange = useCallback(
    (newValue: string | undefined) => {
      setValue(newValue);
      props?.onChange(newValue);
    },
    [props?.onChange]
  );

  return (
    <Select
      showSearch
      value={value}
      loading={loadingBuyers}
      placeholder={props.placeholder}
      style={props.style}
      defaultActiveFirstOption={false}
      suffixIcon={null}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={null}
      onClear={() => handleChange(undefined)}
      allowClear
      options={(buyerData || []).map((d) => ({
        value: d.value,
        label: d.text,
      }))}
    />
  );
};

const BuyerSelectFilter = ({ onChange }: BuyerSelectFilterProps) => (
  <SearchInput
    placeholder="Search buyers..."
    style={{ flex: 1 }}
    onChange={onChange}
  />
);

export default BuyerSelectFilter;