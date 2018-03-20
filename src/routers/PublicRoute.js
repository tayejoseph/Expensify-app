import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

//this page make it possible that when the user is not authenticated he/she will not be able to access anything on the page

export const PublicRoute = ({ 
    isAuthenticated, 
    component: Component,
    ...rest //this gives us access to other properties of our routes in app.js eg. exact etc    
}) => (
    <Route {...rest} component = {(props) => (
        isAuthenticated ? ( 
           <Redirect to = "/dashboard" />
         ) : (
            <Component {...props} />
        )
    )} />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PublicRoute);