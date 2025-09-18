import * as React from "react";
import { Searchbar } from "react-native-paper";

type SearchBarProps = {
  placeholder?: string;
  value?: string;
  onChange: (query: string) => void;
};

const SearchBarComponent: React.FC<SearchBarProps> = ({
  placeholder = "Search",
  value = "",
  onChange,
}) => {
  return (
    <Searchbar
      placeholder={placeholder}
      onChangeText={onChange}
      value={value}
    />
  );
};

export default SearchBarComponent;
