import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Home.css';
import CategoryFilter from './CategoryFilter';

export class Home extends Component {
  static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = { services: [], loading: true, categoryFilter: "0" };
    }

    componentDidMount() {
        this.populateServicosData();
    };

    handleFilterChange = event => this.setState({ categoryFilter: event.target.value });

    render() {

    const { categoryFilter } = this.state;

    const filteredServices =
        categoryFilter === "0"
            ? this.state.services
            : this.state.services.filter((service) => service.categoriaID == categoryFilter);

        return (
            <div>
                <div className="main-content">
                    <div className="main-content">
                        <p className="typography">Encontre um servico</p>
                    </div>
                    <div className="masonryPanel2">
                        <div className="buttonBorder">
                            <div className="search-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </div>
                            <div className="main-content2">
                                <input className="input-search" placeholder="Limpeza, Cabelereiro, Oficina"></input>
                            </div>
                        </div>
                        <hr />
                    </div>
                    <div className="content">
                        <div className="instant-search">Filtrar por:</div>
                        <CategoryFilter
                            categoryFilter={categoryFilter}
                            handleFilterChange={this.handleFilterChange}
                        />
                    </div>
                </div>

                <div className="main-content">
                    <div >
                        {filteredServices.map((service) => (
                            <div className="masonryPanel" key={service.categoriaID}>
                                <h2>{service.nome}</h2>
                                <p>{service.descricao}</p>
                                <p>{service.categoriaNome}</p>
                                <p>Preço: {service.preco}</p>
                                <Link to='/agendamento'>Agendar</Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    populateServicosData() {
        fetch('api/servico')
            .then(response => response.json())
            .then(dados => {
                this.setState({ services: dados, loading: false });
            })
    }
}
