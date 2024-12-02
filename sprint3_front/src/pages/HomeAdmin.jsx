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
            <div className='mainGrid'>
                <h1>Home</h1>
                <i class='fas fa-user-plus'></i>
                <div className='buttons'>
                    <button id='ass' className='botaoRed'>Associados</button>
                    <button id='eve' className='botaoRed'>Eventos</button>
                    <button id='rel' className='botaoRed'>Relatorios</button>
                </div>
                <h2>Eventos ativos</h2>
                <div className='events'>
                    {activeEvents.map(activeEvent => (
                        <div className='event'>
                            <h3 id='eventInfo' >{activeEvent.nome} - {activeEvent.data}</h3>
                            <button id='eventButtonDesktop'><FaUserPlus></FaUserPlus>&nbsp;&nbsp;&nbsp; Adicionar Presenca</button>
                            <button id='eventButtonMobile'><FaUserPlus></FaUserPlus></button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );  
}

