import React, { Component } from 'react';

class DateSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: null, // Armazena a data selecionada
        };
    }

    handleDateSelect = (event) => {
        const selectedDate = event.target.value;
        this.setState({ selectedDate });
        // Chame a função de seleção de data passada como prop
        this.props.onDateSelect(selectedDate);
    }

    render() {
        return (
            <div>
                <h3>Selecione uma Data</h3>
                <input
                    type="datetime-local"
                    value={this.state.selectedDate || ''}
                    onChange={this.handleDateSelect}
                />
            </div>
        );
    }
}

class TimeSlotSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            availableTimeSlots: [], // Lista de slots de horário disponíveis
        };
    }

    componentDidMount() {
        // Fazer uma solicitação à API para obter as datas de início e fim disponíveis
        //this.fetchAvailableTimeSlots(this.props.startDate, this.props.endDate, this.props.serviceDuration);
        this.fetchAvailableTimeSlots('2023-09-15 09:00:00.000', '2023-09-15 18:00:00.000', 30);
    }

    fetchAvailableTimeSlots(startDate, endDate, serviceDuration) {
        debugger
        // Dividir os horários em slots de acordo com a duração do serviço
        const timeSlots = this.splitTimeSlots(startDate, endDate, serviceDuration);

        this.setState({ availableTimeSlots: timeSlots });
    }

    splitTimeSlots(startDate, endDate, serviceDuration) {
        const timeSlots = [];
        let currentTime = new Date(startDate);

        while (currentTime < new Date(endDate)) {
            timeSlots.push(new Date(currentTime));
            currentTime = new Date(currentTime.getTime() + serviceDuration * 60 * 1000);
        }

        return timeSlots;
    }

    render() {
        const { selectedTimeSlot } = this.props;
        const { availableTimeSlots } = this.state;

        return (
            <div>
                <h3>Selecione um Horário</h3>
                <ul>
                    {availableTimeSlots.map((timeSlot) => (
                        <li key={timeSlot}>
                            <label>
                                <input
                                    type="radio"
                                    value={timeSlot}
                                    checked={selectedTimeSlot === timeSlot}
                                    onChange={() => this.handleTimeSlotSelect(timeSlot)}
                                />
                                {timeSlot.toLocaleTimeString()}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export { DateSelector, TimeSlotSelector };
