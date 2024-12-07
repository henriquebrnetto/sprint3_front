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
import { HomeRedirect } from './pages/mainRedirect.jsx'

import PrivateRoutes from "./privateRoutes.jsx"
import PublicRoutes from './publicRoutes.jsx'

import { HashRouter, Link, Route, Routes } from 'react-router-dom'

import './App.css'
import { Login } from './pages/login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulação do estado de login
  const [isAdmin, setIsAdmin] = useState(false);

  const handleClearToken = () => {
    localStorage.setItem('token', '');
    window.location.reload();
  }

  if (localStorage.getItem('token') == null){
    localStorage.setItem('token', '')
  }

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
            <Box sx={{ flexGrow: 0, mr: { xs: 1, sm: 2, md: 5 } }}>
              <Tooltip title="Logout">
                <IconButton onClick={handleClearToken} color="inherit">
                  <LogoutIcon sx={{ fontSize: { xs: '1rem', sm: '1.5rem', md: '1.75rem' } }} />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      
      <Routes>

        <Route element={<PublicRoutes />}>
          <Route path='/associado/:associateRegistration' element={<Associado/>}/>
          <Route path='/login' element={<Login />}/>
          <Route path='' element={<HomeRedirect />}/>
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route path="/homeadmin" element={<HomeAdmin/>}/>
          
          <Route path='/eventos' element={<Eventos/>}/>
          <Route path='/evento/:eventId' element={<Evento/>}/>
          <Route path='/eventoCadastroEdicao' element={<EventoCadastroEdicao />}/>
          <Route path='/eventoCadastroEdicao/:eventId' element={<EventoCadastroEdicao />}/>

          <Route path='/associados' element={<Associados/>}/>
          <Route path='/associadoCadastroEdicao' element={<AssociadoCadastroEdicao/>}/>
          <Route path='/associadoCadastroEdicao/:associateRegistration' element={<AssociadoCadastroEdicao/>}/>

          <Route path='/marcarpresenca/:eventId' element={<MarcarPresenca/>}/>
        </Route>
      </Routes>  
    </>
  );
}

export default App;