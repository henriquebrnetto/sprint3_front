import { useEffect, useState } from 'react';

import './style/Associado.css';
import { IoArrowBack } from 'react-icons/io5';
import { FaFilter, FaSortAmountDown, FaSearch, FaTrash, FaPencilAlt, FaCalendar, FaTshirt } from 'react-icons/fa';
import { LuShirt } from "react-icons/lu";
import { GrClose } from "react-icons/gr";
import { Autocomplete, Pagination, TextField } from "@mui/material";

import {useParams} from 'react-router-dom';


export function EventoCadastroEdicao() {
    
    const {eventRegistration} = useParams();

    const [event, setEvent] = useState({});

    const [vals, setVals] = useState(
        {
            'nome': null,
            'data': null,
            'local': null,
            'descricao': null,
            'pontosComCamisa': null,
            'pontosSemCamisa': null,
            'pontosColaborador': null,
            'reuniaoMensal': null,
            'status': false,
            'contribuicaoTotal': 0
        }
    )

    
    if (eventRegistration != 'cadastro') { 
        useEffect(() => {
            loadEvent();
        }, [])
    }

    // funcoes para definir constantes acima

    function loadEvent(eventRegistration) {
        // fetch(<>'localhost:8081/api/v1/presenca/evento/{event.id}'</>)
        //     .then(response => response.json())
        //     .then(data => setPagedPresences(data))
        //     .catch(error => console.error('Erro ao carregar eventos ativos:', error));\
        const data = [{ 
            'nome': 'Coisa boa da silva',
            'data': '23/04/2025',
            'id': '98369420',
        }];

        setEvent(data)
    }

    function getDate() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        
        var strmais = ''

        if (date < 10){
            strmais = '0'
        }
        return `${year}-${month}-${strmais}${date}`;
    }

    // -------

    // lidar com buscas e mudanca de paginacao

    // -------

    const updateField = (field, value) => {
        setVals((prevVals) => ({
          ...prevVals,
          [field]: value,
        }));
    };

    const flipStatus = () => {
        updateField('status', !vals.status)
    };

    const flipMensal = () => {
        updateField('mensal', !vals.mensal)
    };

    const checkStatus = (sx) => {
        if (vals.status){
            return 'Active'
        }
        return ''
    }
    const checkMensal = (sx) => {
        if (vals.reuniaoMensal){
            return 'Active'
        }
        return ''
    }

    return (
        <>
            <div className='associadocadastroedicaoMainGrid'>
                <h1>A</h1>
                <div className='associadocadastroedicaoForm'>

                    <div className="associadocadastroedicaoNome">
                        <div className="associadocadastroedicaoInput">
                            <label><span className="required">*</span>Nome</label>
                            <input name="nome" type="text" className="form-control input-lg" value={vals.nome || "" } onChange={(e) => updateField(e.target.name, e.target.value)}/>
                        </div>
                    </div>

                    <div className="associadocadastroedicaoData">
                        <div className="associadocadastroedicaoInput">
                            <label><span className="required">*</span>Data</label>
                            <input name="data" type="date" className="form-control input-lg" value={vals.data || getDate() } onChange={(e) => updateField(e.target.name, e.target.value)}/>
                        </div>
                    </div>

                    <div className="associadocadastroedicaoLocal">
                        <div className="associadocadastroedicaoInput">
                            <label><span className="required">*</span>Local</label>
                            <input name="local" type="text" className="form-control input-lg" value={vals.local || '' } onChange={(e) => updateField(e.target.name, e.target.value)}/>
                        </div>
                    </div>

                    <div className="associadocadastroedicaoDescricao">
                        <div className="associadocadastroedicaoInput">
                            <label><span className="required">*</span>Descricao</label>
                            <input name="descricao" type="text" className="form-control input-lg" value={vals.descricao || '' } onChange={(e) => updateField(e.target.name, e.target.value)}/>
                        </div>
                    </div>

                    <div className="associadocadastroedicaoStatus">
                        <h3>Status:</h3>
                        <button id={'associadocadastroedicaoStatus'+checkStatus()} onClick={flipStatus}></button>
                    </div>

                    <div className="associadocadastroedicaoReuniaoMensal">
                        <h3>Reuniao Mensal:</h3>
                        <button id={'associadocadastroedicaoReuniaoMensal'+checkMensal()} onClick={flipMensal}></button>
                    </div>

                    <div className="associadocadastroedicaoPontosComCamisa">
                        <div className="associadocadastroedicaoInput">
                            <label><span className="required">*</span>Pontos Com Camisa</label>
                            <input name="pontosComCamisa" type="number" className="form-control input-lg" value={vals.pontosComCamisa || null } onChange={(e) => updateField(e.target.name, e.target.value)}/>
                        </div>
                    </div>

                    <div className="associadocadastroedicaoPontosSemCamisa">
                        <div className="associadocadastroedicaoInput">
                            <label><span className="required">*</span>Pontos Sem Camisa</label>
                            <input name="pontosSemCamisa" type="number" className="form-control input-lg" value={vals.pontosSemCamisa || null } onChange={(e) => updateField(e.target.name, e.target.value)}/>
                        </div>
                    </div>

                    <div className="associadocadastroedicaoPontosColaborador">
                        <div className="associadocadastroedicaoInput">
                            <label><span className="required">*</span>Pontos Colaborador</label>
                            <input name="pontosColaborador" type="number" className="form-control input-lg" value={vals.pontosColaborador || null } onChange={(e) => updateField(e.target.name, e.target.value)}/>
                        </div>
                    </div>

                    <div className="associadocadastroedicaoObservacao">
                        <div className="associadocadastroedicaoInput">
                            <label><span className="required"></span>Observação</label>
                            <textarea name='observacao' rows='4' cols='50' value={vals.observacao || '' } onChange={(e) => updateField(e.target.name, e.target.value)}></textarea>
                        </div>
                    </div>
                        
                </div>
            </div>
        </>
    );
}