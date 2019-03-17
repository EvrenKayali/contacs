import React from "react";

export interface Props {
  onSearch: (searchTerm: string) => void;
}

const ContactSearchInput = (props: Props) => {
  const handleSeachTermChange = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    props.onSearch(event.currentTarget.value);
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      onKeyUp={e => handleSeachTermChange(e)}
    />
  );
};

export default ContactSearchInput;
