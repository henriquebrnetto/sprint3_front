import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './style/Associado.css';
import { IoArrowBack } from 'react-icons/io5';
import Calendar from 'react-calendar';

export function Associado() {
    const { associateRegistration } = useParams();
    const [associate, setAssociate] = useState([]);
    const [calendarEvents, setCalendarEvents] = useState([]);
    const [presenceData, setPresenceData] = useState([]); // Initialize as empty array
    const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog visibility state

    useEffect(() => {
        loadAssociate();
    }, []);

    const loadAssociate = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/v1/associados/${associateRegistration}`);
            if (!response.ok) {
                throw new Error(`Failed to load associate data: ${response.statusText}`);
            }
            const data = await response.json();
            setAssociate(data); // Assume data is a single object
            loadPresenceData(data.matricula); // Fetch presence data using the user's matricula
        } catch (error) {
            console.error('Error loading associate data:', error);
        }
    };

    const loadPresenceData = async (matricula) => {
        try {
            const response = await fetch(`http://localhost:8081/api/v1/presencas/associado/${matricula}`);
            if (!response.ok) {
                throw new Error(`Failed to load presence data: ${response.statusText}`);
            }
            const data = await response.json();
            setPresenceData(Array.isArray(data) ? data : []); // Ensure data is an array
            setCalendarEvents(Array.isArray(data) ? data : []); // Set events for the calendar
        } catch (error) {
            console.error('Error loading presence data:', error);
            setPresenceData([]); // Fallback to an empty array on error
        }
    };

    const tileClassName = ({ date }) => {
        const event = calendarEvents.find((event) =>
            new Date(event.date).toDateString() === date.toDateString()
        );
        if (!event) return null;
        if (event.status === 'missed') return 'tile-red';
        if (event.status === 'present') return 'tile-green';
        if (event.status === 'future') return 'tile-blue';
    };

    const toggleDialog = () => {
        setIsDialogOpen(!isDialogOpen);
    };

    return (
        <div className='associadoMainGrid'>
            <div className='associadoPreviousPage'>
                <button id='associadoPreviousPageButton'><IoArrowBack /></button>
            </div>
            <div className='associadoTopSection'>
                <div className='associadoInfo'>
                    {associate ? (
                        <>
                            <h2>{associate.nome}</h2>
                            <p>Matrícula: {associate.matricula}</p>
                            <p>Pontuação: {associate.pontos}</p>
                        </>
                    ) : (
                        <p>Carregando dados...</p>
                    )}
                </div>
                <div className='associadoImage'>
                    <img src='/images/defaultProfile.png' alt='Associado' className='profileImage' />
                    <button className='moreInfoButton' onClick={toggleDialog}>
                        Mais Informações
                    </button>
                </div>
            </div>
            <div className='associadoBottomSection'>
                <div className='calendar-events-container'>
                    <div className='associadoEvents'>
                        <h3>Eventos:</h3>
                        {presenceData.length > 0 ? (
                            presenceData.map((event, index) => (
                                <button key={index}>
                                    <span>{event.name}</span>
                                    <span>{event.date}</span>
                                    <span>{event.status}</span>
                                </button>
                            ))
                        ) : (
                            <p>Nenhum evento encontrado.</p>
                        )}
                    </div>
                    <div className='calendar'>
                        <Calendar tileClassName={tileClassName} />
                        <div className='calendar-legend'>
                            <span>
                                <div style={{ backgroundColor: '#ffcccc' }}></div>
                                Não Presente
                            </span>
                            <span>
                                <div style={{ backgroundColor: '#ccffcc' }}></div>
                                Presente
                            </span>
                            <span>
                                <div style={{ backgroundColor: '#cce5ff' }}></div>
                                Próximos Eventos
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Dialog Box */}
            {isDialogOpen && (
                <div className='dialogOverlay'>
                    <div className='dialogBox'>
                        <h2>Mais Informações</h2>
                        <p>Endereço: Rua Fictícia, 123</p>
                        <p>Telefone: (11) 1234-5678</p>
                        <p>Email: usuario@exemplo.com</p>
                        <button className='closeButton' onClick={toggleDialog}>
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}