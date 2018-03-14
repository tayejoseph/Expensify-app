import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { editExpense, removeExpense } from "../actions/expenses";

export class EditExpensePage extends React.Component {
    onSubmit = ( expense ) => {
           //for us to be able to use edit expense action we must import the page inwhich it is in (editExpense) page
           this.props.editExpense(this.props.expense.id, expense);
           this.props.history.push("/");
        };
    onRemove = () => {
            this.props.removeExpense({ id: this.props.expense.id });
            this.props.history.push('/');
        };
    render(){
     return(
       <div>
       <ExpenseForm 
       //u can now access all the ExpenseForm props here because the props have been set to super
       expense = {this.props.expense}
       onSubmit = {this.onSubmit}    
       /> 
        <button onClick = {this.onRemove}>
        Remove</button>   
       </div>
    );
    }
};

//this func is for the connect func
const mapStateToProps = (state, props) => ({
     expense: state.expenses.find((expense) => expense.id === props.match.params.id )//this check if the id matches the one in the store
});

const mapDispatchToProps = (dispatch, props) => ({
    editExpense: (id, expense) => dispatch(editExpense(id, expense)),
    removeExpense: (data) => dispatch(removeExpense(data))
})

//all this connect arguments are the standard on from enzymes
export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);