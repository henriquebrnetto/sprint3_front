import { useEffect, useState } from 'react';
import './style/Associados.css';
import { IoArrowBack } from 'react-icons/io5';
import { FaFilter, FaSortAmountDown, FaTrash, FaPencilAlt, FaSearch } from 'react-icons/fa';
import { Autocomplete, Pagination, TextField } from "@mui/material";
import FilterDialog from './FilterDialog';
import OrderDialog from './OrderDialog';

import { Link } from 'react-router'
import { CgAdd } from 'react-icons/cg';

export function Associados() {
  const [associates, setAssociates] = useState([]);
  const [pagedAssociates, setPagedAssociates] = useState([]);

  const [filters, setFilters] = useState({});
  const [orderBy, setOrderBy] = useState({ field: 'nome', direction: 'asc' });

  const [nameFiltering, setNameFiltering] = useState('')
  const [registrationFiltering, setRegistrationFiltering] = useState('')
  const [isFilterDialogOpen, setFilterDialogOpen] = useState(false);
  const [isOrderDialogOpen, setOrderDialogOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [maxPages, setMaxPages] = useState(1);

  const [value, setValue] = useState(null)


  const filterFields = [
    { name: 'idade', label: 'Idade', type: 'minmax', min: 0, max: 120 },
    { name: 'casado', label: 'Estado Civil', type: 'threeOptions', default: 'Todos', options: [ { value: 'Todos', label: 'Todos' }, { value: true, label: 'Casado' }, { value: false, label: 'Solteiro' } ] },
    { name: 'sexo', label: 'Sexo', type: 'threeOptions', default: 'Todos', options: [ { value: 'Todos', label: 'Todos' }, { value: 'M', label: 'M' }, { value: 'F', label: 'F' }, { value: 'O', label: 'O' } ] },
    { name: 'pcd', label: 'PCD', type: 'threeOptions', default: 'Todos', options: [ { value: 'Todos', label: 'Todos' }, { value: true, label: 'Sim' }, { value: false, label: 'Não' } ] },
    { name: 'filhos', label: 'Filhos', type: 'minmax', min: 0, max: 20 },
    { name: 'status', label: 'Status', type: 'threeOptions', default: 'Todos', options: [ { value: true, label: 'Ativo' }, { value: false, label: 'Bloqueado' }, { value: 'Todos', label: 'Todos' } ] },
    { name: 'tipoAcesso', label: 'Tipo de Acesso', type: 'threeOptions', default: 'Todos', options: [ { value: 'Todos', label: 'Todos' }, { value: 'admin', label: 'Administrador' }, { value: 'colaborador', label: 'Colaborador/Voluntário' },  { value: 'associado', label: 'Associado' }] } ];

  const orderFields = [ { name: 'nome', label: 'Nome' }, { name: 'idade', label: 'Idade' }, { name: 'filhos', label: 'Filhos' }, { name: 'pontos', label: 'Pontos' } ];

  useEffect(() => {
    loadAssociates();
  }, [filters, orderBy, currentPage, nameFiltering, registrationFiltering]);
  
  const loadAssociates = async () => {
    const elementPerPage = 10

    const queryParams = new URLSearchParams();

    queryParams.append('nome', nameFiltering)
    queryParams.append('matricula', registrationFiltering)

    const idadeFilterField = filterFields.find((field) => field.name === 'idade');
    const idadeMin = idadeFilterField?.min || 0;
    const idadeMax = idadeFilterField?.max || 120;
    const filhosFilterField = filterFields.find((field) => field.name === 'filhos');
    const filhosMin = filhosFilterField?.min || 0;
    const filhosMax = filhosFilterField?.max || 20;

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
    if (filters.pcd !== undefined && filters.pcd !== 'Todos') {
      queryParams.append('pcd', filters.pcd);
    }
    if (filters.tipoAcesso !== undefined && filters.tipoAcesso !== 'Todos') {
      queryParams.append('tipoAcesso', filters.tipoAcesso);
    }

    queryParams.append('sortBy', orderBy.field || 'nome');
    queryParams.append('sortDirection', orderBy.direction || 'asc');

    const urlAll = `http://localhost:8081/api/v1/associados?${queryParams.toString()}`;

    queryParams.append('page', currentPage);
    queryParams.append('size', elementPerPage);
    
    const url = `http://localhost:8081/api/v1/associados?${queryParams.toString()}`;
    
    try {
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

      setAssociates(dataAll.content || [])
      setPagedAssociates(data.content || []);
      setMaxPages(data.totalPages)

    } catch (error) {
      console.error('Error loading associates:', error);
    }

  }; 

  const handleSearchOptions = (options, { inputValue }) => {
    var nameRegistrationFilter = options.filter(
    (option) =>
        String(option.matricula).includes(inputValue) || 
            option.nome.toLowerCase().includes(inputValue.toLowerCase())
    );
    return nameRegistrationFilter
  };
  
  const handleSearch = ({ inputValue }) => {

    console.log(registrationFiltering)
    console.log(nameFiltering)

    var registrationFilter = associates.filter(
    (option) =>
        String(option.matricula).includes(inputValue)
    );
    var nameFilter = associates.filter(
    (option) =>
      option.nome.toLowerCase().includes(inputValue.toLowerCase())
    );
    
    if (registrationFilter.length > 0){
      setRegistrationFiltering(inputValue)
    } else {
      setRegistrationFiltering(null)
    }
    
    if (nameFilter.length > 0){
      setNameFiltering(inputValue)
    } else {
      setNameFiltering(null)
    }
  };

  return (
    <>
      <div className='associadosMainGrid'>

        <Link to='/associadoCadastroEdicao'> <button id='eventosNewEvent'><CgAdd></CgAdd></button></Link>

        <div className='associadosPreviousPage'>
          <Link to='/homeadmin'><button id='associadosPreviousPageButton'><IoArrowBack /></button></Link>
        </div>
        <div className='associadosTopSection'>
          <button className='associadosFilter' onClick={() => setFilterDialogOpen(true)}>
            <FaFilter />
          </button>

          <button className='associadosOrderBy' onClick={() => setOrderDialogOpen(true)}>
            <FaSortAmountDown />
          </button>
        </div>
        <h2 className='associadosTituloAssociados'>Associados:</h2>
        <div className='associadosAssociados'>
          {pagedAssociates.map((associate) => (
            <div className='associadosAssociate' key={associate.id}>
                <Link to={'/associado/' + associate.matricula}><button id='associadosAssociateBox'>
                  <h3 id='associadosAssociateName'>{associate.nome}</h3>
                </button></Link>
              <Link to={'/associadocadastroedicao/' + associate.matricula}><button className='associadosEditButton'><FaPencilAlt /></button></Link>
              <button className='associadosDeleteButton'><FaTrash /></button>
            </div>
          ))}
        </div>
      </div>
      
      {maxPages > 1 ? (
            <Pagination count={maxPages} page={pageN + 1} onChange={handlePageChange} className='eventAssociadosnavBar' sx={{justifyContent:"center", alignItems: "center", display:"flex", marginTop:"15px"}}/>
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