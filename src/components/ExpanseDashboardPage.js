import React from "react";
import ExpenseList from './ExpenseList';
import ExpenseListFilters from "./ExpenseListFilters";
import ExpensesSummary from "./ExpensesSummary";

//I think we didn't export ExpanseDashboardPage directly because it does not contains props
//that we want to also test unlike the ExpenseList in the Expenselist page
const ExpanseDashboardPage = () => (
    <div>
    <ExpensesSummary />
    <ExpenseListFilters />
    <ExpenseList />    
    </div>
);

export default ExpanseDashboardPage;