import { useEffect, useState } from 'react';

import './style/Eventos.css';
import { IoArrowBack } from 'react-icons/io5';
import { FaFilter, FaSortAmountDown, FaSearch, FaTrash, FaPencilAlt, FaCalendar  } from 'react-icons/fa';
import { Autocomplete, Pagination, TextField } from "@mui/material";

export function Eventos() {

    const [events, setEvents] = useState([]);
    const [maxPages, setMaxPages] = useState(1);
    const [pageN, setPageN] = useState(0);
    const [pagedEvents, setPagedEvents] = useState([]);

    useEffect(() => {
        loadEvents();
        loadMaxPages();
        loadPagedEvents();
    }, [])

    function loadPagedEvents(pageN) {
        // fetch('localhost:8081/associados?idadeMinima=null&idadeMaxima=null&casado=null&sexo=null&filhosMinimo=null&filhosMaximo=null&status=null&page={pageN}&size=10&sortBy=nome&sortDirection=asc')
        //     .then(response => response.json())
        //     .then(data => setActiveEvents(data))
        //     .catch(error => console.error('Erro ao carregar eventos ativos:', error));
        const data = [{
            'nome': 'Coisa boa da silva',
            'data': '23/04/2025',
            'id': '98369420',
        }];

        setPagedEvents(data)
    }

    function loadEvents() {
        // fetch('urlback')
        //     .then(response => response.json())
        //     .then(data => setEvents(data))
        //     .catch(error => console.error('Erro ao carregar eventos:', error));
        const data = [{
            'nome': 'Coisa boa da silva',
            'data': '23/04/2025',
            'matricula': '98369420',
        }];

        setEvents(data)
    }

    function loadMaxPages() {
        setMaxPages(1)
    }

    const [selectedValue, setSelectedValue] = useState(null);

    const handleSearch = (options, { inputValue }) => {
        return options.filter(
        (option) =>
            option.nome.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const handlePageChange = (event, value) => {
        setPageN(value - 1);
    };

    return (
        <>
            <div className='eventosMainGrid'>
                <div className='eventosPreviousPage'>
                    <button  id='eventosPreviousPageButton'><IoArrowBack></IoArrowBack></button>
                </div>
                <div className='eventosTopSection'>
                    <button className='eventosFilter'><FaFilter></FaFilter></button>
                    <Autocomplete
                        autoHighlight={true}
                        clearIcon={true}
                        className='eventosSearchBar'
                        options={events}
                        freeSolo
                        getOptionLabel={(option) => option.nome}
                        filterOptions={handleSearch}
                        onChange={(event, newValue) => setSelectedValue(newValue)}
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
                    <button className='eventosCalendar'><FaCalendar></FaCalendar></button>
                    <button className='eventosOrderby'><FaSortAmountDown></FaSortAmountDown></button>
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
        </>
    );  
}
