import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

class productItem extends Component {

    render() {

        return (
    
        <div className="column is-3">
            <div className="card">
            
            <div className="card-image">
                <Link to={'/edit-product/'+this.props.product._id} className="level-right"> 
                    <i className="button is-success fas fa-user-edit"></i>    
                </Link> 
                <figure className="image is-4by3">
                    <img src={`${this.props.product.name}.jpg`} alt="alternate" 
                         onError={ () => this.img.src = 'default.jpg' }/>
                </figure>
            </div>
            
            <div className="card-content">
            <div className="content">
                    <div className="product-name"><strong>Product: </strong>{this.props.product.name}</div>
                    <div className="product-price"><strong>Price: </strong>{this.props.product.price}</div>
            </div>

            </div>    
            </div>
        </div>
           
        )
    
    }

}

export default productItem;