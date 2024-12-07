import { useState } from 'react';
import './style/Login.css';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';

import { useNavigate } from "react-router-dom";

export function Login() {

  const navigate = useNavigate();

  const [loginType, setLoginType] = useState('user')
  const [matricula, setMatricula] = useState('')
  const [senha, setSenha] = useState('')
  const [senhaErrada, setSenhaErrada] = useState(false)

  const handleMatriculaInput = (e) => {
    setMatricula(e.target.value);
  }
  const handleSenhaInput = (e) => {
    setSenha(e.target.value);
    
  }

  const handleAdmin = async (password) => {
    const url = `http://localhost:8081/api/v1/autenticacao/login/${matricula}`

    try {

      const response = await fetch(url, {method: 'GET', headers: {
        'Authorization': password
      }});
      console.log(response)
      if (!response.ok) {
          throw new Error(`Failed to load auth data: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.token != 'Acesso Negado') {
        localStorage.setItem('token', data.token)

        navigate("/homeadmin")
      } else {
        setSenhaErrada(true)
      }

    } catch (error) {
        console.error('Error loading associate data:', error);
    }
  }

  const handleLogin = async () => {
    if (matricula == ''){
      return
    }

    const url = `http://localhost:8081/api/v1/autenticacao/login/${matricula}`

    try {

      const response = await fetch(url, {method: 'GET'});
      console.log(response)
      if (!response.ok) {
          throw new Error(`Failed to load auth data: ${response.statusText}`);
      }

      const data = await response.json();

      setLoginType(data.acesso);
      if (data.acesso == 'user') {
        localStorage.setItem('token', data.token)

        navigate("/associado/" + String(matricula))
      } else {
        if (senha != ''){
          handleAdmin(senha)
        }
      }

    } catch (error) {
        console.error('Error loading associate data:', error);
    }
  }

  return (

    <div className='loginMainGrid'>
      <h2 className='loginTitle'>Login</h2>
      <input type='text' onChange={handleMatriculaInput}></input>
      {loginType != 'user' ? (
        <div className='loginPasswordDiv'>
          <label className='loginPasswordLabel'><span>*</span>Acesso restrito, por favor inserir a senha:</label>
          <input className='loginPasswordInput' type='text' onChange={handleSenhaInput}></input>
          {senhaErrada ? (
            <div className='loginWrongPassword'>
              <p className='loginWrongPasswordContent'>Acesso Negado</p>
            </div>
          ):(
            <></>
          )}
          
        </div>
      ):(
        <></>
      )}
      <button className='loginEntrarButton' onClick={handleLogin}>Entrar</button>

    </div>
  );
}