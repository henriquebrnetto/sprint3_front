import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const FilterDialog = ({ open, onClose, onApply, fieldDefinitions, initialFilters }) => {
  const [filters, setFilters] = useState(initialFilters);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFilters((prev) => {
      const field = fieldDefinitions.find((field) => field.name === name);
      if (field?.type === 'threeOptions') {
        return {
          ...prev,
          [name]: value,
        };
      }
  
      return {
        ...prev,
        [name]: value,
      };
    });
  };  

  const handleSliderChange = (name, newValue) => {
    setFilters((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleReset = () => {
    const resetFilters = fieldDefinitions.reduce((acc, field) => {
      if (field.type === 'checkbox') acc[field.name] = false;
      else if (field.type === 'minmax') acc[field.name] = [field.min || 0, field.max || 100];
      else if (field.type === 'threeOptions') acc[field.name] = field.default;
      else acc[field.name] = '';
      return acc;
    }, {});

    setFilters(resetFilters);
    onApply(resetFilters);
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
            {field.type === 'minmax' ? (
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
                  value={
                    filters[field.name] !== undefined
                      ? String(filters[field.name])
                      : field.default || 'Todos' // Use default if value is undefined
                  }
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
        <Button onClick={handleReset}>Remover Filtros</Button>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleApply}>Aplicar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterDialog;