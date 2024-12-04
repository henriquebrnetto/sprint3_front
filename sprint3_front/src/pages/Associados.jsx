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
  const [currentPage, setCurrentPage] = useState(0);

  const filterFields = [
    { name: 'idade', label: 'Idade', type: 'minmax', min: 0, max: 120 },
    { name: 'casado', label: 'Estado Civil', type: 'threeOptions', default: 'Todos', options: [ { value: 'Todos', label: 'Todos' }, { value: true, label: 'Casado' }, { value: false, label: 'Solteiro' } ] },
    { name: 'sexo', label: 'Sexo', type: 'threeOptions', default: 'Todos', options: [ { value: 'Todos', label: 'Todos' }, { value: 'M', label: 'M' }, { value: 'F', label: 'F' }, { value: 'O', label: 'O' } ] },
    { name: 'pcd', label: 'PCD', type: 'threeOptions', default: 'Todos', options: [ { value: 'Todos', label: 'Todos' }, { value: true, label: 'Sim' }, { value: false, label: 'Não' } ] },
    { name: 'bairro', label: 'Bairro', type: 'text' },
    { name: 'filhos', label: 'Filhos', type: 'minmax', min: 0, max: 20 },
    { name: 'status', label: 'Status', type: 'threeOptions', default: 'ativo', options: [ { value: 'ativo', label: 'Ativo' }, { value: 'bloqueado', label: 'Bloqueado' }, { value: 'Todos', label: 'Todos' } ] } ];  

    const orderFields = [ { name: 'nome', label: 'Nome' }, { name: 'idade', label: 'Idade' }, { name: 'filhos', label: 'Filhos' }, { name: 'pontos', label: 'Pontos' } ];
    
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

  const loadAssociates = async (page = 0) => {
    // Construct query parameters
    const queryParams = new URLSearchParams();
  
    // Add filter values to the query
    queryParams.append('idadeMinima', filters.idade ? filters.idade[0] : null);
    queryParams.append('idadeMaxima', filters.idade ? filters.idade[1] : null);
    queryParams.append('casado', filters.casado !== 'Todos' ? filters.casado : null);
    queryParams.append('sexo', filters.sexo !== 'Todos' ? filters.sexo : null);
    queryParams.append('filhosMinimo', filters.filhos ? filters.filhos[0] : null);
    queryParams.append('filhosMaximo', filters.filhos ? filters.filhos[1] : null);
    queryParams.append('status', filters.status !== 'Todos' ? filters.status : null);
  
    // Add pagination and sorting values to the query
    queryParams.append('page', page);
    queryParams.append('size', 10); // Assuming a page size of 10
    queryParams.append('sortBy', orderBy.field || 'nome');
    queryParams.append('sortDirection', orderBy.direction || 'asc');
  
    // Build the full URL
    const url = `http://localhost:8081/associados?${queryParams.toString()}`;
  
    try {
      // Fetch data from the server
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to load data: ${response.statusText}`);
      }
      const data = await response.json();
  
      // Update states
      setAssociates(data.content || []); // Assuming the API returns data in a `content` field
      setPagedAssociates(data.content || []);
    } catch (error) {
      console.error('Error loading associates:', error);
    }
  };
  

  const applyFiltersAndSorting = () => {
    loadAssociates(); // Reload data based on updated filters and sorting
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

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
    loadAssociates(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
      loadAssociates(currentPage - 1);
    }
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

      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 0}>
          Previous
        </button>
        <button onClick={handleNextPage}>
          Next
        </button>
      </div>


      <FilterDialog
        open={isFilterDialogOpen}
        onClose={() => setFilterDialogOpen(false)}
        onApply={(newFilters) => {
          setFilters(newFilters);
          setCurrentPage(0); // Reset to first page
          loadAssociates(0); // Reload data with new filters
        }}
        initialFilters={filters}
        fieldDefinitions={filterFields}
      />


      <OrderDialog
        open={isOrderDialogOpen}
        onClose={() => setOrderDialogOpen(false)}
        onApply={(newOrderBy) => {
          setOrderBy(newOrderBy);
          setCurrentPage(0); // Reset to first page
          loadAssociates(0); // Reload data with new sorting
        }}
        initialOrder={orderBy}
        fields={orderFields}
      />

    </>
  );
}