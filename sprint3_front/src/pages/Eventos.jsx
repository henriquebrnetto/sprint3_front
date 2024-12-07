import { useEffect, useState } from 'react';

import './style/Eventos.css';
import { IoArrowBack } from 'react-icons/io5';
import { FaFilter, FaSortAmountDown, FaSearch, FaTrash, FaPencilAlt, FaCalendar  } from 'react-icons/fa';
import { Autocomplete, Pagination, TextField } from "@mui/material";
import OrderDialog from './OrderDialog';
import DateFilterDialog from './DateFilterDialog';
import { CgAdd } from "react-icons/cg";

import { Link } from 'react-router';

export function Eventos() {

  const [events, setEvents] = useState([]);
  const [pagedEvents, setPagedEvents] = useState([]);
  const [orderBy, setOrderBy] = useState({ field: 'nome', direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [isOrderDialogOpen, setOrderDialogOpen] = useState(false);
  const [filters, setFilters] = useState({ startDate: '', endDate: '', status: 'Todos' });
  const [isDateDialogOpen, setDateDialogOpen] = useState(false);

  const [nameFiltering, setNameFiltering] = useState('')

  const [currentPage, setCurrentPage] = useState(0);
  const [maxPages, setMaxPages] = useState(1);

  const orderFields = [ { name : 'nome', label: 'Nome'}, { name: 'data', label: 'Data' } ];

  useEffect(() => {
    loadEvents();
  }, [filters, orderBy, currentPage, nameFiltering]);

  const applyDateFilter = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(0);
  };
 
  const loadEvents = async () => {
    const elementPerPage = 7;
    const queryParams = new URLSearchParams();

    queryParams.append('nome', nameFiltering)
  
    if (filters.startDate) {
      queryParams.append('dataInicio', filters.startDate);
    }
    if (filters.endDate) {
      queryParams.append('dataFim', filters.endDate);
    }

    if (filters.status === 'Ativos') {
      queryParams.append('status', true);
    } else if (filters.status === 'Inativos') {
      queryParams.append('status', false);
    }
  
    queryParams.append('sortBy', orderBy.field || 'nome');
    queryParams.append('sortDirection', orderBy.direction || 'asc');

    const urlAll = `http://localhost:8081/api/v1/eventos?${queryParams.toString()}`;

    queryParams.append('page', currentPage);
    queryParams.append('size', elementPerPage);
  
    const url = `http://localhost:8081/api/v1/eventos?${queryParams.toString()}`;

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

      setEvents(dataAll.content || [])
      setPagedEvents(data.content || []);
      setMaxPages(data.totalPages)

    } catch (error) {
      console.error('Error loading associates:', error);
    }
  };

  const handleSearch = (options, { inputValue }) => {
    console.log(nameFiltering)

    var nameFilter = options.filter(
      (option) =>
          option.nome.toLowerCase().includes(inputValue.toLowerCase())
      );
  
      if (nameFilter.length > 0){
          setNameFiltering(inputValue)
      } else {
          setNameFiltering(null)
      }

    return nameFilter
  }

  const handleDelete = async (eventoId) => {
    const url = `http://localhost:8081/api/v1/eventos/${eventoId}`;

    try {
      const response = await fetch(url, { method: 'DELETE', mode: 'cors' });
      if (!response.ok) {
        throw new Error(`Failed to delete data: ${response.statusText}`);
      }
      loadEvents();
    } catch (error) {
      console.error('Error loading associates:', error);
    }


  }


  
return (
  <>
    <div className='eventosMainGrid'>

      <Link to='/associadocadastroedicao/bla'> <button id='eventosNewEvent'><CgAdd></CgAdd></button></Link>

      <div className='eventosPreviousPage'>
          <Link to='/homeadmin'><button id='eventosPreviousPageButton'><IoArrowBack /></button></Link>
      </div>

      <div className='eventosTopSection'>

        <button className='eventosCalendar' onClick={() => setDateDialogOpen(true)}>
          <FaCalendar />
        </button>
        <Autocomplete
              className='eventosAssociadosSearchBar'
              options={events}
              startdecorator={<FaSearch></FaSearch>}
              freeSolo
              getOptionLabel={(option) => option.nome || ''}
              filterOptions={handleSearch}
              onChange={loadEvents}
              autoHighlight
              renderInput={(params) => (
                  <TextField {...params} variant="outlined"

                      label={
                          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <FaSearch /> Buscar evento
                          </span>
                      }

                      // Estilizando a barra de busca pq nao tem como fzr isso no arquivo de css
      
                      sx={{
                          '& .MuiOutlinedInput-root': {
                              borderWidth: '2px',
                              borderColor: 'black',
                              '& fieldset': {
                                  borderWidth: '2px',
                                  borderColor: 'rgba(0,0,0,.4)',
                                  borderRadius: '7px'
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
                              fontWeight: '500'
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                              color: 'rgba(0,0,0,.7)',
                          },
                      }}

                      // -----
                  />
              )}
          />
          <button className='orderby' onClick={() => setOrderDialogOpen(true)}>
              <FaSortAmountDown />
          </button>
      </div>
        <h2 className='eventosTituloEventos'>Eventos:</h2>
        <div className='eventosEventos'>
            {pagedEvents.map((event, index) => (
                <div className='eventosEvent' key={index}>
                    <>{event.ativo}</>
                    <Link to={'/evento/' + event.id}><button className='eventosEventBox'>
                        <h3 id='eventName'>{event.nome}</h3>
                    </button></Link>
                    <Link to={'/eventocadastroedicao/'+event.id}><button className='eventosEditButton'><FaPencilAlt></FaPencilAlt></button></Link>
                    <Link><button className='eventosDeleteButton' onClick={() => handleDelete(event.id)} disabled={event.status}><FaTrash></FaTrash></button></Link>
                </div>
            ))}
        </div>
        {maxPages > 1 ? (
            <Pagination count={maxPages} page={pageN + 1} onChange={handlePageChange} className='eventosNavBar' sx={{justifyContent:"center", alignItems: "center", display:"flex", marginTop:"15px"}}/>
        ):(
            <></>
        )}
    </div>

      <DateFilterDialog
        open={isDateDialogOpen}
        onClose={() => setDateDialogOpen(false)}
        onApply={applyDateFilter}
        initialFilters={filters}  // Pass the existing filter state
      />

      <OrderDialog
          open={isOrderDialogOpen}
          onClose={() => setOrderDialogOpen(false)}
          onApply={(newOrderBy) => {
          setOrderBy(newOrderBy);
          setCurrentPage(0); // Reset to first page
          loadEvents(0); // Reload data with new sorting
          }}
          initialOrder={orderBy}
          fields={orderFields}
      />
    </>
  );  
}
