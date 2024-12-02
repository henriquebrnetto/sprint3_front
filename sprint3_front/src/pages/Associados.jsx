import { useEffect, useState } from 'react';

import './style/Associados.css';
import { IoArrowBack } from 'react-icons/io5';
import { FaFilter, FaSortAmountDown, FaSearch, FaTrash, FaPencilAlt  } from 'react-icons/fa';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export function Associados() {

    const [associates, setAssociates] = useState([]);
    const [maxPages, setMaxPages] = useState(1);
    const [pageN, setPageN] = useState(1);
    const [pagedAssociates, setPagedAssociates] = useState([]);

    useEffect(() => {
        loadAssociates();
        loadMaxPages();
        loadPagedAssociates();
    }, [])

    function loadPagedAssociates(pageN) {
        // fetch('localhost:8081/associados?idadeMinima=null&idadeMaxima=null&casado=null&sexo=null&filhosMinimo=null&filhosMaximo=null&status=null&page={pageN}&size=10&sortBy=nome&sortDirection=asc')
        //     .then(response => response.json())
        //     .then(data => setActiveEvents(data))
        //     .catch(error => console.error('Erro ao carregar eventos ativos:', error));
        const data = [{
            'nome': 'Coisa boa da silva',
            'data': '23/04/2025',
            'id': '98369420',
        }];

        setPagedAssociates(data)
    }

    function loadAssociates() {
        // fetch('urlback')
        //     .then(response => response.json())
        //     .then(data => setActiveEvents(data))
        //     .catch(error => console.error('Erro ao carregar eventos ativos:', error));
        const data = [{
            'nome': 'Coisa boa da silva',
            'data': '23/04/2025',
            'matricula': '98369420',
        }];

        setAssociates(data)
    }

    function loadMaxPages() {
        setMaxPages(1)
    }

    const [selectedValue, setSelectedValue] = useState(null);

    const handleSearch = (options, { inputValue }) => {
        return options.filter(
        (option) =>
            option.nome.toLowerCase().includes(inputValue.toLowerCase()) ||
            String(option.matricula).includes(inputValue)
        );
    };

    return (
        <>
            <div className='mainGrid'>
                <div className='previousPage'>
                    <button  id='previousPageButton'><IoArrowBack></IoArrowBack></button>
                </div>
                <div className='topSection'>
                    <button className='filter'><FaFilter></FaFilter></button>
                    <Autocomplete
                        className='searchBar'
                        options={associates}
                        freeSolo
                        getOptionLabel={(option) => option.nome}
                        filterOptions={handleSearch}
                        onChange={(event, newValue) => setSelectedValue(newValue)}
                        renderInput={(params) => (
                            <TextField {...params} variant="outlined"

                                label={
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <FaSearch /> Buscar associado
                                    </span>
                                }

                                // Estilizando a barra de busca pq nao tem como fzr isso no arquivo de css
                
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderWidth: '2px',
                                        borderColor: 'black',
                                        '& fieldset': {
                                            borderWidth: '2px',
                                            borderColor: 'rgba(0,0,0,.4)',
                                            borderRadius: '7px'
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'rgba(0,0,0,.6)',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'rgba(0,0,0,.6)',
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: 'rgba(0,0,0,.7)',
                                        fontSize: '16px',
                                        fontWeight: '500'
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: 'rgba(0,0,0,.7)',
                                    },
                                }}

                                // -----
                            />
                        )}
                    />
                    <button className='orderby'><FaSortAmountDown></FaSortAmountDown></button>
                </div>
                <h2 className='tituloAssociados'>Associados:</h2>
                <div className='Associados'>
                    {pagedAssociates.map(associate => (
                        <div className='associate'>
                            <button className='associateBox'>
                                <h3 id='associateName'>{associate.nome}</h3>
                            </button>
                            <button className='editButton'><FaPencilAlt></FaPencilAlt></button>
                            <button className='deleteButton'><FaTrash></FaTrash></button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );  
}
