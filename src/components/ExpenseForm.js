import React from "react";
import moment from 'moment'; // this is a library for the date widget
import { SingleDatePicker } from 'react-dates'; //this is a react date library


// const now = moment();
// console.log(now.format("MM Do, YYYY"))


export default class ExpenseForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        description: props.expense ? props.expense.description : '',
        note: props.expense ? props.expense.note : "",
        amount: props.expense ? (props.expense.amount / 100).toString() : "", //this changes amount to decimals and also to string
        createdAt: props.expense ? moment(props.expense.createdAt) : moment(), //moment() this give us the current time and date this function is gotten from the library
        calenderFocused : false,
        error: ' '
    };
    }
    onDescriptionChange = (e) =>{
        const description = e.target.value;
        this.setState(() => ({
            description
        }));
    };
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    };
    onAmountChange = (e) => {
        const amount = e.target.value;
    if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)){ //this make use to be able to only type in numbers and has only two numbers after the decimal point            
        //the !amount  mean if amount is false which can only be when u click backspace or ur delect key so this help
        //us to be able to highlight our text and delete it
        this.setState(() => ({ amount }))
        }
    };
    onDateChange = (createdAt) => {
        if(createdAt){
        this.setState(() => ({ createdAt }));
        }
    };
    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calenderFocused: focused }));
    };
    onSubmit = (e) => {
        e.preventDefault();
        if(!this.state.description || !this.state.amount){
            const error = "Please provie description and amount";
            this.setState(() => ({ error }));
        }else{
            this.setState(() => ({ error: "" }))
    //when the form get submitted it save its value on the prop onsubmitted which is used in the AddExpensePage.js page
            this.props.onSubmit({
                description : this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100, //the 10 their means base 10
                createdAt: this.state.createdAt.valueOf(), //this get the data in milliseconds which is a result of valueof() added to it
                note: this.state.note
            });
        }
    }
    render(){
    return (
        <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit = {this.onSubmit}>
        <input 
        type = "text"
        placeholder = "Description"
        autoFocus //let make the input immediately active as soon as u open the page
        value = {this.state.description}
        onChange = {this.onDescriptionChange}
        />
        <input 
        type = "number"
        placeholder = "Amount"
        value = {this.state.amount}
        onChange = {this.onAmountChange}
        />
        <SingleDatePicker //the the arguments and function from this selector are gotten from the react-dates library
        date = {this.state.createdAt}
        onDateChange = {this.onDateChange}
        focused = {this.state.calenderFocused}
        onFocusChange = {this.onFocusChange}
        numberOfMonths = {1}
        isOutsideRange = {() => false}
        />
        <textarea
        placeholder = "Add a note for your expense (optional)"
        value = {this.state.note}
        onChange = {this.onNoteChange}>
        </textarea>
        <button>Add Expense</button>
        </form>
        </div>
    )

    }
}