import { useEffect, useState } from 'react';

import './style/HomeAdmin.css';
import { FaUserPlus } from 'react-icons/fa';

export function HomeAdmin() {

    const [activeEvents, setActiveEvents] = useState([]);

    useEffect(() => {
        loadActiveEvents();
    }, [])

    function loadActiveEvents() {
        // fetch('localhost:8081/eventos/ativos')
        //     .then(response => response.json())
        //     .then(data => setActiveEvents(data))
        //     .catch(error => console.error('Erro ao carregar eventos ativos:', error));
        const data = [{
            'nome': 'Coisa boa da silva',
            'data': '23/04/2025'
        }];

        setActiveEvents(data)
    }

    return (
        <>
            <div className='homeAdminmainGrid'>
                <h1>Home</h1>
                <div className='homeAdminbuttons'>
                    <button id='homeAdminass' className='homeAdminbotaoRed'>Associados</button>
                    <button id='homeAdmineve' className='homeAdminbotaoRed'>Eventos</button>
                    <button id='homeAdminrel' className='homeAdminbotaoRed'>Relatorios</button>
                </div>
                <h2>Eventos ativos</h2>
                <div className='homeAdminevents'>
                    {activeEvents.map(activeEvent => (
                        <div className='homeAdminevent'>
                            <h3 id='homeAdmineventInfo' >{activeEvent.nome} - {activeEvent.data}</h3>
                            <button id='homeAdmineventButtonDesktop'><FaUserPlus></FaUserPlus>&nbsp;&nbsp;&nbsp; Adicionar Presenca</button>
                            <button id='homeAdmineventButtonMobile'><FaUserPlus></FaUserPlus></button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );  
}

