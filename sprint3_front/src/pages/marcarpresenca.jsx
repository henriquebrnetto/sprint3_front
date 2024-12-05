import { useEffect, useState } from 'react';
import './style/MarcarPresenca.css';
import { IoArrowBack } from 'react-icons/io5';
import { FaTshirt } from 'react-icons/fa';
import { LuShirt } from 'react-icons/lu';
import { Pagination } from "@mui/material";
import { useParams } from 'react-router-dom';

import { Link } from 'react-router'

export function MarcarPresenca() {
    const { eventId } = useParams();

    const [event, setEvent] = useState({});
    const [pagedAssociates, setPagedAssociates] = useState([]);
    const [maxPages, setMaxPages] = useState(1);
    const [pageN, setPageN] = useState(0);
    const elementsPerPage = 4;

    useEffect(() => {
        loadEvent(eventId);
        loadAssociates(pageN);
    }, [pageN]); // Reload associates when page number changes

    const loadEvent = async (eventId) => {
        const url = `http://localhost:8081/api/v1/eventos/${eventId}`;
        try {
            const response = await fetch(url, { method: 'GET', mode: 'cors' });
            if (!response.ok) throw new Error(`Failed to load event: ${response.statusText}`);
            const data = await response.json();
            setEvent(data || {});
        } catch (error) {
            console.error('Error loading event:', error);
        }
    };

    const loadAssociates = async (page) => {
        const queryParams = new URLSearchParams({ page, size: elementsPerPage });
        const url = `http://localhost:8081/api/v1/associados?${queryParams.toString()}`;
        try {
            const response = await fetch(url, { method: 'GET', mode: 'cors' });
            if (!response.ok) throw new Error(`Failed to load associates: ${response.statusText}`);
            const data = await response.json();
            setPagedAssociates(data.content || []);
            setMaxPages(data.totalPages || 1);
        } catch (error) {
            console.error('Error loading associates:', error);
        }
    };

    const postPresence = async (associateId, associateName, type) => {
        const url = `http://localhost:8081/api/v1/presencas`;
        const payload = {
            associadoMatricula: associateId,
            associadoNome: associateName,
            eventoId: eventId,
            eventoNome: event.nome,
            colaborador: type === 'colaborador',
            camisa: type === 'comCamisa',
            data: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD
        };
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                mode: 'cors',
            });
            if (!response.ok) throw new Error(`Failed to post presence: ${response.statusText}`);
            console.log(`Presence recorded for ${associateName} as ${type}`);
        } catch (error) {
            console.error('Error posting presence:', error);
        }
    };

    const handlePageChange = (event, value) => {
        setPageN(value - 1);
    };

    return (
        <>
            <div className='associadosPreviousPage'>
                <Link to='/homeadmin'><button id='associadosPreviousPageButton'><IoArrowBack /></button></Link>
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
                    <div className='marcarpresencaAssociates'>
                        {pagedAssociates.map((associate, index) => (
                            <div className='marcarpresencaAssociate' key={index}>
                                <h3>{associate.nome}</h3>
                                <p>Matricula: {associate.matricula}</p>
                                <div className='marcarpresencaShirtButtons'>
                                    <button onClick={() => postPresence(associate.matricula, associate.nome, 'colaborador')}>Colaborador</button>
                                    <button onClick={() => postPresence(associate.matricula, associate.nome, 'comCamisa')}><FaTshirt /> Com Camisa</button>
                                    <button onClick={() => postPresence(associate.matricula, associate.nome, 'semCamisa')}><LuShirt /> Sem Camisa</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {maxPages > 1 && (
                        <Pagination
                            count={maxPages}
                            page={pageN + 1}
                            onChange={handlePageChange}
                            className='eventosNavBar'
                            sx={{ justifyContent: "center", alignItems: "center", display: "flex", marginTop: "15px" }}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
