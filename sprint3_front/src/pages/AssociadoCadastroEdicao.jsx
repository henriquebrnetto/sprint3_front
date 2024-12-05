import { useEffect, useState } from 'react';

import './style/Evento.css';
import { IoArrowBack } from 'react-icons/io5';
import { FaFilter, FaSortAmountDown, FaSearch, FaTrash, FaPencilAlt, FaCalendar, FaTshirt } from 'react-icons/fa';
import { LuShirt } from "react-icons/lu";
import { GrClose } from "react-icons/gr";
import { Autocomplete, Pagination, TextField } from "@mui/material";

import {useParams} from 'react-router-dom';


export function AssociadoCadastroEdicao() {
    
    const {associateRegistration} = useParams();

    const [associate, setAssociate] = useState({});

    const [vals, setVals] = useState(
        {
            'nome': null,
            'dataNascimento': null,
            'idade': null,
            'rg': null,
            'cpf': null,
            'casado': false,
            'matricula': null,
            'sexo': null,
            'pcd': false,
            'email': null,
            'celular': null,
            'endereco': null,
            'bairro': null,
            'complemento': null,
            'cep': null,
            'filhos': null,
            'pontos': null,
            'status': true,
            'faltas': null,
            'observacao': null,
        }
    )

    useEffect(() => {
        loadAssociate();
    }, [])


    function loadAssociate(associateRegistration) {
        // fetch(<>'localhost:8081/api/v1/presenca/evento/{event.id}'</>)
        //     .then(response => response.json())
        //     .then(data => setPagedPresences(data))
        //     .catch(error => console.error('Erro ao carregar eventos ativos:', error));\
        const data = [{ 
            'nome': 'Coisa boa da silva',
            'data': '23/04/2025',
            'id': '98369420',
        }];

        setAssociate(data)
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

    function capitalizeFirstLetter(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
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

    const flipCasado = () => {
        updateField('casado', !vals.casado)
    };

    const flipPcd = () => {
        updateField('pcd', !vals.pcd)
    };

    const setSexo = (sx) => {
        updateField('sexo', sx)
    }

    const checkCasadoSexoPcd = (sx) => {
        if (sx == 'C'){
            if (vals.casado){
                return 'Active'
            }
            return ''
        }

        if (sx == 'P'){
            if (vals.pcd){
                return 'Active'
            }
            return ''
        }

        if (vals.sexo == sx){
            return 'Active'
        }
        return ''
    }

    return (
        <>
            <div className='associadocadastroedicaoMainGrid'>
                <h1>A</h1>
                <>{vals.pcd ?(
                    <h1>A</h1>
                ):(
                    <></>
                )}</>
                <div className='associadocadastroedicaoForm'>

                    <div className="associadocadastroedicaoNome">
                        <div className="associadocadastroedicaoInput">
                            <label><span className="required">*</span>Nome</label>
                            <input name="nome" type="text" className="form-control input-lg" value={vals.nome || "" } onChange={(e) => updateField(e.target.name, e.target.value)}/>
                        </div>
                    </div>

                    <div className="associadocadastroedicaoDataNascimento">
                        <div className="associadocadastroedicaoInput">
                            <label><span className="required">*</span>Data de Nascimento</label>
                            <input name="dataNascimento" type="date" className="form-control input-lg" value={vals.dataNascimento || getDate() } onChange={(e) => updateField(e.target.name, e.target.value)}/>
                        </div>
                    </div>

                    <div className="associadocadastroedicaoIdade">
                        <div className="associadocadastroedicaoInput">
                            <label><span className="required">*</span>Idade</label>
                            <input name="idade" type="number" className="form-control input-lg" value={vals.idade || null } onChange={(e) => updateField(e.target.name, e.target.value)}/>
                        </div>
                    </div>

                    <div className="associadocadastroedicaoRg">
                        <div className="associadocadastroedicaoInput">
                            <label><span className="required">*</span>RG</label>
                            <input name="rg" type="text" className="form-control input-lg" value={vals.rg || '' } onChange={(e) => updateField(e.target.name, e.target.value)}/>
                        </div>
                    </div>

                    <div className="associadocadastroedicaoCpf">
                        <div className="associadocadastroedicaoInput">
                            <label><span className="required">*</span>CPF</label>
                            <input name="cpf" type="text" className="form-control input-lg" value={vals.cpf || '' } onChange={(e) => updateField(e.target.name, e.target.value)}/>
                        </div>
                    </div>

                    <div className="associadocadastroedicaoCasado">
                        <h3>Casado:</h3>
                        <button id={'associadocadastroedicaoCasado'+checkCasadoSexoPcd('C')} onClick={flipCasado}></button>
                    </div>

                    <div className="associadocadastroedicaoMatricula">
                        <div className="associadocadastroedicaoInput">
                            <label><span className="required">*</span>Matrícula</label>
                            <input name="matricula" type="text" className="form-control input-lg" value={vals.matricula || '' } onChange={(e) => updateField(e.target.name, e.target.value)}/>
                        </div>
                    </div>

                    <div className="associadocadastroedicaoSexo">
                        <h3>Sexo:</h3>
                        <div className='associadocadastroedicaoSexoButtons'>
                            <button id={'associadocadastroedicaoSexoH'+checkCasadoSexoPcd('H')} onClick={() => setSexo('H')}>H</button>
                            <button id={'associadocadastroedicaoSexoM'+checkCasadoSexoPcd('M')} onClick={() => setSexo('M')}>M</button>
                            <button id={'associadocadastroedicaoSexoO'+checkCasadoSexoPcd('O')} onClick={() => setSexo('O')}>O</button>
                        </div>
                    </div>

                    <div className="associadocadastroedicaoPcd">
                        <h3>PCD:</h3>
                        <button id={'associadocadastroedicaoPcd'+checkCasadoSexoPcd('P')} onClick={flipPcd}></button>
                    </div>

                    <div className="associadocadastroedicaoEmail">
                        <div className="associadocadastroedicaoInput">
                            <label><span className="required">*</span>E-mail</label>
                            <input name="email" type="text" className="form-control input-lg" value={vals.email || '' } onChange={(e) => updateField(e.target.name, e.target.value)}/>
                        </div>
                    </div>

                    <div className="associadocadastroedicaoCelular">
                        <div className="associadocadastroedicaoInput">
                            <label><span className="required">*</span>Celular</label>
                            <input name="celular" type="text" className="form-control input-lg" value={vals.celular || '' } onChange={(e) => updateField(e.target.name, e.target.value)}/>
                        </div>
                    </div>

                    <div className="associadocadastroedicaoEndereco">
                        <div className="associadocadastroedicaoInput">
                            <label><span className="required">*</span>Endereco</label>
                            <input name="endereco" type="text" className="form-control input-lg" value={vals.endereco || '' } onChange={(e) => updateField(e.target.name, e.target.value)}/>
                        </div>
                    </div>

                    <div className="associadocadastroedicaoBairro">
                        <div className="associadocadastroedicaoInput">
                            <label><span className="required">*</span>Bairro</label>
                            <input name="bairro" type="text" className="form-control input-lg" value={vals.bairro || '' } onChange={(e) => updateField(e.target.name, e.target.value)}/>
                        </div>
                    </div>

                    <div className="associadocadastroedicaoComplemento">
                        <div className="associadocadastroedicaoInput">
                            <label><span className="required">*</span>Complemento</label>
                            <input name="complemento" type="text" className="form-control input-lg" value={vals.complemento || '' } onChange={(e) => updateField(e.target.name, e.target.value)}/>
                        </div>
                    </div>

                    <div className="associadocadastroedicaoCep">
                        <div className="associadocadastroedicaoInput">
                            <label><span className="required">*</span>CEP</label>
                            <input name="cep" type="text" className="form-control input-lg" value={vals.cep || '' } onChange={(e) => updateField(e.target.name, e.target.value)}/>
                        </div>
                    </div>

                    <div className="associadocadastroedicaoFilhos">
                        <div className="associadocadastroedicaoInput">
                            <label><span className="required">*</span>Filhos</label>
                            <input name="filhos" type="number" className="form-control input-lg" value={vals.filhos || null } onChange={(e) => updateField(e.target.name, e.target.value)}/>
                        </div>
                    </div>

                    <div className="associadocadastroedicaoPontos">
                        <div className="associadocadastroedicaoInput">
                            <label><span className="required">*</span>Pontos</label>
                            <input name="pontos" type="number" className="form-control input-lg" value={vals.pontos || null } onChange={(e) => updateField(e.target.name, e.target.value)}/>
                        </div>
                    </div>

                    <div className="associadocadastroedicaoFaltas">
                        <div className="associadocadastroedicaoInput">
                            <label><span className="required">*</span>Faltas</label>
                            <input name="faltas" type="number" className="form-control input-lg" value={vals.faltas || 0 } onChange={(e) => updateField(e.target.name, e.target.value)}/>
                        </div>
                    </div>

                    <div className="associadocadastroedicaoObservacao">
                        <div className="associadocadastroedicaoInput">
                            <label><span className="required">*</span>Observação</label>
                            <textarea name='observacao' rows='4' cols='50' value={vals.observacao || '' } onChange={(e) => updateField(e.target.name, e.target.value)}></textarea>
                        </div>
                    </div>
                        
                </div>
            </div>
        </>
    );  
}