import React, {Component} from 'react';
import 'bulma/css/bulma.css';
import axios from 'axios';

import {  } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import ProductList from '../components/products_list';
import Header from '../components/header';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products:  []
        };
    }

    componentWillMount () {
        try {
        //    const {data: products} = await axios.get('http://localhost:4000/api/products/')
        //    this.setState({products})
        axios.get('/api/products/').then( response => {
            //console.log(response);
            this.setState({ products: response.data })
        })
        } catch(err) {
            console.log(err);
        }
    }

    render() {

        return (
            <div className="columns">
            
                <div className="column is-3 header-column">
                    <Header />
                </div>

                <div className="column is-7 is-offset-1 products-column">
                    <div className="section">
                        <ProductList products={this.state.products}></ProductList>
                    </div>
                </div>
            
            </div>
        )

    }

}

export default Home;
