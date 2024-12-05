import { useEffect, useState } from 'react';
import './style/Evento.css';
import { useParams } from 'react-router-dom';
import { Checkbox, FormControlLabel } from '@mui/material';

export function AssociadoCadastroEdicao() {
    const { associateRegistration } = useParams();

    const [vals, setVals] = useState({
        nome: null,
        dataNascimento: null,
        idade: null,
        rg: null,
        cpf: null,
        casado: false,
        matricula: null,
        sexo: null,
        pcd: false,
        email: null,
        celular: null,
        endereco: null,
        bairro: null,
        complemento: null,
        cep: null,
        filhos: null,
        pontos: null,
        status: true,
        faltas: null,
        observacao: null,
    });

    const fieldConfig = [
        { name: 'nome', label: 'Nome', type: 'text', required: true },
        { name: 'dataNascimento', label: 'Data de Nascimento', type: 'date', required: true },
        { name: 'idade', label: 'Idade', type: 'number', required: true },
        { name: 'rg', label: 'RG', type: 'text', required: true },
        { name: 'cpf', label: 'CPF', type: 'text', required: true },
        { name: 'matricula', label: 'Matrícula', type: 'text', required: true },
        { name: 'email', label: 'E-mail', type: 'text', required: true },
        { name: 'celular', label: 'Celular', type: 'text', required: true },
        { name: 'endereco', label: 'Endereço', type: 'text', required: true },
        { name: 'bairro', label: 'Bairro', type: 'text', required: true },
        { name: 'complemento', label: 'Complemento', type: 'text', required: true },
        { name: 'cep', label: 'CEP', type: 'text', required: true },
        { name: 'filhos', label: 'Filhos', type: 'number', required: true },
        { name: 'pontos', label: 'Pontos', type: 'number', required: true },
        { name: 'faltas', label: 'Faltas', type: 'number', required: true },
        { name: 'observacao', label: 'Observação', type: 'textarea', required: false },
    ];

    useEffect(() => {
        if (associateRegistration) {
            loadAssociate();
        }
    }, [associateRegistration]);

    const loadAssociate = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/v1/associados/${associateRegistration}`);
            if (!response.ok) {
                throw new Error(`Failed to load associate: ${response.statusText}`);
            }
            const data = await response.json();
            setVals(data);
        } catch (error) {
            console.error('Error loading associate:', error);
        }
    };

    const saveAssociate = async () => {
        try {
            const url = associateRegistration
                ? `http://localhost:8081/api/v1/associados/${associateRegistration}` // PUT request
                : `http://localhost:8081/api/v1/associados`; // POST request for new associates

            const method = associateRegistration ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(vals),
            });

            if (!response.ok) {
                throw new Error(`Failed to ${method === 'PUT' ? 'update' : 'create'} associate: ${response.statusText}`);
            }

            alert(`Associado ${method === 'PUT' ? 'atualizado' : 'criado'} com sucesso!`);
        } catch (error) {
            console.error('Error saving associate:', error);
            alert('Erro ao salvar associado.');
        }
    };

    const updateField = (field, value) => {
        setVals((prevVals) => ({
            ...prevVals,
            [field]: value,
        }));
    };

    const flipCasado = () => {
        updateField('casado', !vals.casado);
    };

    const flipPcd = () => {
        updateField('pcd', !vals.pcd);
    };

    const checkFieldStatus = (field, value) => {
        return vals[field] === value ? 'Active' : '';
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
            <div className="associadocadastroedicaoMainGrid">
                <h1>{associateRegistration ? 'Editar Associado' : 'Cadastrar Associado'}</h1>
                <div className="associadocadastroedicaoForm">
                    {/* Dynamically Render Input Fields */}
                    {fieldConfig.map((field) => (
                        <div key={field.name} className="associadocadastroedicaoInput">
                            <label>
                                {field.required && <span className="required">*</span>}
                                {field.label}
                            </label>
                            {field.type === 'textarea' ? (
                                <textarea
                                    name={field.name}
                                    rows="4"
                                    cols="50"
                                    value={vals[field.name] || ''}
                                    onChange={(e) => updateField(field.name, e.target.value)}
                                />
                            ) : (
                                <input
                                    name={field.name}
                                    type={field.type}
                                    className="form-control input-lg"
                                    value={vals[field.name] || ''}
                                    onChange={(e) => updateField(field.name, e.target.value)}
                                />
                            )}
                        </div>
                    ))}

                    {/* Casado Field */}
                    <div className="associadocadastroedicaoCasado">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={vals.casado}
                                    onChange={flipCasado}
                                />
                            }
                            label="Casado"
                        />
                    </div>

                    {/* PCD Field */}
                    <div className="associadocadastroedicaoPcd">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={vals.pcd}
                                    onChange={flipPcd}
                                />
                            }
                            label="PCD"
                        />
                    </div>

                    {/* Save Button */}
                    <div className="associadocadastroedicaoSave">
                        <button className="saveButton" onClick={saveAssociate}>
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}