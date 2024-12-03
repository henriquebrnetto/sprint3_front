// src/components/FilterDialog.js
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const FilterDialog = ({ open, onClose, onApply, initialFilters }) => {
  const [filters, setFilters] = useState(initialFilters);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleReset = () => {
    setFilters({ nome: '', data: '', ageMin: '', ageMax: '', hasChildren: false });
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Filter Options</DialogTitle>
      <DialogContent>
        <TextField label="Name" name="nome" value={filters.nome} onChange={handleChange} fullWidth margin="dense" />
        <TextField label="Date" name="data" value={filters.data} onChange={handleChange} fullWidth margin="dense" />
        <TextField label="Min Age" name="ageMin" type="number" value={filters.ageMin} onChange={handleChange} fullWidth margin="dense" />
        <TextField label="Max Age" name="ageMax" type="number" value={filters.ageMax} onChange={handleChange} fullWidth margin="dense" />
        <FormControlLabel
          control={<Checkbox checked={filters.hasChildren} onChange={handleChange} name="hasChildren" />}
          label="Has Children"
        />
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