import { useEffect, useState } from 'react';
import './style/MarcarPresenca.css';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import { FaTshirt } from 'react-icons/fa';
import { LuShirt } from 'react-icons/lu';
import { Pagination } from "@mui/material";
import { useParams } from 'react-router-dom';

import { Link } from 'react-router'

export function MarcarPresenca() {
    const { eventId } = useParams();

    const [event, setEvent] = useState({});

    const [pagedAssociates, setPagedAssociates] = useState([])

    const [pageN, setPageN] = useState(0);
    const [maxPages, setMaxPages] = useState(1);

    const [searchFiltering, setSearchFiltering] = useState('')

    const [presences, setPresences] = useState([])

    useEffect(() => {
        loadEvent(eventId);
        loadAssociates(pageN);
    }, [pageN, searchFiltering]);
    
    useEffect(() => {
        if (pagedAssociates.length > 0) {
            loadPresences(pagedAssociates);
        }
    }, [pagedAssociates]);

    const loadEvent = async (eventId) => {
        const url = `http://localhost:8081/api/v1/eventos/${eventId}`;
        try {
            const response = await fetch(url, { method: 'GET'});
            if (!response.ok) {
                throw new Error(`Failed to load associate data: ${response.statusText}`);
            }

            const data = await response.json();
            setEvent(data || {});
        } catch (error) {
            console.error('Error loading event:', error);
        }
    };
    
    const loadAssociates = async () => {
        const elementPerPage = 5
        
        const queryParams = new URLSearchParams();
        
        queryParams.append('busca', searchFiltering)
    
        queryParams.append('page', pageN);
        queryParams.append('size', elementPerPage);
        
        const url = `http://localhost:8081/api/v1/associados?${queryParams.toString()}`;
        
        try {
          const response = await fetch(url, { method: 'GET', mode: 'cors' });
          if (!response.ok) {
            throw new Error(`Failed to load data: ${response.statusText}`);
          }
          
          const data = await response.json();

          console.log(data)
    
          setPagedAssociates(data.content || []);
          setMaxPages(data.totalPages)
    
        } catch (error) {
          console.error('Error loading associates:', error);
        }

    }

    const loadPresences = async () => {

        const url = `http://localhost:8081/api/v1/presencas/evento/${eventId}`;

        var presencas = []
        var finalPresencas = []

        try {
            const response = await fetch(url, { method: 'GET'});
            if (!response.ok) {
                throw new Error(`Failed to load associate data: ${response.statusText}`);
            }
            
            const data = await response.json();
            presencas = data.content
            
        } catch (error) {
            console.error('Error loading event:', error);
        }
        
        for (var i in presencas){
            finalPresencas.push(presencas[i].associadoMatricula) 
        };
    
        setPresences(finalPresencas)
    }

    const postPresence = async (associateMatricula, colaborador, camisa, type) => {
        const url = `http://localhost:8081/api/v1/presencas`;
        const payload = {
            associadoMatricula: associateMatricula,
            eventoId: eventId,
            eventoNome: event.nome,
            colaborador: colaborador,
            camisa: camisa,
            data: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD
        };
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(payload),
            });
            if (!response.ok) throw new Error(`Failed to post presence: ${response.statusText}`);
            console.log(`Presence recorded for ${associateName} as ${type}`);
        } catch (error) {
            console.error('Error posting presence:', error);
        }
    };

    const handlePageChange = (value) => {
        if (value == -1) {
            if (pageN == 0){
                return
            }
        }
        setPageN(
            pageN + value
        );
    };

    const checkPresence = (associateMatricula) => {
        
        if (!associateMatricula){ return false }
        
        const url = `http://localhost:8081/api/v1/presencas/associado/${associateMatricula}/evento/${event.id}`
        try {
            const response =  fetch(url, { method: 'GET'});
            if (!response.ok) {
                throw new Error(`Failed to load associate data: ${response.statusText}`);
            }
            return response != 'falta';

        } catch (error) {
            console.error('Error loading event:', error);
        }
    }

    return (
        <>
            <div className='marcarpresencaPreviousPage'>
                <Link to='/homeadmin'><button id='marcarpresencaPreviousPageButton'><IoArrowBack /></button></Link>
            </div>
            <div className='marcarpresencaMainGrid'>
                <div className='marcarpresencaLeftSide'>
                    <div className='marcarpresencaEventInfo'>
                        <h3 className='marcarpresencaEventInfoTitle'>Nome:</h3>
                        <p className='marcarpresencaEventInfoContent'>{event.nome}</p>
                    </div>
                    <div className='marcarpresencaEventInfo'>
                        <h3 className='marcarpresencaEventInfoTitle'>Data:</h3>
                        <p className='marcarpresencaEventInfoContent'>{event.data}</p>
                    </div>
                    <div className='marcarpresencaEventInfo'>
                        <h3 className='marcarpresencaEventInfoTitle'>Local:</h3>
                        <p className='marcarpresencaEventInfoContent'>{event.local}</p>
                    </div>
                    <div className='marcarpresencaEventInfo'>
                        <h3 className='marcarpresencaEventInfoTitle'>Descrição:</h3>
                        <p className='marcarpresencaEventInfoContent'>{event.descricao}</p>
                    </div>
                </div>
                <div className='marcarpresencaRightSide'>
                    <h2>Associados:</h2>
                    <div class="marcarpresencaSearch">
                        <input type="text" id="name" placeholder="" value={searchFiltering || ''} onChange={(e) => setSearchFiltering(e.target.value)} />
                        <label for="name">Buscar associado</label>
                    </div>
                    <div className='marcarpresencaAssociates'>
                        {pagedAssociates.map((associate, index) => {

                        var camisa = false
                        var colaborador = false
                        const matricula = associate.matricula
                        
                        var present = presences.includes(associate.matricula);
            
                        return (
                            <Link to={'/associado/' + associate.matricula}><button className={`marcarpresencaAssociate ${present ? "Ativado" : ""}`} key={index}>
                                <h3>{associate.nome}</h3>
                                <p>Matricula: {associate.matricula}</p>
                                <div className='marcarpresencaButtons'>
                                    <button onClick={colaborador = !colaborador} className={`marcarpresencaColaborador ${colaborador ? "Ativado" : ""}`}>Colaborador</button>
                                    <button onClick={() => postPresence(associate.matricula, colaborador, true)}><LuShirt /> Sem Camisa</button>
                                    <button onClick={() => postPresence(associate.matricula, colaborador, true)}><FaTshirt /> Com Camisa</button>
                                </div>
                            </button></Link>
                        )})}
                        <div className='marcarpresencaPaging'>
                            <button onClick={() => handlePageChange(-1)}><IoArrowBack></IoArrowBack></button>
                            <button onClick={() => handlePageChange(1)}><IoArrowForward></IoArrowForward></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
