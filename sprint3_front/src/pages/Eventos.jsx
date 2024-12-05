import { useEffect, useState } from 'react';

import './style/Eventos.css';
import { IoArrowBack } from 'react-icons/io5';
import { FaFilter, FaSortAmountDown, FaSearch, FaTrash, FaPencilAlt, FaCalendar  } from 'react-icons/fa';
import { Autocomplete, Pagination, TextField } from "@mui/material";
import OrderDialog from './OrderDialog';
import DateFilterDialog from './DateFilterDialog';

export function Eventos() {

  const [events, setEvents] = useState([]);
  const [pagedEvents, setPagedEvents] = useState([]);
  const [orderBy, setOrderBy] = useState({ field: 'nome', direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [isOrderDialogOpen, setOrderDialogOpen] = useState(false);
  const [filters, setFilters] = useState({ startDate: '', endDate: '', status: 'Todos' });
  const [isDateDialogOpen, setDateDialogOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [maxPages, setMaxPages] = useState(1);

  const orderFields = [ { name: 'data', label: 'Data' } ];

  useEffect(() => {
    // Trigger the API request whenever filters, orderBy, or currentPage changes
    loadEvents();
  }, [filters, orderBy, currentPage]);

  const applyDateFilter = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(0); // Reset to the first page
  };
 

  const loadEvents = async () => {
    const elementPerPage = 10;
    const queryParams = new URLSearchParams();
  
    // Conditionally add date filters if they are not empty
    if (filters.startDate) {
      queryParams.append('dataInicio', filters.startDate);  // Already in 'yyyy-MM-dd' format
    }
    if (filters.endDate) {
      queryParams.append('dataFim', filters.endDate);  // Already in 'yyyy-MM-dd' format
    }
  
    // Map status: Only add 'status' if it's 'Ativos' or 'Inativos'
    if (filters.status === 'Ativos') {
      queryParams.append('status', true);
    } else if (filters.status === 'Inativos') {
      queryParams.append('status', false);
    }
    // 'Todos' status is ignored (default to no filter)
  
    queryParams.append('sortBy', orderBy.field || 'nome');
    queryParams.append('sortDirection', orderBy.direction || 'asc');
    queryParams.append('page', currentPage);
    queryParams.append('size', elementPerPage);
  
    const url = `http://localhost:8081/api/v1/eventos?${queryParams.toString()}`;
    console.log(url)

    try {
      const response = await fetch(url, { method: 'GET', mode: 'cors' });
      if (!response.ok) {
        throw new Error(`Failed to load data: ${response.statusText}`);
      }
  
      const data = await response.json();
      setPagedEvents(data.content || []);
      setMaxPages(data.totalPages);
    } catch (error) {
      console.error('Error loading events:', error);
    }
  };  
  
return (
  <>
    <div className='mainGrid'>

      <div className='previousPage'>
          <button id='previousPageButton'><IoArrowBack /></button>
      </div>

      <div className='topSection'>

        <button className='eventosCalendar' onClick={() => setDateDialogOpen(true)}>
          <FaCalendar />
        </button>

        <Autocomplete
            className='searchBar'
            options={pagedEvents}
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
                      <FaSearch /> Buscar evento
                  </span>
                  }
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
                    <button className='eventosEventBox'>
                        <h3 id='eventName'>{event.nome}</h3>
                    </button>
                    <button className='eventosEditButton'><FaPencilAlt></FaPencilAlt></button>
                    <button className='eventosDeleteButton'><FaTrash></FaTrash></button>
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
