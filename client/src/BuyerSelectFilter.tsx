import { Select } from "antd";
import { CSSProperties, useCallback, useState } from "react";
import useBuyerOptions from "./hooks/useBuyerOptions";

const SearchInput = (props: {
  placeholder: string;
  style: CSSProperties;
  onChange: (newBuyerId: string | undefined) => void;
}) => {
  const [value, setValue] = useState<string>();
  const {
    refetch: getBuyers,
    data: buyerData,
    isLoading: loadingBuyers,
  } = useBuyerOptions({ q: "", limit: 10, initialOffset: 0 });

  const handleSearch = useCallback(
    (newValue: string) => {
      getBuyers(newValue);
    },
    [getBuyers]
  );

  const handleChange = useCallback((newValue: string | undefined) => {
    setValue(newValue);
    props?.onChange(newValue);
  }, []);

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

const BuyerSelectFilter = ({
  onChange,
}: {
  onChange: (newBuyerId: string | undefined) => void;
}) => (
  <SearchInput
    placeholder="Search buyers..."
    style={{ flex: 1 }}
    onChange={onChange}
  />
);

export default BuyerSelectFilter;
