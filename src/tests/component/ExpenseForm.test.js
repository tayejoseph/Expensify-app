import React from "react";
import { shallow } from "enzyme";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";
import moment from "moment";

//All the func that u are not familiar are gotten from the enzyme Docs 

//this test for changes in the UI that is why we need to snapshot it
test("should render ExpenseForm correctly", () => {
  const wrapper = shallow(<ExpenseForm />)
  expect(wrapper).toMatchSnapshot();
  });

test("should render ExpenseForm correctly with expense data", () => {
  const wrapper = shallow(<ExpenseForm expense = {expenses[1]} />);
  expect(wrapper).toMatchSnapshot();
});

test("should render error for invalid form submission", () => {
    const wrapper = shallow(<ExpenseForm />);
    //this check the snapshot before changes are made on the form
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', {preventDefault: () => {}});//this is used to check when the form is submitted
    //the prevent default is just their so that the test will not throw an error when it runs because of the "e" argument 
    //we added on the onsubmit func
    expect(wrapper.state('error').length).toBeGreaterThan(0); //this mean the length of the error state must be greater than 0
    //this check for snapshop after changes are done to the form
    expect(wrapper).toMatchSnapshot();
});


// the code below checks for changes in input change that's why we don't need to snapshot it
test("Should set description on input change", () => {
    const value = "New description";
    const wrapper = shallow(<ExpenseForm />);
    //this helps u find the first input filed
    //the object that contain target means it should access the e.target.value
    wrapper.find("input").at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('description')).toBe(value);
});

test("should set note on text area change", () => {
    const value = "New note value";
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("textarea").simulate('change', {
        target: { value }
    });
    expect(wrapper.state('note')).toBe(value);
});

test("Should set amount if valid input", () => {
    const value = '23.50';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("input").at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toBe(value);
});

test("Should not set amount if input is not valid", () => {
    const value = '23.122';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("input").at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toBe("");
});

test("should call onsubmit prop for valid form submission", () => {
    const onSubmitSpy = jest.fn();
    //note for the Expense tag below the onSubmit has been assign to onSubmitspy
    const wrapper = shallow(<ExpenseForm expense = {expenses[0]} onSubmit = {onSubmitSpy} />);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    });
    expect(wrapper.state('error')).toBe("");
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    })
    //the .toHaveBeenLastCalledWith is used to check the datas that last makes the submit calls
});

test("should set new data on date change", () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    //this find element according to their component name
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});

test("should set calender focus onchange", () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onFocusChange')({focused});
    expect(wrapper.state('calenderFocused')).toBe(focused);
});