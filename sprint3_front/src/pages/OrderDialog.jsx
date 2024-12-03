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

const OrderDialog = ({ open, onClose, onApply, fields, initialOrder }) => {
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
          {fields.map((field) => (
            <FormControlLabel key={field.name} value={field.name} control={<Radio />} label={field.label} />
          ))}
        </RadioGroup>
        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc')}>
            {orderDirection === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />}
          </IconButton>
          <span>{orderDirection === 'asc' ? 'Ascending' : 'Descending'}</span>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleApply}>Apply</Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDialog;