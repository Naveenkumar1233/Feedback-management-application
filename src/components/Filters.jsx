import React from 'react';

const Filters = ({ setFilterDate, setResponseStatusFilter, applyFilters }) => {
  return (
    <div className="filter-container">
      <h3>Filter Feedback</h3>
      <div className="date-range">
        <label>Date Range:</label>
        <input type="date" onChange={(e) => setFilterDate(e.target.value)} />
        <span>to</span>
        <input type="date" onChange={(e) => setFilterDate(e.target.value)} />
      </div>
      <div className="response-status">
        <label>Response Status:</label>
        <select onChange={(e) => setResponseStatusFilter(e.target.value)}>
          <option value="">All</option>
          <option value="Acknowledge">Acknowledge</option>
          <option value="Address">Address</option>
          <option value="Ignore">Ignore</option>
        </select>
      </div>
      <button onClick={applyFilters}>Apply Filters</button>
    </div>
  );
};

export default Filters;

