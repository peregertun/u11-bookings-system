import React from "react";

const Header = (props) => {
  const handleFilterChange = (e) => {
    props.updateFilter(e.target.value);
  };

  return (
    <>
      <section className="row header">
        <div className="col-sm-7">
          <h1>Filter users</h1>
        </div>

        <div className="col-sm-5">
          <input
            className="form-control input-sm"
            onChange={handleFilterChange}
            placeholder="Type to filter users"
          />
        </div>
      </section>
    </>
  );
};

export default Header;
