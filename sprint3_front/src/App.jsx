import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import { Box, Toolbar, Typography, Tooltip, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulação do estado de login

  return (
    <AppBar position="fixed">
      <Toolbar disableGutters>
        {/* Logo centralizado */}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              fontWeight: 700,
              letterSpacing: '.15rem',
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
              <IconButton color="inherit" sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default App;