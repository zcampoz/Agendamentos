﻿import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DateSelector, TimeSlotSelector } from './DateTimeSelectors';
import { api } from '../../services/api';

export const Agendamento = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [horarios, setHorarios] = useState([]);
    const [agendados, setAgendados] = useState([]);

    const location = useLocation();
    const navigate = useNavigate();
    const selectedService = location.state?.selectedService; 

    const accessToken = localStorage.getItem('accessToken');
    const userId = parseInt(localStorage.getItem('userId'), 10);
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    };

    const handleDateSelection = (date) => {
        setSelectedDate(date);
        getHorariosDisponiveis(selectedService?.prestadorID, date);
        getAgendamentosPelaData(date);
    };

    const handleTimeSlotSelection = (timeSlot) => {
        setSelectedTimeSlot(timeSlot);
    };

    const handleAgendamentoSubmit = () => {
        if (selectedService && selectedTimeSlot) {
            const data = {
                usuarioId: userId,
                servicoId: selectedService.id,
                prestadorId: selectedService.prestadorID,
                dataHora: selectedDate.toString(),
                horarioAgendamento: selectedTimeSlot.toString(),
            };

            api.post('agendamento', data, config)
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
            api.get(`horariodisponibilidade?PrestadorID=${prestadorID}&dataSecionada=${selectedDate}`, config)
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
            api.get(`agendamento/agendados?PrestadorId=${prestadorID}&dataSelecionada=${selectedDate}`, config)
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
        <div>
            <h2>Agendar Serviço</h2>
            <h3>{selectedService?.nome}</h3>
            <h4>{selectedService?.descricao}</h4>
            <h4>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(selectedService?.preco)}</h4>

            {/* Componente de seleção de data */}
            <DateSelector selectedDate={selectedDate} onDateSelect={handleDateSelection} />

            {/* Componente de seleção de horário */}
            <TimeSlotSelector
                selectedTimeSlot={selectedTimeSlot}
                onTimeSlotSelect={handleTimeSlotSelection}
                horarios={horarios}
                agendadosList={agendados}
                selectedService={selectedService}
                selectedDate={selectedDate}
            />

            {/* Botão para confirmar o agendamento */}
            <button onClick={handleAgendamentoSubmit}>Agendar</button>
        </div>
    );
}