import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { startEditExpense, startRemoveExpense } from "../actions/expenses";

export class EditExpensePage extends React.Component {
    onSubmit = ( expense ) => {
           //for us to be able to use edit expense action we must import the page inwhich it is in (editExpense) page
        this.props.startEditExpense(this.props.expense.id, expense);
           this.props.history.push("/");
        };
    onRemove = () => {
        this.props.startRemoveExpense({ id: this.props.expense.id });
            this.props.history.push('/');
        };
    render(){
     return(
       <div>
       <div className = "page-header">
       <div className = "content-container">
       <h1 className = "page-header__title">Edit Epense</h1>
       </div>
       </div>
       <div className = "content-container">
       <ExpenseForm 
       //u can now access all the ExpenseForm props here because the props have been set to super
       expense = {this.props.expense}
       onSubmit = {this.onSubmit}    
       /> 
        <button className = "button button--secondary" 
        onClick = {this.onRemove}>
        Remove Expense</button>   
       </div>
       </div>
    );
    }
};

//this func is for the connect func
const mapStateToProps = (state, props) => ({
     expense: state.expenses.find((expense) => expense.id === props.match.params.id )//this check if the id matches the one in the store
});

const mapDispatchToProps = (dispatch, props) => ({
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
})

//all this connect arguments are the standard on from enzymes
export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);