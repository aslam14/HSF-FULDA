import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import SellerView from './SellerView';
import BuyerView from './BuyerView';

class ProfileView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: 1,
            isSeller: false
        };
    }

    render() {
        return (
            <p>
            { this.state.isSeller === true && 
            <SellerView userId={this.userId} /> }
            { this.state.isSeller === false && 
            <BuyerView userId={this.userId} /> }
            </p>
        )
    }
}

export default withRouter(ProfileView);