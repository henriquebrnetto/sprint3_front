import { useEffect, useState } from 'react';

import './style/HomeAdmin.css';
import { FaUserPlus } from 'react-icons/fa';

import { Link } from "react-router";

export function HomeAdmin() {

    const [activeEvents, setActiveEvents] = useState([]);

    useEffect(() => {
        loadActiveEvents();
    }, [])

    const loadActiveEvents = async () => {

        const url = `http://localhost:8081/api/v1/eventos/ativos`;
    
        try {
          const response = await fetch(url, { method: 'GET', mode: 'cors' });
          if (!response.ok) {
            throw new Error(`Failed to load data: ${response.statusText}`);
          }
          
          const data = await response.json();
    
          setActiveEvents(data.content || [])
    
        } catch (error) {
          console.error('Error loading associates:', error);
        }
      };

    return (
        <>
            <div className='homeAdminmainGrid'>
                <h1>Home</h1>
                <div className='homeAdminbuttons'>
                    <Link to='/associados'><button id='homeAdminass' className='homeAdminbotaoRed'>Associados</button></Link>
                    <Link to='/eventos'><button id='homeAdmineve' className='homeAdminbotaoRed'>Eventos</button></Link>
                    {/* <Link to='/associados'><button id='homeAdminrel' className='homeAdminbotaoRed'>Relatorios</button></Link> */}
                </div>
                <h2>Eventos ativos</h2>
                <div className='homeAdminevents'>
                    {activeEvents.map((activeEvent, index) => (
                        <div className='homeAdminevent' key={index}>
                            <h3 id='homeAdmineventInfo' >{activeEvent.nome} - {activeEvent.data}</h3>
                            <Link to={'/marcarpresenca/' + activeEvent.id}><button id='homeAdmineventButtonDesktop'><FaUserPlus></FaUserPlus>&nbsp;&nbsp;&nbsp; Adicionar Presenca</button></Link>
                            <Link to={'/marcarpresenca/' + activeEvent.id}><button id='homeAdmineventButtonMobile'><FaUserPlus></FaUserPlus></button></Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );  
}

