import { useEffect, useState } from 'react';
import './style/Associados.css';
import { IoArrowBack } from 'react-icons/io5';
import { FaFilter, FaSortAmountDown, FaSearch, FaTrash, FaPencilAlt } from 'react-icons/fa';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FilterDialog from './FilterDialog';  // Ensure this file exists as per the previous example
import OrderDialog from './OrderDialog';    // Ensure this file exists as per the previous example

export function Associados() {
  const [associates, setAssociates] = useState([]);
  const [pagedAssociates, setPagedAssociates] = useState([]);
  const [filters, setFilters] = useState({ nome: '', data: '', ageMin: '', ageMax: '', hasChildren: false });
  const [orderBy, setOrderBy] = useState({ field: 'nome', direction: 'asc' });
  const [isFilterDialogOpen, setFilterDialogOpen] = useState(false);
  const [isOrderDialogOpen, setOrderDialogOpen] = useState(false);

  useEffect(() => {
    loadAssociates();
  }, [filters, orderBy]);

  const loadAssociates = () => {
    // Replace with your API call in the future
    const data = [
      { nome: 'Alice', data: '2023-01-01', age: 25, hasChildren: true, id: '1' },
      { nome: 'Bob', data: '2023-02-15', age: 30, hasChildren: false, id: '2' },
      // More test data
    ];

    let filteredData = data.filter((assoc) =>
      (filters.nome === '' || assoc.nome.toLowerCase().includes(filters.nome.toLowerCase())) &&
      (filters.data === '' || assoc.data.includes(filters.data)) &&
      (filters.ageMin === '' || assoc.age >= parseInt(filters.ageMin)) &&
      (filters.ageMax === '' || assoc.age <= parseInt(filters.ageMax)) &&
      (filters.hasChildren === false || assoc.hasChildren === filters.hasChildren)
    );

    filteredData.sort((a, b) => {
      if (orderBy.direction === 'asc') {
        return a[orderBy.field].localeCompare(b[orderBy.field]);
      } else {
        return b[orderBy.field].localeCompare(a[orderBy.field]);
      }
    });

    setPagedAssociates(filteredData);
  };

  return (
    <>
      <div className='mainGrid'>
        <div className='previousPage'>
          <button id='previousPageButton'><IoArrowBack /></button>
        </div>
        <div className='topSection'>
          <button className='filter' onClick={() => setFilterDialogOpen(true)}>
            <FaFilter />
          </button>

          <Autocomplete
            className='searchBar'
            options={pagedAssociates}
            freeSolo
            getOptionLabel={(option) => option.nome}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label={
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FaSearch /> Buscar associado
                  </span>
                }
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderWidth: '2px',
                    borderColor: 'black',
                    '& fieldset': {
                      borderWidth: '2px',
                      borderColor: 'rgba(0,0,0,.4)',
                      borderRadius: '7px',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(0,0,0,.6)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'rgba(0,0,0,.6)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(0,0,0,.7)',
                    fontSize: '16px',
                    fontWeight: '500',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'rgba(0,0,0,.7)',
                  },
                }}
              />
            )}
          />

          <button className='orderby' onClick={() => setOrderDialogOpen(true)}>
            <FaSortAmountDown />
          </button>
        </div>
        <h2 className='tituloAssociados'>Associados:</h2>
        <div className='Associados'>
          {pagedAssociates.map((associate) => (
            <div className='associate' key={associate.id}>
              <button className='associateBox'>
                <h3 id='associateName'>{associate.nome}</h3>
              </button>
              <button className='editButton'><FaPencilAlt /></button>
              <button className='deleteButton'><FaTrash /></button>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Dialog Component */}
      <FilterDialog
        open={isFilterDialogOpen}
        onClose={() => setFilterDialogOpen(false)}
        onApply={setFilters}
        initialFilters={filters}
      />

      {/* Order Dialog Component */}
      <OrderDialog
        open={isOrderDialogOpen}
        onClose={() => setOrderDialogOpen(false)}
        onApply={setOrderBy}
        initialOrder={orderBy}
      />
    </>
  );
}