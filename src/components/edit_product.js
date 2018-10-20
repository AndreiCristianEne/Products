import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class EditProduct extends Component {
    
    constructor() {
        super();
        this.state = { 
            redirect: false,
            product: '',
            name: '',
            price: '',
            image: null,
            showName: false,
            oldName: '' 
        }
    }

    changeState = () => {
        this.setState({ redirect: true })
    }

    handleSubmit = async event => {
        event.preventDefault();
        try {
            var bodyFormData = new FormData();
            bodyFormData.set('name', this.state.name);
            bodyFormData.set('oldName', this.state.oldName);
            bodyFormData.set('price', Number(this.state.price));
            
            if (this.state.image) {
                var res = this.state.image.name.split('.');
                var name = res[res.length - 1];
                bodyFormData.append('image', this.state.image, this.state.name + '.' + name);
            }
            
            await axios.put(`/api/products/${this.props.match.params.id}`,
                bodyFormData,
                { headers: {'Content-Type': 'multipart/form-data' }}
            )
            this.changeState();
         } catch(err) {
             console.log(err);
         }
    }

    async componentWillMount () {
        try {
           const {data: product} = await axios.get(`/api/products/${this.props.match.params.id}`);
           this.setState({product, oldName: product.name, name: product.name, price: product.price})
        } catch(err) {
            console.log(err);
        }
    }

    deleteProduct = async () => {
        try {
            await axios.delete(`/api/products/${this.props.match.params.id}`);
            //console.log(data);
            this.setState({ 
                redirect: true 
            });
         } catch(err) {
             console.log(err);
         }
    }

    handleChange = e => {
        this.setState({ 
            [e.target.id]: e.target.value
        });
    }

    handleImageChange = e => {
        this.setState({
            image:  e.target.files[0], showName: true
        })
    }

    render() {
        if (this.state.redirect) { 
            return <Redirect to='/'/> 
        }

        return (
            <div>
            <form onSubmit={this.handleSubmit} encType="multipart/form-data" className="container add-form" >
            
            <div className="text-center notification add-title">
                Edit the product 
            </div>
                
            <div className="field">
                <label htmlFor="name" className="label">Product Name</label>
                <div className="control">
                    <input id="name" name="name" onChange={this.handleChange} className="input" type="text" defaultValue={this.state.product.name} required />
                </div>
            </div>

            <div className="field">
                <label htmlFor="price" className="label">Product Price</label>
                <div className="control">
                    <input id="price" name="price" onChange={this.handleChange} className="input" type="text" defaultValue={this.state.product.price} required />
                </div>
            </div>

            <div className="field">
                <div className="file is-boxed">
                <label className="file-label">
                    <input className="file-input" onChange={this.handleImageChange} type="file" name="image" />
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
                        <i className="fas fa-paper-plane"> Edit</i>
                    </button>
                </p>
                <p className="control">
                    <Link to="/" className="button">
                            <i className="fas fa-times"> Cancel</i>
                    </Link>
                </p>
            </div>

            </form>

            <div className="container has-text-centered">
                <button className="button is-danger is-medium" onClick={this.deleteProduct}>
                    <i className="far fa-trash-alt"> Delete</i>
                </button>
            </div>
            </div>
        )
    }
}

export default EditProduct;