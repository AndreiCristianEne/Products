import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {

    return (
        <div className="container text-center">
            <p className="not-found">
                File not Found 
            </p>
            <div className="subtitle">
                - you have entered an invalid route -
            </div>
            <div className="subtitle">
                - click the button below to go back to the root of the App -
            </div>

            <Link to="/" className="button is-primary not-found-button">
                <i className="fas fa-arrow-left"> Products Home</i>
            </Link>
        </div>
    )

}

export default NotFound;