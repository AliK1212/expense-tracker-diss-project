import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const DateRangeFilter = ({ dateFilter, setDateFilter }) => {
  const handleChange = (event) => {
    setDateFilter(event.target.value);
  };

  return (
    <FormControl>
      <InputLabel id="date-range-filter-label">Date Range</InputLabel>
      <Select
        labelId="date-range-filter-label"
        id="date-range-filter"
        value={dateFilter}
        onChange={handleChange}
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="thisWeek">This Week</MenuItem>
        <MenuItem value="thisMonth">This Month</MenuItem>
        <MenuItem value="lastMonth">Last Month</MenuItem>
        <MenuItem value="thisYear">This Year</MenuItem>
      </Select>
    </FormControl>
  );
};

export default DateRangeFilter;
