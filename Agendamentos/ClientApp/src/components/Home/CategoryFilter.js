import React, { Component } from 'react';

class CategoryFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            selectedCategory: 'all',
        };
    }

    componentDidMount() {
        // Fazer a requisição à API
        fetch('api/categoriaservico')
            .then(response => response.json())
            .then(data => {
                this.setState({ categories: data });
            })
            .catch(error => {
                console.error('Erro ao carregar categorias de serviço:', error);
            });
    }

    handleFilterChange = (event) => {
        this.setState({ selectedCategory: event.target.value });
    }

    render() {
        const { categoryFilter, handleFilterChange } = this.props;

        return (
            <div>
                <select
                    className="button-filter"
                    id="service-category"
                    value={categoryFilter}
                    onChange={handleFilterChange}
                >
                    <option value="0">Todas as Categorias</option>
                    {this.state.categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.nome}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
}

export default CategoryFilter;