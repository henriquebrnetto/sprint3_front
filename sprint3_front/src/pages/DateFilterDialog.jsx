import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem } from '@mui/material';

const DateFilterDialog = ({ open, onClose, onApply, initialFilters }) => {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    status: 'Todos',
  });

  useEffect(() => {
    // Initialize with existing filters if available
    setFilters(initialFilters || { startDate: '', endDate: '', status: 'Todos' });
  }, [initialFilters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    const resetFilters = { startDate: '', endDate: '', status: 'Todos' };
    setFilters(resetFilters);
    onApply(resetFilters);  // Apply reset filters
  };

  const handleApply = () => {
    onApply(filters);  // Send filters to the parent component
    onClose();         // Close the dialog
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Filtrar por data e Status</DialogTitle>
      <DialogContent>
        <TextField
          label="Start Date"
          name="startDate"
          type="date"
          value={filters.startDate}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="End Date"
          name="endDate"
          type="date"
          value={filters.endDate}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          select
          label="Status"
          name="status"
          value={filters.status}
          onChange={handleChange}
          fullWidth
          margin="dense"
        >
          <MenuItem value="Todos">Todos</MenuItem>
          <MenuItem value='Ativos'>Ativos</MenuItem>
          <MenuItem value='Inativos'>Inativos</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleReset} color="secondary">
          Remover Filtros
        </Button>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleApply} color="primary">
          Aplicar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DateFilterDialog;