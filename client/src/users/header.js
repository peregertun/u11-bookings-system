import React from "react";

const Header = (props) => {
  const handleFilterChange = (e) => {
    props.updateFilter(e.target.value);
  };

  return (
    <>
      <th colSpan="2">
        <h2>Filter users</h2>
      </th>
      <th colSpan="2">
        <input
          className="form-control input-sm"
          onChange={handleFilterChange}
          placeholder="Type to filter users"
        />
      </th>
    </>
  );
};

export default Header;
