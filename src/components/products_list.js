import React, { Component } from 'react';
import ProductItem from './product_list_item';
import {  } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class productList extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }
    }

    updateSearch(event) {
        this.setState({ search: event.target.value });
    } 

    render() {

        let filteredProducts = this.props.products.filter(
            (product) => {
                // return the product only if it contains the value of the search variable
                return product.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );

        const items = filteredProducts.map((item) => {
            return (
                <ProductItem key={item._id} product={item}/>
            )
        })
        
        return (
            <div>

                <div className="field is-grouped">
                    <p className="control is-expanded">
                        <input className="input" type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} placeholder="Find a product ..." />
                    </p>
                </div>
            
                <div className="columns is-multiline">
                    {items}
                </div>

            </div>    
            
        )

    }
    
}

export default productList;