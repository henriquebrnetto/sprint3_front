import { useEffect, useState } from 'react';
import './style/Associados.css';
import { IoArrowBack } from 'react-icons/io5';
import { FaFilter, FaSortAmountDown, FaSearch, FaTrash, FaPencilAlt } from 'react-icons/fa';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import FilterDialog from './FilterDialog';
import OrderDialog from './OrderDialog';

export function Associados() {
  const [associates, setAssociates] = useState([]);
  const [pagedAssociates, setPagedAssociates] = useState([]);
  const [filters, setFilters] = useState({});
  const [orderBy, setOrderBy] = useState({ field: 'nome', direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterDialogOpen, setFilterDialogOpen] = useState(false);
  const [isOrderDialogOpen, setOrderDialogOpen] = useState(false);

  const filterFields = [
    { name: 'nome', label: 'Name', type: 'text' },
    { name: 'data', label: 'Date', type: 'text' },
    { name: 'ageRange', label: 'Age Range', type: 'minmax', min: 0, max: 100 },
    {
      name: 'hasChildren',
      label: 'Has Children',
      type: 'threeOptions', // New type
      options: [
        { value: 'both', label: 'Both' },
        { value: true, label: 'Yes' },
        { value: false, label: 'No' },
      ],
    }
  ];

  const orderFields = [
    { name: 'nome', label: 'Name' },
    { name: 'data', label: 'Date' },
    { name: 'id', label: 'ID' },
  ];

  useEffect(() => {
    loadAssociates();
  }, []);

  useEffect(() => {
    if (associates.length > 0) {
      applyFiltersAndSorting();
    }
  }, [filters, orderBy, associates]);

  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm);
    } else if (associates.length > 0) {
      applyFiltersAndSorting();
    }
  }, [searchTerm]);

  const loadAssociates = () => {
    const data = [
      { nome: 'Alice', data: '2023-01-01', age: 25, hasChildren: true, id: '1' },
      { nome: 'Bob', data: '2023-02-15', age: 30, hasChildren: false, id: '2' },
      { nome: 'Charlie', data: '2022-12-10', age: 40, hasChildren: true, id: '3' },
    ];

    setAssociates(data);
    setPagedAssociates(data); // Initialize with full data
  };

  const applyFiltersAndSorting = () => {
    let filteredData = [...associates];
  
    filteredData = filteredData.filter((assoc) => {
      const { nome, data, ageRange, hasChildren } = filters;
  
      const matchesName = !nome || assoc.nome.toLowerCase().includes(nome.toLowerCase());
      const matchesDate = !data || assoc.data.includes(data);
      const matchesAge =
        !ageRange ||
        (assoc.age >= (ageRange[0] || 0) && assoc.age <= (ageRange[1] || 100));
  
      // Handle hasChildren filter
      const matchesHasChildren =
        hasChildren === 'both' ||
        hasChildren === undefined ||
        assoc.hasChildren === hasChildren;
  
      return matchesName && matchesDate && matchesAge && matchesHasChildren;
    });
  
    filteredData.sort((a, b) => {
      if (orderBy.direction === 'asc') {
        return String(a[orderBy.field]).localeCompare(String(b[orderBy.field]));
      } else {
        return String(b[orderBy.field]).localeCompare(String(a[orderBy.field]));
      }
    });
  
    setPagedAssociates(filteredData);
  };
    
  const handleSearch = (term) => {
    const lowerCaseTerm = term.toLowerCase();
    const filteredData = associates.filter(
      (assoc) =>
        assoc.nome.toLowerCase().startsWith(lowerCaseTerm) ||
        String(assoc.id).toLowerCase().startsWith(lowerCaseTerm)
    );

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
            inputValue={searchTerm}
            onInputChange={(event, newInputValue) => setSearchTerm(newInputValue)}
            getOptionLabel={(option) => option.nome || ''}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label={
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FaSearch /> Buscar associado
                  </span>
                }
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

      <FilterDialog
        open={isFilterDialogOpen}
        onClose={() => setFilterDialogOpen(false)}
        onApply={setFilters}
        initialFilters={filters}
        fieldDefinitions={filterFields}
      />

      <OrderDialog
        open={isOrderDialogOpen}
        onClose={() => setOrderDialogOpen(false)}
        onApply={setOrderBy}
        initialOrder={orderBy}
        fields={orderFields}
      />
    </>
  );
}