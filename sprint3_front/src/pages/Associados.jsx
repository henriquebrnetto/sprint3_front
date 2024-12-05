import { useEffect, useState } from 'react';
import './style/Associados.css';
import { IoArrowBack } from 'react-icons/io5';
import { FaFilter, FaSortAmountDown, FaSearch, FaTrash, FaPencilAlt } from 'react-icons/fa';
import { Autocomplete, Pagination, TextField } from "@mui/material";
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

  const [maxPages, setMaxPages] = useState(1);

  const filterFields = [
    { name: 'idade', label: 'Idade', type: 'minmax', min: 0, max: 120 },
    { name: 'casado', label: 'Estado Civil', type: 'threeOptions', default: 'Todos', options: [ { value: 'Todos', label: 'Todos' }, { value: true, label: 'Casado' }, { value: false, label: 'Solteiro' } ] },
    { name: 'sexo', label: 'Sexo', type: 'threeOptions', default: 'Todos', options: [ { value: 'Todos', label: 'Todos' }, { value: 'M', label: 'M' }, { value: 'F', label: 'F' }, { value: 'O', label: 'O' } ] },
    { name: 'pcd', label: 'PCD', type: 'threeOptions', default: 'Todos', options: [ { value: 'Todos', label: 'Todos' }, { value: true, label: 'Sim' }, { value: false, label: 'Não' } ] },
    { name: 'bairro', label: 'Bairro', type: 'text' },
    { name: 'filhos', label: 'Filhos', type: 'minmax', min: 0, max: 20 },
    { name: 'status', label: 'Status', type: 'threeOptions', default: 'Todos', options: [ { value: true, label: 'Ativo' }, { value: false, label: 'Bloqueado' }, { value: 'Todos', label: 'Todos' } ] } ];  

    const orderFields = [ { name: 'nome', label: 'Nome' }, { name: 'idade', label: 'Idade' }, { name: 'filhos', label: 'Filhos' }, { name: 'pontos', label: 'Pontos' } ];

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchTerm) {
        handleSearch(searchTerm);
      } else {
        loadAssociates(); // Reset to filtered and sorted data
      }
    }, 300); // 300ms debounce
  
    return () => clearTimeout(debounce); // Cleanup debounce
  }, [searchTerm]);
  

  useEffect(() => {
    // Trigger the API request whenever filters, orderBy, or currentPage changes
    loadAssociates();
  }, [filters, orderBy, currentPage]);
  
  const loadAssociates = async () => {
    // Construct query parameters
    const elementPerPage = 10

    const queryParams = new URLSearchParams();

    const idadeFilterField = filterFields.find((field) => field.name === 'idade');
    const idadeMin = idadeFilterField?.min || 0; // Default to 0 if not found
    const idadeMax = idadeFilterField?.max || 120; // Default to 120 if not found

    const filhosFilterField = filterFields.find((field) => field.name === 'filhos');
    const filhosMin = filhosFilterField?.min || 0; // Default to 0 if not found
    const filhosMax = filhosFilterField?.max || 20; // Default to 20 if not found

  // Add filter values to the query only if they are not null or equal to default slider values
    if (filters.idade && filters.idade[0] !== idadeMin && filters.idade[1] !== idadeMax) {
      queryParams.append('idadeMinima', filters.idade[0]);
      queryParams.append('idadeMaxima', filters.idade[1]);
    }
    if (filters.casado !== undefined && filters.casado !== 'Todos') {
      queryParams.append('casado', filters.casado);
    }
    if (filters.sexo !== undefined && filters.sexo !== 'Todos') {
      queryParams.append('sexo', filters.sexo);
    }
    if (filters.filhos && filters.filhos[0] !== filhosMin && filters.filhos[1] !== filhosMax) {
      queryParams.append('filhosMinimo', filters.filhos[0]);
      queryParams.append('filhosMaximo', filters.filhos[1]);
    }
    if (filters.status !== undefined && filters.status !== 'Todos') {
      queryParams.append('status', filters.status);
    }

    queryParams.append('sortBy', orderBy.field || 'nome');
    queryParams.append('sortDirection', orderBy.direction || 'asc');

    const urlAll = `http://localhost:8081/api/v1/associados?${queryParams.toString()}`;

    // Add pagination and sorting values to the query
    queryParams.append('page', currentPage);
    queryParams.append('size', elementPerPage); // Assuming a page size of 10
    
    const url = `http://localhost:8081/api/v1/associados?${queryParams.toString()}`;
    // Build the full URL
    
    try {
      // Fetch data from the server
      const response = await fetch(url, { method: 'GET', mode: 'cors' });
      if (!response.ok) {
        throw new Error(`Failed to load data: ${response.statusText}`);
      }
      
      const responseAll = await fetch(urlAll, { method: 'GET', mode: 'cors' });
      if (!responseAll.ok) {
        throw new Error(`Failed to load data: ${response.statusText}`);
      }
      
      const data = await response.json();
      const dataAll = await responseAll.json();
      
      // Update states
      setPagedAssociates(data.content || []);
      setMaxPages(data.totalPages)

    } catch (error) {
      console.error('Error loading associates:', error);
    }

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
      
      {maxPages > 1 ? (
            <Pagination count={maxPages} page={pageN + 1} onChange={handlePageChange} className='AssociadosnavBar' sx={{justifyContent:"center", alignItems: "center", display:"flex", marginTop:"15px"}}/>
        ):(
            <></>
        )}

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