import React, { Component } from 'react';
import { DateSelector, TimeSlotSelector } from './DateTimeSelectors';

export class Agendamento extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedService: null,
            selectedDate: null,
            selectedTimeSlot: null,
        };
    }

    handleServiceSelection = (service) => {
        this.setState({ selectedService: service });
    };

    handleDateSelection = (date) => {
        this.setState({ selectedDate: date });
    };

    handleTimeSlotSelection = (timeSlot) => {
        this.setState({ selectedTimeSlot: timeSlot });
    };

    handleAgendamentoSubmit = () => {
        const { selectedService, selectedTimeSlot } = this.state;
        if (selectedService && selectedTimeSlot) {
            fetch('api/agendamento', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    serviceId: selectedService.id,
                    timeSlotId: selectedTimeSlot.id,
                }),
            })
            .then(response => response.json())
            .then(data => {
                // Lógica de tratamento da resposta da API
                console.log('Agendamento bem-sucedido:', data);
            })
            .catch(error => {
                console.error('Erro ao agendar serviço:', error);
            });
        }
    };

    render() {
        // Renderizar opções de agendamento, incluindo seleção de datas e horários
        return (
            <div>
                <h2>Agendar Serviço</h2>
                {/* Mostrar dados do Serviço(Get/servico/:id) */}

                {/* Componente de seleção de data */}
                <DateSelector
                    selectedDate={this.state.selectedDate}
                    onDateSelect={this.handleDateSelection}
                />

                {/* Componente de seleção de horário */}
                <TimeSlotSelector
                    selectedTimeSlot={this.state.selectedTimeSlot}
                    onTimeSlotSelect={this.handleTimeSlotSelection}
                />

                {/* Botão para confirmar o agendamento */}
                <button onClick={this.handleAgendamentoSubmit}>Agendar</button>
            </div>
        );
    }
}