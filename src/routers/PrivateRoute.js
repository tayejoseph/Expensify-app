import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Header from "../components/Header";

//this page make it possible that when the user is not authenticated he/she will not be able to access anything on the page

export const PrivateRoute = ({ 
    isAuthenticated, 
    component: Component,
    ...rest //this gives us access to other properties of our routes in app.js eg. exact etc    
}) => (
    <Route {...rest} component = {(props) => (
        isAuthenticated ? ( 
           <div>
           <Header/>
           <Component {...props} />
         </div>
         // <Component {...props} /> this is used to take the user to the appropriate pageonce he is authenticated
        ) : (
            <Redirect to = "/" /> //This is a standard component the we used to redirect the page if the user is not authenticated
        )
    )} />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);