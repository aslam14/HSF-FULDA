import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import  { Redirect } from 'react-router-dom'

import './componentStyles/productminified.scss';
import {
    Button
}
from 'reactstrap';

class ProductMinified extends Component {
    constructor(props) {
        super(props);

        this.state = {
    
        };

        this.handleParentClick = this.handleParentClick.bind(this);
    }

    handleChildClick(e) {
        e.stopPropagation();
        console.log('child');
       
    }

    handleParentClick(e) {
        e.stopPropagation();
        this.props.history.push(`/product/id=${this.props.productId}`);
    }

    render() {
        return (
            <div className='productWrapper boxShadow' onClick={this.handleParentClick}>
                <img src={this.props.img} className='image'/>
                <div className='descWrapper'>
                    <div class='headerWrapper'>
                        <h3 className='title'>{this.props.name}</h3>
                        <h3 className='price'>&euro;{this.props.cost}</h3>
                    </div>
                    <p>{this.props.desc}</p>
                    <div class='buttonsWrapper02'>
                        <Button className='buyButton' onClick={this.handleChildClick}>Buy Item</Button>
                        {this.props.remove !== '1' &&
                        <Button className='cartButton'>Add to Cart</Button>}
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ProductMinified);