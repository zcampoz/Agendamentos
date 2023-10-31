import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DateSelector, TimeSlotSelector } from './DateTimeSelectors';
import { api } from '../../services/api';

export const Agendamento = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

    const location = useLocation();
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
        const { selectedService, selectedTimeSlot } = this.state;

        if (selectedService && selectedTimeSlot) {
            const user = localStorage.getItem('user');

            const data = {
                usuarioId: user.id, 
                servicoId: selectedService.id, 
                dataAgendamento: selectedDate,
                horarioAgendamento: selectedTimeSlot,
            };

            api.post('agendamento/agendar', data, config)
            .then((response) => {
                console.log('Agendamento bem-sucedido:', response.data);
            })
            .catch((error) => {
                console.error('Erro ao agendar serviço:', error);
            });
        }
    };

    return (
        <div>
            <h2>Agendar Serviço</h2>
            {/* Mostrar dados do Serviço (Get/servico/:id) */}
            <h3>{selectedService.nome}</h3>
            <h4>{selectedService.descricao}</h4>
            <h4>{selectedService.preco}</h4>

            {/* Componente de seleção de data */}
            <DateSelector selectedDate={selectedDate} onDateSelect={handleDateSelection} />

            {/* Componente de seleção de horário */}
            <TimeSlotSelector selectedTimeSlot={selectedTimeSlot} onTimeSlotSelect={handleTimeSlotSelection} />

            {/* Botão para confirmar o agendamento */}
            <button onClick={handleAgendamentoSubmit}>Agendar</button>
        </div>
    );
}