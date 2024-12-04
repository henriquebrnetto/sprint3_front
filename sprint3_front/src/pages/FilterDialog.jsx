import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Slider from '@mui/material/Slider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const FilterDialog = ({ open, onClose, onApply, fieldDefinitions, initialFilters, onReset }) => {
  const [filters, setFilters] = useState(initialFilters);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSliderChange = (name, newValue) => {
    setFilters((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleReset = () => {
    // Reset filters to their initial state
    const resetFilters = fieldDefinitions.reduce((acc, field) => {
      if (field.type === 'checkbox') acc[field.name] = false;
      else if (field.type === 'minmax') acc[field.name] = [field.min || 0, field.max || 100];
      else if (field.type === 'threeOptions') acc[field.name] = 'both'; // Reset to 'both'
      else acc[field.name] = '';
      return acc;
    }, {});

    setFilters(resetFilters); // Reset local state
    onApply(resetFilters); // Update parent state
    onReset(); // Reset filters in parent state (reset behavior)
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Filter Options</DialogTitle>
      <DialogContent>
        {fieldDefinitions.map((field) => (
          <div key={field.name} style={{ marginBottom: '16px' }}>
            {field.type === 'checkbox' ? (
              <FormControlLabel
                control={
                  <Checkbox
                    name={field.name}
                    checked={filters[field.name] || false}
                    onChange={handleChange}
                  />
                }
                label={field.label}
              />
            ) : field.type === 'minmax' ? (
              <div>
                <label>{field.label}</label>
                <Slider
                  value={filters[field.name] || [field.min || 0, field.max || 100]}
                  onChange={(e, newValue) => handleSliderChange(field.name, newValue)}
                  valueLabelDisplay="auto"
                  min={field.min || 0}
                  max={field.max || 100}
                />
              </div>
            ) : field.type === 'threeOptions' ? (
              <FormControl fullWidth margin="dense">
                <InputLabel>{field.label}</InputLabel>
                <Select
                  label={field.label}
                  name={field.name}
                  value={filters[field.name] || 'both'}
                  onChange={handleChange}
                >
                  {field.options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <TextField
                label={field.label}
                name={field.name}
                value={filters[field.name] || ''}
                onChange={handleChange}
                fullWidth
              />
            )}
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleReset}>Reset Filters</Button>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleApply}>Apply</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterDialog;