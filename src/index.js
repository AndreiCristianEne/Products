import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// components
import Home from './components/home';
import NotFound from './components/404';
import AddProduct from './components/add_product';
import EditProduct from './components/edit_product';

const App = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/add-product" component={AddProduct}></Route>
                <Route path="/edit-product/:id" component={EditProduct}></Route>
                <Route exact path="/" component={Home}></Route>
                <Route component={NotFound}></Route>
            </Switch>
        </BrowserRouter>
    )
}

ReactDOM.render(<App/>, document.getElementById("root"));



