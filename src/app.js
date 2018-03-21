"use strict";

//Written By Taye Joseph Odunfa on the 28/02/2018 - 01/03/2018

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import AppRouter, { history } from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { startSetExpenses } from './actions/expenses'; //note the {} because this is a named export
import { login, logout } from "./actions/auth";
import getVisibleExpenses from "./selectors/expenses"; // note no {} because it is a default export
import "normalize.css/normalize.css";
import "./styles/style.scss"
import 'react-dates/lib/css/_datepicker.css'; //the css that came with the react-date library
import { firebase } from './firebase/firebase';
import LoadingPage from "./components/LoadingPage";

const store = configureStore(); //this is gotten from our configureStore file

//Provide is a redux tag that is used for creating store
const jsx = (
    <Provider store = {store}> 
        <AppRouter />
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
    if(!hasRendered){
         ReactDOM.render(jsx, document.getElementById("app"));
         hasRendered = true;
    }
};

//this will show when our expenses is not ready
ReactDOM.render(<LoadingPage />, document.getElementById("app"));

//this will render the page when our expenses is ready from firebase




//this is used to check if the a user is loggedin or loggedout 
firebase.auth().onAuthStateChanged((user) => {
if (user) {
    store.dispatch(login(user.uid));//user.uid give u the user id given by google to each user
//Any code here run only when the user is logged in
//the code below is used to fetch the users expenses when he's logged in
store.dispatch(startSetExpenses()).then(() => {
    renderApp();
    if(history.location.pathname === "/"){
        history.push("/dashboard");//this code take the user to the dashboard page as soon as he logs in
    }
});
} else {
    store.dispatch(logout()); //this is connect to our auth reducer
    renderApp();
    //this takes use to the homepage as soon as the user logs out
    history.push("/"); //note history.push() takes u to the path u want to go to
}
});