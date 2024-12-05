import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import { Box, Toolbar, Typography, Tooltip, IconButton, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import mst from './assets/mst.jpg';

import { HomeAdmin } from './pages/HomeAdmin'
import { Associados } from './pages/Associados'
import { Eventos } from './pages/Eventos'
import { Evento } from './pages/Evento'
import { Associado } from './pages/Associado'
import { AssociadoCadastroEdicao } from './pages/AssociadoCadastroEdicao'
import { EventoCadastroEdicao } from './pages/EventoCadastroEdicao'
import { MarcarPresenca } from './pages/marcarpresenca.jsx'

import { HashRouter, Link, Route, Routes } from 'react-router-dom'

import './App.css'
import { Login } from './pages/login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulação do estado de login
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#A71220", marginBottom: "50px" }} >
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img className="logoMST" src={mst} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                fontSize: { xs: '0.75rem', sm: '1.25rem', md: '1.75rem' }, // Tamanhos responsivos para o texto
                textAlign: 'center',
              }}
            >
              Movimento Sem Teto UNAS Heliópolis
            </Typography>
          </Box>

          {/* Ícone de Logout, visível somente quando o usuário está logado */}
          {isLoggedIn && (
            <Link to={'/'}>
              <Box sx={{ flexGrow: 0, mr: { xs: 1, sm: 2, md: 5 } }}>
                <Tooltip title="Logout">
                  <IconButton color="inherit">
                    <LogoutIcon sx={{ fontSize: { xs: '1rem', sm: '1.5rem', md: '1.75rem' } }} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Link>
            
          )}
        </Toolbar>
      </AppBar>
      
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path="/homeadmin" element={<HomeAdmin/>}/>
        
        <Route path='/eventos' element={<Eventos/>}/>
        <Route path='/evento/:eventId' element={<Evento/>}/>
        <Route path='/eventoCadastroEdicao' element={<EventoCadastroEdicao />}/>
        <Route path='/eventoCadastroEdicao/:eventId' element={<EventoCadastroEdicao />}/>

        <Route path='/associados' element={<Associados/>}/>
        <Route path='/associado/:associateRegistration' element={<Associado/>}/>
        <Route path='/associadoCadastroEdicao' element={<AssociadoCadastroEdicao/>}/>
        <Route path='/associadoCadastroEdicao/:associateRegistration' element={<AssociadoCadastroEdicao/>}/>

        <Route path='/marcarpresenca/:eventId' element={<MarcarPresenca/>}/>
      </Routes>  
    </>
  );
}

export default App;