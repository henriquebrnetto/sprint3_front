import { useEffect, useState } from 'react';

import './style/Evento.css';
import { IoArrowBack } from 'react-icons/io5';
import { FaFilter, FaSortAmountDown, FaSearch, FaTrash, FaPencilAlt, FaCalendar, FaTshirt } from 'react-icons/fa';
import { LuShirt } from "react-icons/lu";
import { GrClose } from "react-icons/gr";
import { Autocomplete, Pagination, TextField } from "@mui/material";

import {useParams} from 'react-router-dom';

export function Evento() {

    const {eventId} = useParams();

    const [event, setEvent] = useState([]);
    const [pagedPresences, setPagedPresences] = useState([]);
    const [allPresences, setAllPresences] = useState([]);
    
    const [maxPages, setMaxPages] = useState(1);
    const [pageN, setPageN] = useState(0);

    useEffect(() => {
        loadEvent(eventId);
        loadPresences(eventId);
    }, [])

    const loadPresences = async (eventId) => {
        const elementPerPage = 10
    
        const urlAll = `http://localhost:8081/api/v1/presencas/evento/${eventId}`;
    
        queryParams.append('page', currentPage);
        queryParams.append('size', elementPerPage);
        
        const url = `http://localhost:8081/api/v1/presencas/evento/${eventId}?${queryParams.toString()}`;
        
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
    
          setPresences(dataAll.content || [])
          setPagedPresences(data.content || []);
          setMaxPages(data.totalPages)
    
        } catch (error) {
          console.error('Error loading associates:', error);
        }
    
    }; 

    function loadEvent(eventId) {
        // fetch(<>localhost:8081/api/v1/eventos/{event.id}</>)
        //     .then(response => response.json())
        //     .then(data => setEvents(data))
        //     .catch(error => console.error('Erro ao carregar eventos:', error));
        const data = [{
            'nome': 'Coisa boa da silva',
            'data': '23/04/2025',
            'matricula': '98369420',
        }];

        setEvent(data)
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
            <div className='eventoMainGrid'>
                <div className='eventoPreviousPage'>
                    <button  id='eventoPreviousPageButton'><IoArrowBack></IoArrowBack></button>
                </div>
                <div className='eventoInfoSearch'>
                    <div className='eventoEventInfo'>
                        <div className='eventoEventName'>
                            <h2>Nome:</h2>
                            <p>{event.nome}</p>
                        </div>
                        <div className='eventoEventDateTime'>
                            <h2>Data e hora:</h2>
                            <p>{event.data}</p>
                        </div>
                        <div className='eventoEventLocation'>
                            <h2>Local:</h2>
                            <p>{event.local}</p>
                        </div>
                    </div>
                    <div className='eventoAssociateSearch'>
                        <Autocomplete
                            autoHighlight={true}
                            className='eventoSearchBar'
                            options={allPresences} // ver com o back
                            freeSolo
                            getOptionLabel={(option) => option.associadoNome}
                            filterOptions={handleSearch}
                            onChange={(event, newValue) => setSelectedValue(newValue)}
                            renderInput={(params) => (
                                <TextField {...params} variant="outlined"

                                    label={
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <FaSearch /> Buscar associado no evento:
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
                    </div>
                </div>
                <h2 className='eventoAssociatesTitle'>Associados presentes no evento:</h2>
                <div className='eventoAssociates'>
                    {pagedPresences.map((presence, index) => (
                        <div className='eventAssociate' key={index}>
                            <button className='eventoAssociateBox'>
                                <h3 id='eventName'>{presence.nome}</h3>
                                {presence.camisa ? (
                                    <FaTshirt id='eventAssociateWithShirt'></FaTshirt>
                                ):(
                                    <LuShirt id='eventAssociateNoShirt'></LuShirt>
                                )}
                            </button>
                            <button className='eventosDeleteButton'><GrClose></GrClose></button>
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