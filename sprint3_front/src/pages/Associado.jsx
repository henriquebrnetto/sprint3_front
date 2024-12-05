import { useEffect, useState } from 'react';

import './style/Evento.css';
import { IoArrowBack } from 'react-icons/io5';
import { FaFilter, FaSortAmountDown, FaSearch, FaTrash, FaPencilAlt, FaCalendar, FaTshirt } from 'react-icons/fa';
import { LuShirt } from "react-icons/lu";
import { GrClose } from "react-icons/gr";
import { Autocomplete, Pagination, TextField } from "@mui/material";

import {useParams} from 'react-router-dom';


export function Associado() {
    
    const {associateRegistration} = useParams();

    const [associate, setAssociate] = useState([]);
    const [pagedAssociateEvents, setPagedAssociateEvents] = useState([]);
    const [associateEvents, setAssociateEvents] = useState([]);

    const [maxPages, setMaxPages] = useState(1);
    const [pageN, setPageN] = useState(0);

    useEffect(() => {
        loadPagedAssociateEvents();
        loadMaxPages();
        loadAssociateEvents();
        loadAssociate();
    }, [])

    // funcoes para definir constantes acima
    
    function loadAssociateEvents(associateRegistration) {
        // fetch(<>localhost:8081/api/v1/eventos/{event.id}</>)
        //     .then(response => response.json())
        //     .then(data => setEvents(data))
        //     .catch(error => console.error('Erro ao carregar eventos:', error));
        const data = [{
            'nome': 'Coisa boa da silva',
            'data': '23/04/2025',
            'matricula': '98369420',
        }];

        setAssociateEvents(data)
    }
    
    function loadPagedAssociateEvents(pageN, associateRegistration) {
        // fetch(<>'localhost:8081/api/v1/eventos/{event.id}?page={pageN}&size=6'</>)
        //     .then(response => response.json())
        //     .then(data => setPagedPresences(data))
        //     .catch(error => console.error('Erro ao carregar eventos ativos:', error));\
        const data = [{ 
            'nome': 'Coisa boa da silva',
            'data': '23/04/2025',
            'id': '98369420',
            'camisa': false,
        }];

        setPagedAssociateEvents(data)
    }

    function loadAssociate(associateRegistration) {
        // fetch(<>'localhost:8081/api/v1/presenca/evento/{event.id}'</>)
        //     .then(response => response.json())
        //     .then(data => setPagedPresences(data))
        //     .catch(error => console.error('Erro ao carregar eventos ativos:', error));\
        const data = [{ 
            'nome': 'Coisa boa da silva',
            'data': '23/04/2025',
            'id': '98369420',
        }];

        setAssociate(data)
    }

    // -------

    function loadMaxPages() {
        setMaxPages(1)
    }

    const [selectedValue, setSelectedValue] = useState(null);

    // lidar com buscas e mudanca de paginacao

    const handleSearch = (options, { inputValue }) => {
        return options.filter(
        (option) =>
            option.associadoNome.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const handlePageChange = (event, value) => {
        setPageN(value - 1);
    };

    // -------

    return (
        <>
            <div className='associadoMainGrid'>
                <div className='associadoPreviousPage'>
                    <button  id='associadoPreviousPageButton'><IoArrowBack></IoArrowBack></button>
                </div>
                <div className='associadoTopSection'>
                    <div className='associadoInfo'>
                        <div className='associadoInfoName'>
                            <h3 id='associadoInfoNameTitle'>Nome: </h3>
                            <p id='associadoInfoNameTitle'>Nome: </p>
                        </div>
                    </div>
                    <div className='associadoInfoButton'>

                    </div>
                    <div className='associadoImage'>

                    </div>
                </div>
                <div className='associadoBottomSection'>
                    <div className='associadoEvents'>
                        <div className='associadoEventsSearchBar'>

                        </div>
                    </div>
                    <div className='associadoCalendar'>

                    </div>
                </div>
            </div>
        </>
    );  
}