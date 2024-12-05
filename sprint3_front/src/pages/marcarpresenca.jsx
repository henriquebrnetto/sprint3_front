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

        loadAssociates();
    }, [])

    const loadAssociates = async () => {
        const elementPerPage = 10
    
        const queryParams = new URLSearchParams();
    
        queryParams.append('nome', nameFiltering)
        queryParams.append('matricula', registrationFiltering)
    
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

    const loadEvent = async (eventId) => {

        const url = `http://localhost:8081/api/v1/eventos/${eventId}`

        try {
            const response = await fetch(url, { method: 'GET', mode: 'cors' });
            if (!response.ok) {
              throw new Error(`Failed to load data: ${response.statusText}`);
            }
            
            const data = await response.json();
        
            setEvent(data.content || {})
      
          } catch (error) {
            console.error('Error loading associates:', error);
        }
    }

    function getDate() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        
        var strmais = ''

        if (date < 10){
            strmais = '0'
        }
        return `${year}-${month}-${strmais}${date}`;
    }

    const postPresence = async (eventId, eventName, associateId, associateName, type) => {

        const url = `http://localhost:8081/api/v1/presencas`

        var colab = type == 'colaborador'
        var shirt = type == 'comCamisa'        

        try {
            const response = await fetch(url, {
                method: 'POST',
                mode: 'cors',
                body: {
                    'associadoId': associateId,
                    'associadoNome': associateName,
                    'eventoId': eventId,
                    'eventoNome': eventName,
                    'colaborador': colab,
                    'camisa': shirt,
                    'data': getDate()
                }
            });

            if (!response.ok) {
              throw new Error(`Failed to post data: ${response.statusText}`);
            }
            
            const data = await response.json();
        
            setEvent(data.content || {})
      
          } catch (error) {
            console.error('Error loading associates:', error);
        }
    }



    // -----

    const checkShirt = async (associateId, eventId) => {

        const url = `http://localhost:8081/api/v1/presencas/associado/${associateId}/evento/${eventId}`

        try {
            const response = await fetch(url, { method: 'GET', mode: 'cors' });
            if (!response.ok) {
              throw new Error(`Failed to load data: ${response.statusText}`);
            }
            
            const data = await response.json();
        
            return data.content
      
        } catch (error) {
            console.error('Error loading associates:', error);
        }

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

        if (registrationFilter.length > 0){
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
                        getOptionLabel={(option) => option.nome || ''}
                        startdecorator={<FaSearch></FaSearch>}
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
                                    <button id={'marcarpresencaColaboratorButton'} disabled={checkShirt(associate.id) != 'falta'} name={checkShirt(associate.id)} onClick={() => postPresence(eventId, event.name, associate.id, associate.name, 'colaborador')}>Colaborador</button>
                                    <button id={'marcarpresencaShirtOnButton'} disabled={checkShirt(associate.id) != 'falta'} name={checkShirt(associate.id)} onClick={() => postPresence(eventId, event.name, associate.id, associate.name, 'camisa')}><FaTshirt></FaTshirt></button>
                                    <button id={'marcarpresencaShirtOffButton'} disabled={checkShirt(associate.id) != 'falta'} name={checkShirt(associate.id)} onClick={() => postPresence(eventId, event.name, associate.id, associate.name, 'semCamisa')}><LuShirt></LuShirt></button>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );  
}