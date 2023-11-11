import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DateSelector, TimeSlotSelector } from './DateTimeSelectors';
import { api } from '../../services/api';

export const Agendamento = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();
    const selectedService = location.state && location.state.selectedService;

    const accessToken = localStorage.getItem('accessToken');
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    };

    const handleDateSelection = (date) => {
        setSelectedDate(date);
    };

    const handleTimeSlotSelection = (timeSlot) => {
        setSelectedTimeSlot(timeSlot);
    };


    const handleAgendamentoSubmit = () => {
        if (location.state && location.state.selectedService && selectedTimeSlot) {
            const userId = parseInt(localStorage.getItem('userId'), 10);

            const data = {
                usuarioId: userId,
                servicoId: location.state.selectedService.id,
                prestadorId: location.state.selectedService.prestadorID,
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

    return (
        <div>
            <h2>Agendar Serviço</h2>
            {/* Mostrar dados do Serviço (Get/servico/:id) */}
            <h3>{selectedService.nome}</h3>
            <h4>{selectedService.descricao}</h4>
            <h4>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(selectedService.preco)}</h4>

            {/* Componente de seleção de data */}
            <DateSelector selectedDate={selectedDate} onDateSelect={handleDateSelection} />

            {/* Componente de seleção de horário */}
            <TimeSlotSelector selectedTimeSlot={selectedTimeSlot} onTimeSlotSelect={handleTimeSlotSelection} />

            {/* Botão para confirmar o agendamento */}
            <button onClick={handleAgendamentoSubmit}>Agendar</button>
        </div>
    );
}