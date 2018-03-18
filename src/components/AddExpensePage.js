import React from "react";
import { connect } from 'react-redux'; //this help use to connect the datas we get from the expenseform to the store
import ExpenseForm from "./ExpenseForm";
import { startAddExpense } from "../actions/expenses";

export class AddExpensePage extends React.Component{
    onSubmit = (expense) => {
        this.props.startAddExpense(expense);
        this.props.history.push("/");
    };
        render(){
            return (
                <div>
                    <h1>Add Expense</h1>
                    <ExpenseForm
                        onSubmit={this.onSubmit}
                         />
                </div>
            )
        }
};

const mapDispatchToProps = (dispatch) => ({
    startAddExpense: (expense) => dispatch(startAddExpense(expense))
});
  
export default connect(undefined, mapDispatchToProps)(AddExpensePage); //this is used to connect startAddExpenses to the store