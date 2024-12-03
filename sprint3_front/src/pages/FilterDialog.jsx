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

const FilterDialog = ({ open, onClose, onApply, fieldDefinitions, initialFilters }) => {
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
      else acc[field.name] = '';
      return acc;
    }, {});
  
    setFilters(resetFilters); // Reset local state
    onApply(resetFilters); // Update parent state to reset filters
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
                <label style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>
                  {field.label}
                </label>
                <Slider
                  value={filters[field.name] || [field.min || 0, field.max || 100]}
                  onChange={(e, newValue) => handleSliderChange(field.name, newValue)}
                  valueLabelDisplay="auto"
                  min={field.min || 0}
                  max={field.max || 100}
                />
              </div>
            ) : (
              <TextField
                label={field.label}
                name={field.name}
                type={field.type}
                value={filters[field.name] || ''}
                onChange={handleChange}
                fullWidth
                margin="dense"
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