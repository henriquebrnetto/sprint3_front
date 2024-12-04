import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import { Box, Toolbar, Typography, Tooltip, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import mst from './assets/mst.jpg';

import { HomeAdmin } from './pages/HomeAdmin'
import { Associados } from './pages/Associados'
import { Eventos } from './pages/Eventos'
import { Evento } from './pages/Evento'
import { Associado } from './pages/Associado'
import { AssociadoCadastroEdicao } from './pages/AssociadoCadastroEdicao'

import { HashRouter, Link, Route, Routes } from 'react-router-dom'

import './App.css'
import { Login } from './pages/login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulação do estado de login

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#A71220" }} >
        <Toolbar disableGutters>
          <img className="logoMST" src={mst} />
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
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
                <IconButton color="inherit">
                  <LogoutIcon sx={{ fontSize: { xs: '1rem', sm: '1.5rem', md: '1.75rem' } }} />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path="/homeadmin" element={<HomeAdmin/>}/>
        
        <Route path='/eventos' element={<Eventos/>}/>
        <Route path='/evento/:eventId' element={<Evento/>}/>

        <Route path='/associados' element={<Associados/>}/>
        <Route path='/associado/:associateRegistration' element={<Associado/>}/>
        <Route path='/associadoCadastroEdicao/:associateRegistration' element={<AssociadoCadastroEdicao/>}/>
      </Routes>  
    </>
  );
}

export default App;