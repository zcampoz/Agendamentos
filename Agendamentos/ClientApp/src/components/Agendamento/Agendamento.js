import React, { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { DateSelector, TimeSlotSelector } from './DateTimeSelectors';
import { api } from '../../services/api';
import './Agendamentos.css';

export const Agendamento = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [horarios, setHorarios] = useState([]);
    const [agendados, setAgendados] = useState([]);

    const location = useLocation();
    const navigate = useNavigate();
    const selectedService = location.state?.selectedService; 

    const userId = parseInt(localStorage.getItem('userId'), 10);

    if (!selectedService) {
        return <Navigate to="/home" />;
    }

    const handleDateSelection = (date) => {
        setSelectedDate(date);
        getHorariosDisponiveis(selectedService?.prestadorID, date);
        getAgendamentosPelaData(date);
    };

    const handleTimeSlotSelection = (timeSlot) => {
        setSelectedTimeSlot(timeSlot);
    };

    const handleBotaoVoltar = () => {
        navigate('/home');
    }

    const handleAgendamentoSubmit = () => {
        if (selectedService && selectedTimeSlot) {
            const data = {
                usuarioId: userId,
                servicoId: selectedService.id,
                prestadorId: selectedService.prestadorID,
                dataHora: selectedDate.toString(),
                horarioAgendamento: selectedTimeSlot.toString(),
            };

            api.post('agendamento', data)
                .then((response) => {
                    console.log('Agendamento bem-sucedido:', response.data);
                    navigate('/home');
                })
                .catch((error) => {
                    console.error('Erro ao agendar serviço:', error);
                    alert('Erro ao agendar serviço!');
                });
        }
    };

    const getHorariosDisponiveis = (prestadorID, selectedDate) => {
        if (prestadorID && selectedDate) {
            api.get(`horariodisponibilidade?PrestadorID=${prestadorID}&dataSecionada=${selectedDate}`)
                .then((response) => {
                    console.log('Dados horarios:', response.data);
                    setHorarios(response.data);
                })
                .catch((error) => {
                    console.error('Erro ao buscar horarios:', error);
                });
        }
        else { console.error('Erro ao buscar horarios:', prestadorID, selectedDate); }
    };

    const getAgendamentosPelaData = (selectedDate) => { 
        const prestadorID = selectedService?.prestadorID
        if (prestadorID && selectedDate) {
            api.get(`agendamento/agendados?PrestadorId=${prestadorID}&dataSelecionada=${selectedDate}`)
                .then((response) => {
                    console.log('Dados agendados:', response.data);
                    setAgendados(response.data);
                })
                .catch((error) => {
                    console.error('Erro ao buscar agendados:', error);
                });
        }
        else { console.error('Erro ao buscar agendados:', prestadorID, selectedDate); }
    }

    return (
        <>
        <div className="agenda-container">
            <div>
                <div>
                    <h2>Agendamento de Serviços</h2>
                </div>
                <h5>{selectedService?.nome}</h5>
                <h5>{selectedService?.descricao}</h5>
                <h5>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(selectedService?.preco)}</h5>

                <DateSelector selectedDate={selectedDate} onDateSelect={handleDateSelection} />
            </div>

            <TimeSlotSelector
                selectedTimeSlot={selectedTimeSlot}
                onTimeSlotSelect={handleTimeSlotSelection}
                horarios={horarios}
                agendadosList={agendados}
                selectedService={selectedService}
                selectedDate={selectedDate}
            />
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button type="button" onClick={() => handleBotaoVoltar()} className="btn btn-danger">Voltar</button>
            <button className="btn btn-primary" onClick={() => handleAgendamentoSubmit()} >Agendar</button>
        </div>
        </>
    );
}