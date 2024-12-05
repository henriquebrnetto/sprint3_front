import { useEffect, useState } from 'react';

import './style/MarcarPresenca.css';
import { IoArrowBack } from 'react-icons/io5';
import { FaFilter, FaSortAmountDown, FaSearch, FaTrash, FaPencilAlt, FaCalendar, FaTshirt } from 'react-icons/fa';
import { LuShirt } from "react-icons/lu";
import { GrClose } from "react-icons/gr";
import { Autocomplete, Pagination, TextField } from "@mui/material";

import {useParams} from 'react-router-dom';

export function MarcarPresenca() {

    const {eventId} = useParams();

    const [event, setEvent] = useState([]);

    const [pagedAssociates, setPagedAssociates] = useState([]);
    const [allAssociates, setAllAssociates] = useState([]);
    
    const [maxPages, setMaxPages] = useState(1);
    const [pageN, setPageN] = useState(0);

    const [nameFiltering, setNameFiltering] = useState(null)
    const [registrationFiltering, setRegistrationFiltering] = useState(null)

    useEffect(() => {
        loadEvent(eventId);

        loadPagedAssociates(pageN, eventId, nameFiltering, registrationFiltering);
        loadAllAssociates(eventId, nameFiltering, registrationFiltering);
        
        loadMaxPages(eventId, nameFiltering, registrationFiltering);
    }, [])

    function loadPagedAssociates(pageN, eventId, name, reg) {
        // fetch(<>'localhost:8081/api/v1/presenca/evento/{eventId}?page={pageN}&size=6'</>)
        //     .then(response => response.json())
        //     .then(data => setPagedAssociates(data))
        //     .catch(error => console.error('Erro ao carregar eventos ativos:', error));\
        const data = [{ 
            'nome': 'Coisa boa da silva',
            'data': '23/04/2025',
            'id': '98369420',
            'camisa': false,
        }];

        setPagedAssociates(data)
    }

    function loadAllAssociates(eventId, name, reg) {
        // fetch(<>'localhost:8081/api/v1/presenca/evento/{eventId}'</>)
        //     .then(response => response.json())
        //     .then(data => setPagedAssociates(data))
        //     .catch(error => console.error('Erro ao carregar eventos ativos:', error));\
        const data = [{ 
            'nome': 'Coisa boa da silva',
            'data': '23/04/2025',
            'matricula': '98369420',
        }];

        setAllAssociates(data)
    }

    function loadEvent(eventId) {
        // fetch(<>localhost:8081/api/v1/eventos/{event.id}</>)
        //     .then(response => response.json())
        //     .then(data => setEvents(data))
        //     .catch(error => console.error('Erro ao carregar eventos:', error));
        const data = {
            'nome': 'Coisa boa da silva',
            'data': '23/04/2025',
            'matricula': '98369420',
        };

        setEvent(data)
    }

    function loadMaxPages() {
        setMaxPages(1)
    }

    // -----

    function checkShirt(associateId) {
        var response = 'falta'
    
        // fetch('localhost:8081/api/v1/presencas/associado/${associateId}/evento/${event.id}')
        //     .then(response => response.json())
        //     .then(data => response = data)
        //     .catch(error => console.error('Erro ao carregar eventos:', error));

        return response
    }

    const handleSearch = (options, { inputValue }) => {
        var nameFilter = options.filter(
        (option) =>
            option.nome.toLowerCase().includes(inputValue.toLowerCase())
        );

        if (nameFilter.length > 0){
            setNameFiltering(inputValue)
        } else {
            setNameFiltering(null)
        }

        var registrationFilter = options.filter(
        (option) =>
            String(option.matricula).includes(inputValue)
        );

        if (registrationFilterFilter.length > 0){
            setRegistrationFiltering(inputValue)
        } else {
            setRegistrationFiltering(null)
        }

        var nameRegistrationFilter = options.filter(
        (option) =>
            String(option.matricula).includes(inputValue) || 
                option.nome.toLowerCase().includes(inputValue.toLowerCase())
        );

        return nameRegistrationFilter
    };

    const handlePageChange = (event, value) => {
        setPageN(value - 1);
    };

    const handleButton = (identifier) => {
        if (identifier == 'colaborador'){

        }
        if (identifier == 'camisa'){

        }
        if (identifier == 'semCamisa'){

        }

    }

    // -----

    return (
        <>
            <div className='marcarpresencaMainGrid'>
                <div className='marcarpresencaPreviousPage'>
                    <button  id='marcarpresencaPreviousPageButton'><IoArrowBack></IoArrowBack></button>
                </div>
            <div className='marcarpresencaLeftSide'>
                <div className='marcarpresencaSearch'>
                    <Autocomplete
                        className='AssociadossearchBar'
                        options={allAssociates}
                        freeSolo
                        getOptionLabel={(option) => option.nome}
                        filterOptions={handleSearch}
                        onChange={(event, newValue) => setSelectedValue(newValue)}
                        renderInput={(params) => (
                            <TextField {...params} variant="outlined"

                                label={
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <FaSearch /> Buscar associado
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
                    <div className='marcarpresencaEventInfo'>
                        <div className='marcarpresencaEventName'>
                            <h3 id='marcarpresencaEventNameTitle'>Nome:</h3>
                            <p id='marcarpresencaEventNameContent'>{event.nome}</p>
                        </div>
                        <div className='marcarpresencaEventDate'>
                            <h3 id='marcarpresencaEventDateTitle'>Data:</h3>
                            <p id='marcarpresencaEventDateContent'>{event.data}</p>
                        </div>
                        <div className='marcarpresencaEventLocation'>
                            <h3 id='marcarpresencaEventLocationTitle'>Local:</h3>
                            <p id='marcarpresencaEventLocationContent'>{event.local}</p>
                        </div>
                        <div className='marcarpresencaEventDescription'>
                            <h3 id='marcarpresencaEventDescriptionTitle'>Descricao:</h3>
                            <p id='marcarpresencaEventDescriptionContent'>{event.descricao}</p>
                        </div>
                    </div>
                </div>
                <div className='marcarpresencaRightSide'>
                    <div className='marcarpresencaTitle'>
                        <h2>Associados:</h2>
                    </div>
                    <div className='marcarpresencaAssociates'>
                        {pagedAssociates.map((associate, index) => (
                            <button className={'marcarpresencaAssociate'} key={index} name={checkShirt(associate.id)}>
                                <h3 id='marcarpresencaAssociateName'>{associate.nome}</h3>
                                <div className='marcarpresencaShirtButtons'>
                                    <button id={'marcarpresencaColaboratorButton'} disabled={checkShirt(associate.id) != 'falta'} name={checkShirt(associate.id)} onClick={() => handleButton('colaborador')}>Colaborador</button>
                                    <button id={'marcarpresencaShirtOnButton'} disabled={checkShirt(associate.id) != 'falta'} name={checkShirt(associate.id)} onClick={() => handleButton('camisa')}><FaTshirt></FaTshirt></button>
                                    <button id={'marcarpresencaShirtOffButton'} disabled={checkShirt(associate.id) != 'falta'} name={checkShirt(associate.id)} onClick={() => handleButton('semCamisa')}><LuShirt></LuShirt></button>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );  
}