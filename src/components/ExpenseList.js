import React from "react";
import { connect } from 'react-redux';
import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from "../selectors/expenses";

//the props of expenselist is gotten from mapstatetoprops
// we are exporting ExpenseList directly because we want to only test and its props it not test it with ExpenseListItem
export const ExpenseList = (props) => (
    <div className = "content-container">
    <div className = "list-header">
    <div className = "show-for-mobile">Expenses</div>
    <div className = "show-for-desktop">Expense</div>        
    <div className = "show-for-desktop">Amount</div> 
    </div>
    <div className = "list-body">
    {
    props.expenses.length === 0 ? (
       <div className = "list-item list-item--message">
        <span>No expenses</span>
       </div>
         ) : (
        props.expenses.map((expense) => {
        return <ExpenseListItem key = {expense.id} {...expense} />; //the {...expense} this make expenselistitem to have all the props of expense    
     })
     )
    }
    </div>
    
    </div>
);

//the state in mapstatetoprops is our store it is gotten from the provider function in app.js
const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)  // All this props are gotten from our store
    };
};


//this connect function is a redux func that connects to the provider function in app.js

export default connect(mapStateToProps)(ExpenseList);