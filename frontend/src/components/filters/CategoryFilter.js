import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText } from '@material-ui/core';


const CategoryFilter = ({ categoryFilter, setCategoryFilter, categories }) => {
    const handleChange = (event) => {
      setCategoryFilter(event.target.value);
    };
  
    console.log("Categories in CategoryFilter:", categories);
  
    return (
      <FormControl fullWidth>
        <InputLabel id="category-filter-label">Categories</InputLabel>
        <Select
          labelId="category-filter-label"
          id="category-filter"
          multiple
          value={categoryFilter}
          onChange={handleChange}
          renderValue={(selected) => selected.join(', ')}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              <Checkbox checked={categoryFilter.indexOf(category) > -1} />
              <ListItemText primary={category} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };
  export default CategoryFilter;
