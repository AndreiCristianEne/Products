import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class AddProduct extends Component {

    constructor() {
        super();
        this.state = { 
            redirect: false,
            image: null,
            name: '',
            price: 0,
            showName: false 
        }
    }

    handleChange = e => {
        this.setState({ 
            [e.target.id]: e.target.value
        });
    }

    handleSubmit = async e => {
        e.preventDefault();
        // console.log(this.state.image);
        // console.log(this.state.name + ' ' + this.state.price);
        if (this.state.image) {
            try {
                var bodyFormData = new FormData();
                bodyFormData.set('name', this.state.name);
                bodyFormData.set('price', Number(this.state.price));
                var res = this.state.image.name.split('.');
                var name = res[res.length - 1];
                bodyFormData.append('image', this.state.image, this.state.name + '.' + name);
        
                await axios.post('/api/products/', 
                    bodyFormData,
                    { headers: {'Content-Type': 'multipart/form-data' }}
                );
                this.setState({ 
                    redirect: true 
                });
            } catch(err) {
                console.log(err);
            }
        }
    }

    handleAvatarUpload = e => {
        this.setState( { image:  e.target.files[0], showName: true } );
    }

    render() {
        if (this.state.redirect) { 
            return <Redirect to='/'/> 
        }

        return(
            <form onSubmit={this.handleSubmit} encType="multipart/form-data" className="container add-form" >
            
            <div className="text-center notification add-title">
                Add a product 
            </div>
                
            <div className="field">
                <label htmlFor="name" className="label">Product Name</label>
                <div className="control">
                    <input id="name" name="name" className="input" onChange={this.handleChange} type="text" placeholder="name..." required/>
                </div>
            </div>

            <div className="field">
                <label htmlFor="price" className="label">Product Price</label>
                <div className="control">
                    <input id="price" name="price" className="input" onChange={this.handleChange} type="text" placeholder="price..." required/>
                </div>
            </div>

            <div className="field">
                <div className="file is-boxed">
                <label className="file-label">
                    <input className="file-input" type="file" onChange={this.handleAvatarUpload} name="image" />
                    <span className="file-cta">
                    <span className="file-icon">
                        <i className="fas fa-upload"></i>
                    </span>
                    <span className="file-label">
                        Upload Product Image
                    </span>
                    {
                        this.state.showName && 
                            <span>
                                {this.state.image.name} ready to upload...
                            </span>
                    }
                    </span>
                </label>
                </div>
            </div>

            <div className="field is-grouped is-grouped-centered add-options">
                <p className="control">
                    <button className="button is-success">
                        <i className="fas fa-paper-plane"> Submit</i>
                    </button>
                </p>
                <p className="control">
                    <Link to="/" className="button">
                            <i className="fas fa-times"> Cancel</i>
                    </Link>
                </p>
            </div>

            </form>
        )
    }

}

export default AddProduct;