// src/components/OrderDialog.js
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import IconButton from '@mui/material/IconButton';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';

const OrderDialog = ({ open, onClose, onApply, initialOrder }) => {
  const [orderField, setOrderField] = useState(initialOrder.field);
  const [orderDirection, setOrderDirection] = useState(initialOrder.direction);

  const handleApply = () => {
    onApply({ field: orderField, direction: orderDirection });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Order Options</DialogTitle>
      <DialogContent>
        <RadioGroup value={orderField} onChange={(e) => setOrderField(e.target.value)}>
          <FormControlLabel value="nome" control={<Radio />} label="Name" />
          <FormControlLabel value="data" control={<Radio />} label="Date" />
          <FormControlLabel value="id" control={<Radio />} label="ID" />
        </RadioGroup>
        <IconButton onClick={() => setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc')}>
          {orderDirection === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />}
        </IconButton>
        <span>{orderDirection === 'asc' ? 'Ascending' : 'Descending'}</span>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleApply}>Apply</Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDialog;
