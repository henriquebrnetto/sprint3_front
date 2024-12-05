import { useEffect, useState } from 'react';
import './style/Associado.css';
import { IoArrowBack } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import { Checkbox, FormControlLabel } from '@mui/material';

export function EventoCadastroEdicao() {
    const { eventId } = useParams();
    const [vals, setVals] = useState({
        nome: null,
        data: null,
        local: null,
        descricao: null,
        pontosComCamisa: null,
        pontosSemCamisa: null,
        pontosColaborador: null,
        reuniaoMensal: null,
        status: false,
        contribuicaoTotal: 0,
        observacao: null,
    });

    // Fetch event details when `eventId` is not 'cadastro'
    useEffect(() => {
        if (eventId !== undefined) {
            loadEvent();
        }
    }, [eventId]);    

    const loadEvent = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/v1/eventos/${eventId}`);
            if (!response.ok) {
                throw new Error(`Failed to load event: ${response.statusText}`);
            }
            const data = await response.json();
            setVals({
                nome: data.nome || '',
                data: data.data || '',
                local: data.local || '',
                descricao: data.descricao || '',
                pontosComCamisa: data.pontosComCamisa || null,
                pontosSemCamisa: data.pontosSemCamisa || null,
                pontosColaborador: data.pontosColaborador || null,
                reuniaoMensal: data.reuniaoMensal || false,
                status: data.status || false,
                contribuicaoTotal: data.contribuicaoTotal || 0,
                observacao: data.observacao || '',
            });
        } catch (error) {
            console.error('Error loading event:', error);
        }
    };    

    const saveEvent = async () => {
        try {
            const url = eventRegistration
                ? `http://localhost:8081/api/v1/eventos/${eventId}` // PUT request
                : `http://localhost:8081/api/v1/eventos`; // POST request for new events
    
            const method = eventRegistration ? 'PUT' : 'POST';
    
            const response = await fetch(url, {
                method: method, // Dynamically set the method
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(vals),
            });
    
            if (!response.ok) {
                throw new Error(`Failed to ${method === 'PUT' ? 'update' : 'create'} event: ${response.statusText}`);
            }
    
            alert(`Evento ${method === 'PUT' ? 'atualizado' : 'criado'} com sucesso!`);
        } catch (error) {
            console.error('Error saving event:', error);
            alert('Erro ao salvar evento.');
        }
    };    

    const updateField = (field, value) => {
        setVals((prevVals) => ({
            ...prevVals,
            [field]: value,
        }));
    };

    const flipStatus = () => {
        updateField('status', !vals.status);
    };

    const flipMensal = () => {
        updateField('reuniaoMensal', !vals.reuniaoMensal);
    };

    const checkStatus = () => {
        return vals.status ? 'Active' : '';
    };

    const checkMensal = () => {
        return vals.reuniaoMensal ? 'Active' : '';
    };

    const getDate = () => {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${year}-${month < 10 ? '0' + month : month}-${date < 10 ? '0' + date : date}`;
    };

    return (
        <>
            <div className='associadocadastroedicaoMainGrid'>
                <h1>{eventId === undefined ? "Cadastrar Evento" : "Editar Evento"}</h1>
                <div className='associadocadastroedicaoForm'>

                    <div className="associadocadastroedicaoNome">
                        <div className="associadocadastroedicaoInput">
                            <label><span className="required">*</span>Nome</label>
                            <input
                                name="nome"
                                type="text"
                                className="form-control input-lg"
                                value={vals.nome || ""}
                                onChange={(e) => updateField(e.target.name, e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="associadocadastroedicaoData">
                        <div className="associadocadastroedicaoInput">
                            <label><span className="required">*</span>Data</label>
                            <input
                                name="data"
                                type="date"
                                className="form-control input-lg"
                                value={vals.data || getDate()}
                                onChange={(e) => updateField(e.target.name, e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="associadocadastroedicaoLocal">
                        <div className="associadocadastroedicaoInput">
                            <label><span className="required">*</span>Local</label>
                            <input
                                name="local"
                                type="text"
                                className="form-control input-lg"
                                value={vals.local || ""}
                                onChange={(e) => updateField(e.target.name, e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="associadocadastroedicaoDescricao">
                        <div className="associadocadastroedicaoInput">
                            <label><span className="required">*</span>Descrição</label>
                            <input
                                name="descricao"
                                type="text"
                                className="form-control input-lg"
                                value={vals.descricao || ""}
                                onChange={(e) => updateField(e.target.name, e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="associadocadastroedicaoStatus">
                        <FormControlLabel className="associadocadastroedicaoReuniaoMensal" 
                            control={<Checkbox 
                                id={'associadocadastroedicaoStatus' + checkStatus()} 
                                onClick={flipStatus}
                                checked={vals.status || false}
                                />}
                            label="Status" />
                    </div>

                    <div className="associadocadastroedicaoReuniaoMensal">
                        <FormControlLabel className="associadocadastroedicaoReuniaoMensal" 
                            control={<Checkbox 
                                id={'associadocadastroedicaoReuniaoMensal' + checkMensal()} 
                                onClick={flipMensal}
                                checked={vals.reuniaoMensal || false}
                                />}
                            label="Reunião Mensal" />
                    </div>

                    <div className="associadocadastroedicaoPontosComCamisa">
                        <div className="associadocadastroedicaoInput">
                            <label><span className="required">*</span>Pontos Com Camisa</label>
                            <input
                                name="pontosComCamisa"
                                type="number"
                                className="form-control input-lg"
                                value={vals.pontosComCamisa || ""}
                                onChange={(e) => updateField(e.target.name, e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="associadocadastroedicaoPontosSemCamisa">
                        <div className="associadocadastroedicaoInput">
                            <label><span className="required">*</span>Pontos Sem Camisa</label>
                            <input
                                name="pontosSemCamisa"
                                type="number"
                                className="form-control input-lg"
                                value={vals.pontosSemCamisa || ""}
                                onChange={(e) => updateField(e.target.name, e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="associadocadastroedicaoPontosColaborador">
                        <div className="associadocadastroedicaoInput">
                            <label><span className="required">*</span>Pontos Colaborador</label>
                            <input
                                name="pontosColaborador"
                                type="number"
                                className="form-control input-lg"
                                value={vals.pontosColaborador || ""}
                                onChange={(e) => updateField(e.target.name, e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="associadocadastroedicaoObservacao">
                        <div className="associadocadastroedicaoInput">
                            <label>Observação</label>
                            <textarea
                                name='observacao'
                                rows='4'
                                cols='50'
                                value={vals.observacao || ""}
                                onChange={(e) => updateField(e.target.name, e.target.value)}
                            ></textarea>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="associadocadastroedicaoSave">
                        <button className="saveButton" onClick={saveEvent}>
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}