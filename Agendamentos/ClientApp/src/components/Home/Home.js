import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryFilter from './CategoryFilter';
import { api } from '../../services/api'
import './Home.css';

export const Home = () => {
    const [services, setServices] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredServices, setFilteredServices] = useState([]);
    const navigate = useNavigate();

    const handleServiceSelection = (service) => {
        navigate('/agendamento', { state: { selectedService: service } });
    };

    useEffect(() => {
        populateServicosData();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            const filteredData = services.filter(
                (service) =>
                    (service.nome.toLowerCase().includes(lowerCaseSearchTerm) ||
                    service.descricao.toLowerCase().includes(lowerCaseSearchTerm))
            );
            setFilteredServices(filteredData);
        } else {
            setFilteredServices(services);
        }
    }, [searchTerm, services]);

    useEffect(() => {
        const categoria = parseInt(categoryFilter, 10);
        if (categoria === 0) {
            setFilteredServices(services);
        } else {
            const filteredCategory = services.filter(
                (service) => service.categoriaID === categoria
            );
            setFilteredServices(filteredCategory);
        }
    }, [categoryFilter, services]);

    const handleFilterChange = (event) => {
        setCategoryFilter(event.target.value);
    };

    const populateServicosData = () => {
        api.get('servico')
        .then((response) => {
            console.log(response.data);
            setServices(response.data);
            setFilteredServices(response.data);
        })
        .catch((error) => {
            console.error('Erro ao buscar serviços:', error);
            alert('Erro ao buscar serviços!');
        });
    };

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleClearSearch = () => {
        setSearchTerm("");
    };

    return (
        <div>
            <div className="main-content">
                <div className="main-content">
                    <p className="typography">Agende sua atividade</p>
                </div>
                <div className="masonryPanel2">
                    <div className="buttonBorder">
                        <div className="search-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </div>
                        <div className="main-content2">
                            <div className="main-content2">
                                <input
                                    id="instantSearch"
                                    className="input-search"
                                    placeholder="Limpeza, Cabelereiro, Oficina"
                                    value={searchTerm}
                                    onChange={handleSearchTermChange}
                                />
                            </div>
                            <div>
                                {searchTerm && (
                                    <button className="btn btn-link clear-button" onClick={handleClearSearch}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>
                <div className="content">
                    <div className="instant-search">Filtrar por:</div>
                    <CategoryFilter
                        categoryFilter={categoryFilter}
                        handleFilterChange={handleFilterChange}
                    />
                </div>
            </div>

            <div className="main-content">
                <div>
                    {filteredServices.map((service) => (
                        <div className="masonryPanel" key={service.id}>
                            <h2>{service.nome}</h2>
                            <p>{service.descricao}</p>
                            <p>{service.categoriaNome}</p>
                            <p>Valor: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(service.preco)}</p>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button className="btn btn-primary" onClick={() => handleServiceSelection(service)}>Agendar</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}