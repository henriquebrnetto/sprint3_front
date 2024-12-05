import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem } from '@mui/material';

const DateFilterDialog = ({ open, onClose, onApply }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('Todos'); // Default value

  // Handle reset button click
  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    setStatus('Todos'); // Reset status filter
    onApply({ startDate: '', endDate: '', status: 'Todos' }); // Send empty values to reset filters
    onClose(); // Close the dialog after resetting filters
  };

  const handleApply = () => {
    onApply({ startDate, endDate, status });
    onClose(); // Close the dialog after applying filters
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Filter by Date and Status</DialogTitle>
      <DialogContent>
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
          margin="dense"
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
          margin="dense"
        />
        <TextField
          select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          fullWidth
          margin="dense"
        >
          <MenuItem value="Todos">Todos</MenuItem>
          <MenuItem value="Ativos">Ativos</MenuItem>
          <MenuItem value="Inativos">Inativos</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleReset} color="secondary">
          Reset
        </Button>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleApply} color="primary">
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DateFilterDialog;