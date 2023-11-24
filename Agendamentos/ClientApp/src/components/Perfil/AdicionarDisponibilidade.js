import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import { api } from '../../services/api'

export const AdicionarDisponibilidade = () => {
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFim, setHoraFim] = useState('');
    const [diaSemanaSelecionado, setDiaSemanaSelecionado] = useState('segunda');

    const userId = parseInt(localStorage.getItem('userId'), 10);
    const navigate = useNavigate();

    const location = useLocation();
    const byProfile = location.state?.byProfile;

    useEffect(() => {
        validateEnter();
    }, []);

    const validateEnter = () => { 
        if (!byProfile) {
            navigate('/perfil');
        }
    }

    const handleBotaoVoltar = () => {
        navigate('/perfil');
    }

    const salvarHorario = (e) => {
        e.preventDefault();
        
        const data = {
            diaSemana: diaSemanaSelecionado,
            horaInicio,
            horaFim,
            prestadorId: userId
        };

        api.post('horariodisponibilidade', data)
            .then((response) => {
                debugger
                console.log('Adicionou horario', response.data);
                alert('Disponibilidade adicionada com sucesso!')
                navigate('/perfil');
            })
            .catch((error) => console.error('Erro ao adicionar horario:', error));
    }

    const handleChangeDiaSemana = (event) => setDiaSemanaSelecionado(event.target.value);

    return (
        <div className="padrao-container">
            <form type="form" onSubmit={salvarHorario}>
                <h2>Adicionar Disponibilidade</h2>
                <div className="form-floating mb-3">
                    <select id="diasSemana"
                        name="diasSemana"
                        className="form-select"
                        value={diaSemanaSelecionado}
                        onChange={(e) => handleChangeDiaSemana(e)}>
                        <option value="segunda">Segunda-feira</option>
                        <option value="terca">Terça-feira</option>
                        <option value="quarta">Quarta-feira</option>
                        <option value="quinta">Quinta-feira</option>
                        <option value="sexta">Sexta-feira</option>
                        <option value="sabado">Sábado</option>
                        <option value="domingo">Domingo</option>
                    </select>
                    <label htmlFor="diasSemana" className="form-label" >Escolha um dia da semana:</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="time"
                        id="horaInicio"
                        className="form-control"
                        placeholder="Hora Inicial"
                        value={horaInicio}
                        onChange={(e) => setHoraInicio(e.target.value)}
                    />
                    <label htmlFor="horaInicio" className="form-label">Hora Inicial</label>
                </div>
                <div className="form-floating mb-3">
                    <input 
                        type="time"
                        id="horaFim"
                        placeholder="Hora Final"
                        className="form-control"
                        value={horaFim}
                        onChange={e => setHoraFim(e.target.value)}
                    />
                    <label htmlFor="horaFim" className="form-label">Hora Final</label>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button type="button" onClick={() => handleBotaoVoltar()} className="btn btn-danger">Voltar</button>
                    <button type="submit" className="btn btn-primary">Salvar</button>
                </div>                
            </form>
        </div>
    );
}