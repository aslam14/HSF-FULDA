import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import styles from './componentStyles/SearchResults.module.css';
import './componentStyles/search.scss';
import {
    Container,
    Row,
    Col
}
from 'reactstrap';
import ProductMinified from './ProductMinified';

class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: ['All'],
            results: [],
            selectedIndex: (this.props.match.params.product_category === undefined) ? 0 : this.props.match.params.product_category,
            searchCategory: this.props.match.params.product_category,
            searchTerm: this.props.match.params.term,
            selected: 0
        };
    }

    getCategories = () => {
        axios.get('/api/get/categories').then(res => {
            for (let i = 0; i < res.data.length; i++) {
                this.setState(
                    (state) => ({ categories: [...this.state.categories, res.data[i].name] }),
                    () => console.log(this.state.categories)
                );
            }
        });
    };

    getResult = (term, product_category) => {
        axios.get(`/api/get/search?term=${term}&categoryId=${product_category}`).then(res => {
            this.setState({
                results: res.data 
            });
        })
    }

    getResults = (a, b) => {
        axios.get(`/api/get/allproducts?type=${a}&term=${b}`).then(res => {
            for (let i = 0; i < res.data.length; i++) {
                this.setState(
                    (state) => ({ results: [...this.state.results, res.data[i]] }),
                    () => console.log(this.state.results)
                );
            }
        })
    }

    componentWillMount() {
        this.getCategories();
        this.getResults('Name', '');
        this.getResult(this.props.match.params.term, this.props.match.params.product_category);
    };


    categoryChange(val) {
      this.setState(
            (state) => ({ results: [], selected: val }),
            this.getResult(this.state.searchTerm, val)
        )
    };

    checkSelected(clickedId, currentId) {
        console.log({clickedId});
        console.log({currentId})
        if (clickedId === currentId) {
            return styles.selected
        } else {
            return styles.notSelected
        }
    }
            
render() {
    return (
        <Container className='searchContainer'>
            <Row>
                <Col sm='3' className='affix boxShadow'>
                    <h4 className='categoryTitle'>Categories</h4>
                    <ul className='categoryList'>
                        {this.state.categories.map((value, index) => {
                            return <li className= {`${styles.categoryItem} ${this.checkSelected(this.state.selected, index)} `}
                            key={index} value={value} onClick={() => {this.categoryChange(index)}}> 
                                {value} </li>
                        })}
                    </ul>
                </Col>
                <Col >
                    {this.state.results.map(result => {
                        return <ProductMinified name={result.name} desc={result.description} price={result.cost} img={result.image} prodId={result.id} remove='0'/>
                    })}
                </Col>
            </Row>
        </Container>
    )
  }
}

export default withRouter(SearchResults);