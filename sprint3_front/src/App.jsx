import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import { Box, Toolbar, Typography, Tooltip, IconButton, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import mst from './assets/mst.jpg';

import { HomeAdmin } from './pages/HomeAdmin'
import { Associados } from './pages/Associados'

import { HashRouter, Link, Route, Routes } from 'react-router-dom'

import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulação do estado de login
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#A71220" }} >
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
                <IconButton color="inherit">
                  <LogoutIcon sx={{ fontSize: { xs: '1rem', sm: '1.5rem', md: '1.75rem' } }} />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      
      <Routes>
        <Route path="/homeadmin" element={<HomeAdmin/>}/>
        <Route path='/associados' element={<Associados/>}/>
      </Routes>  
    </>
  );
}

export default App;