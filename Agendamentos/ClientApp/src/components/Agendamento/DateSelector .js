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

export default DateSelector;