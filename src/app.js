"use strict";

//Written By Taye Joseph Odunfa on the 28/02/2018 - 01/03/2018

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { addExpense } from './actions/expenses'; //note the {} because this is a named export
import { setTextFilter } from "./actions/filters";
import getVisibleExpenses from "./selectors/expenses"; // note no {} because it is a default export
import "normalize.css/normalize.css";
import "./styles/style.scss"
import 'react-dates/lib/css/_datepicker.css'; //the css that came with the react-date library
import './firebase/firebase';


const store = configureStore(); //this is gotten from our configureStore file

//Provide is a redux tag that is used for creating store
const jsx = (
    <Provider store = {store}> 
        <AppRouter />
    </Provider>
);


ReactDOM.render(jsx, document.getElementById("app"))