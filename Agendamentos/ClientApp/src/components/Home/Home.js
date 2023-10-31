import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryFilter from './CategoryFilter';
import { api } from '../../services/api'
import './Home.css';

export const Home = () => {
    const [services, setServices] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState("0");
    const navigate = useNavigate();

    const handleServiceSelection = (service) => {
        navigate('/agendamento', { state: { selectedService: service } });
    };

    useEffect(() => {
        populateServicosData();
    }, []);

    const handleFilterChange = (event) => {
        setCategoryFilter(event.target.value);
    };

    const filteredServices =
        categoryFilter === "0"
            ? services
            : services.filter((service) => service.categoriaID == categoryFilter);

    const populateServicosData = () => {
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        console.log(config);
        api.get('servico', config)
        .then((response) => {
            console.log(response);
            setServices(response.data);
        })
        .catch((error) => {
            console.error('Erro ao buscar serviços:', error);
        });
    };

    return (
        <div>
            <div className="main-content">
                <div className="main-content">
                    <p className="typography">Encontre um serviço</p>
                </div>
                <div className="masonryPanel2">
                    <div className="buttonBorder">
                        <div className="search-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </div>
                        <div className="main-content2">
                            <input
                                className="input-search"
                                placeholder="Limpeza, Cabelereiro, Oficina"
                            ></input>
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
                        <div className="masonryPanel" key={service.categoriaID}>
                            <h2>{service.nome}</h2>
                            <p>{service.descricao}</p>
                            <p>{service.categoriaNome}</p>
                            <p>Preço: {service.preco}</p>
                            <button onClick={() => handleServiceSelection(service)}>Agendar</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}