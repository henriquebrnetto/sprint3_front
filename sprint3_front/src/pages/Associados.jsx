import { useEffect, useState } from 'react';

import './style/Associados.css';
import { IoArrowBack } from 'react-icons/io5';
import { FaFilter, FaSortAmountDown, FaSearch, FaTrash, FaPencilAlt  } from 'react-icons/fa';
import { Autocomplete, Pagination, TextField } from "@mui/material";

export function Associados() {

    const [associates, setAssociates] = useState([]);
    const [maxPages, setMaxPages] = useState(1);
    const [pageN, setPageN] = useState(0);
    const [pagedAssociates, setPagedAssociates] = useState([]);

    const [nameFiltering, setNameFiltering] = useState('')
    const [registrationFiltering, setRegistrationFiltering] = useState('')

    useEffect(() => {
        loadAssociates();
        loadMaxPages();
        loadPagedAssociates();
    }, [])

    function loadPagedAssociates(pageN) {
        // fetch('localhost:8081/associados?idadeMinima=null&idadeMaxima=null&casado=null&sexo=null&filhosMinimo=null&filhosMaximo=null&status=null&page={pageN}&size=10&sortBy=nome&sortDirection=asc')
        //     .then(response => response.json())
        //     .then(data => setAssociates(data))
        //     .catch(error => console.error('Erro ao carregar associados:', error));
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

    const handlePageChange = (event, value) => {
        setPageN(value - 1);
    };

    return (
        <>
            <div className='AssociadosmainGrid'>
                <div className='AssociadospreviousPage'>
                    <button  id='AssociadospreviousPageButton'><IoArrowBack></IoArrowBack></button>
                </div>
                <div className='AssociadostopSection'>
                    <button className='Associadosfilter'><FaFilter></FaFilter></button>
                    <Autocomplete
                        className='AssociadossearchBar'
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
                    <button className='Associadosorderby'><FaSortAmountDown></FaSortAmountDown></button>
                </div>
                <h2 className='AssociadostituloAssociados'>Associados:</h2>
                <div className='AssociadosAssociados'>
                    {pagedAssociates.map((associate, index) => (
                        <div className='Associadosassociate' key={index}>
                            <button className='AssociadosassociateBox'>
                                <h3 id='AssociadosassociateName'>{associate.nome}</h3>
                            </button>
                            <button className='AssociadoseditButton'><FaPencilAlt></FaPencilAlt></button>
                            <button className='AssociadosdeleteButton'><FaTrash></FaTrash></button>
                        </div>
                    ))}
                </div>
                {maxPages > 1 ? (
                    <Pagination count={maxPages} page={pageN + 1} onChange={handlePageChange} className='AssociadosnavBar' sx={{justifyContent:"center", alignItems: "center", display:"flex", marginTop:"15px"}}/>
                ):(
                    <></>
                )}
            </div>
        </>
    );  
}
