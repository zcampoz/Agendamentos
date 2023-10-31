import React, { Component } from 'react';
import { api } from '../../services/api'
class CategoryFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            selectedCategory: 'all',
        };
    }

    componentDidMount() {
        const accessToken = localStorage.getItem('accessToken');
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        api.get('categoriaservico', config)
        .then((response) => {
            this.setState({ categories: response.data });
            //setLoading(false);
        })
        .catch((error) => {
            //setLoading(false);
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