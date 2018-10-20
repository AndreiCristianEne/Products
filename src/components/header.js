import React from 'react';
import { Link } from 'react-router-dom';
 
const Header = () => {
    return(
        <div className="header">
            <div className="header-title">
                Products app
            </div>
            <div className="header-subtitle">
                - App developed using -
                <div className="columns">
                    <div className="column">            
                        <i className="fab fa-2x fa-react"></i> 
                    </div>
                    <div className="column">
                        <i className="fab fa-2x fa-node"></i> 
                    </div>
                </div> 
            </div>

            <div className="header-description">
                - On the right side of the page, you can see all the products currently existing in the system's database -   
            </div>
            <div className="header-description">
                - You can fitler out the results by searching for a product by its <i>name</i> -   
            </div>
            <div className="header-description">
                - The application functionality allows you to create a new product <i>(click the button below)</i>, or edit & delete one of the existing ones -   
            </div>
            <hr/>

            <div className="button-div">
                <Link to="/add-product" className="button is-success">
                    <i className="fas fa-plus"> Add a product</i>
                </Link>
            </div> 

        </div>
    )
}


export default Header;