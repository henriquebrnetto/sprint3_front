import { useState } from 'react';
import './style/Login.css';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export function Login() {
  const [loginType, setLoginType] = useState('user'); // Default to admin
  const [credentials, setCredentials] = useState({ id: '', password: '', rg: '' });

  const handleLoginTypeChange = (event) => {
    setLoginType(event.target.value);
    // Reset credentials when changing login type
    setCredentials({ id: '', password: '', rg: '' });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = () => {
    // Prepare data based on loginType
    const payload =
      loginType === 'admin'
        ? { id: credentials.id, password: credentials.password }
        : { id: credentials.id, rg: credentials.rg };

    // Communicate with backend here
    console.log('Submitting:', payload);
    // Example API call
    // fetch('/api/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(payload),
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log('Response:', data))
    //   .catch((error) => console.error('Error:', error));
  };

  return (
    <div className='login-page'>
      <h2>Login</h2>
      <FormControl>
        <RadioGroup
          row
          value={loginType}
          onChange={handleLoginTypeChange}
          name="loginType"
        >
          <FormControlLabel value="user" control={<Radio />} label="Usuário" />
          <FormControlLabel value="admin" control={<Radio />} label="Administrador" />
        </RadioGroup>
      </FormControl>

      <div style={{ marginTop: '20px' }}>
        <TextField
          label="ID"
          name="id"
          value={credentials.id}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        {loginType === 'admin' && (
          <TextField
            label="Senha"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        )}
        {loginType === 'user' && (
          <TextField
            label="RG"
            name="rg"
            value={credentials.rg}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{ marginTop: '20px' }}
        >
          Login
        </Button>
      </div>
    </div>
  );
}