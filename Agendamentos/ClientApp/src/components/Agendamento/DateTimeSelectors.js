import React, { useState, useEffect } from 'react';

export const DateSelector = ({ onDateSelect }) => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateSelect = (event) => {
        const selectedDate = event.target.value;
        setSelectedDate(selectedDate);
        onDateSelect(selectedDate);
    };

    const currentDate = new Date().toISOString().split('T')[0];

    return (
        <div>
            <h3>Selecione uma Data</h3>
            <input
                type="date"
                value={selectedDate || ''}
                onChange={handleDateSelect}
                min={currentDate}
            />
        </div>
    );
}

export const TimeSlotSelector = ({ selectedDate, selectedService, agendadosList, horarios, selectedTimeSlot, onTimeSlotSelect }) => {
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

    useEffect(() => {
        console.log('Horários atualizados:', horarios);
        console.log('Horários agendadosList:', agendadosList);
        fetchAvailableTimeSlots(horarios.horaInicio, horarios.horaFim, agendadosList, selectedDate);
    }, [horarios, agendadosList, selectedDate]);

    const fetchAvailableTimeSlots = (startDate, endDate, agendadosList, selectedDate) => {
        const serviceDuration = selectedService.duracaoEstimada; 
        const agendados = agendadosList.map((agendamento) => new Date(agendamento.dataHora).toLocaleTimeString());
        const timeSlots = splitTimeSlots(startDate, endDate, serviceDuration, agendados, selectedDate);
        
        setAvailableTimeSlots(timeSlots);
    };

    const splitTimeSlots = (startDate, endDate, serviceDuration, agendados, selectedDate) => {
        const timeSlots = []; 
        const referenceDate = selectedDate;

        let currentTime = new Date(`${referenceDate}T${startDate}`);
        const endTime = new Date(`${referenceDate}T${endDate}`);
        var index = 0;
        while (currentTime < endTime) {
            const timeSlot = new Date(currentTime);
            const timeSlotString = timeSlot.toLocaleTimeString();
            const isAgendado = agendados.includes(timeSlotString);

            timeSlots.push({
                index: index,
                time: timeSlotString,
                checked: isAgendado,
                disabled: isAgendado,
            });

            currentTime = new Date(currentTime.getTime() + serviceDuration * 60 * 1000);
            index++;
        }

        return timeSlots;
    };

    const handleTimeSlotSelect = (timeSlot) => {
        onTimeSlotSelect(timeSlot.time);
    };

    return (
        <div>
            <h3>Horários Disponíveis</h3>
            {availableTimeSlots.length > 0 ? (
                <>
                <div className="agenda-time-picker">
                    
                    {availableTimeSlots.map((timeSlot) => (
                        <div key={timeSlot.index} className="agenda-time-picker-item form-check">
                            <input id={`chk_${timeSlot.index}`}
                            type="checkbox"
                            className="form-check-input"
                            value={timeSlot.index}
                            checked={selectedTimeSlot === timeSlot.time}
                            disabled={timeSlot.disabled}
                            onChange={() => handleTimeSlotSelect(timeSlot)}
                            />
                            <label class="form-check-label" for={`chk_${timeSlot.index}`}>{timeSlot.time}</label>
                        </div>
                    ))}
                </div>
                </>
            ) : (
                    <p>Nenhum horário disponível para a data selecionada.</p>
            )}
        </div>
    );
}