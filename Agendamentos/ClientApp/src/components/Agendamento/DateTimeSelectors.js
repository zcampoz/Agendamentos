import React, { useState, useEffect } from 'react';
import { api } from '../../services/api'

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

export const TimeSlotSelector = ({ startDate, endDate, serviceDuration, selectedTimeSlot, onTimeSlotSelect }) => {
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
    const [horarios, setHorarios] = useState([]);

    const accessToken = localStorage.getItem('accessToken');
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
    };

    useEffect(() => {
        // Fazer uma solicitação à API para obter as datas de início e fim disponíveis
        getHorariosDisponiveis();
        //fetchAvailableTimeSlots(startDate, endDate, serviceDuration);
        fetchAvailableTimeSlots('2023-09-15 09:00:00.000', '2023-09-15 18:00:00.000', 30);
    }, [startDate, endDate, serviceDuration]);

    const fetchAvailableTimeSlots = (startDate, endDate, serviceDuration) => {
        const timeSlots = splitTimeSlots(startDate, endDate, serviceDuration);
        setAvailableTimeSlots(timeSlots);
    };

    const splitTimeSlots = (startDate, endDate, serviceDuration) => {
        const timeSlots = [];
        let currentTime = new Date(startDate);

        while (currentTime < new Date(endDate)) {
            var timeSlot = new Date(currentTime);
            timeSlots.push(timeSlot.toLocaleTimeString());
            currentTime = new Date(currentTime.getTime() + serviceDuration * 60 * 1000);
        }

        return timeSlots;
    };

    const handleTimeSlotSelect = (timeSlot) => {
        onTimeSlotSelect(timeSlot);
    };

    const getHorariosDisponiveis = () => {
        const prestadorID = 2;
        const dataSecionada = '2023-11-13T08:00:00';
        api.get(`horariodisponibilidade?PrestadorID=${prestadorID}&dataSecionada=${dataSecionada}`, config)
        .then((response) => {
            setHorarios(response.data);
        })
        .catch((error) => {
            console.error('Erro ao buscar horarios:', error);
        });
    }

    return (
        <div>
            <h3>Selecione um Horário</h3>
            <ul>
                {availableTimeSlots.map((timeSlot) => (
                    <li key={timeSlot}>
                        <label>
                            <input
                                type="checkbox"
                                value={timeSlot}
                                checked={selectedTimeSlot === timeSlot}
                                onChange={() => handleTimeSlotSelect(timeSlot)}
                            />
                            {timeSlot}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
}