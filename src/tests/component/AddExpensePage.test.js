import React from "react";
import { shallow } from "enzyme";
import { AddExpensePage } from "../../components/AddExpensePage";
import expenses from "../fixtures/expenses";

let addExpense, history, wrapper;
//the beforeEach is a enzyme func that takes code that are to be runned before each test
//instead of use writting about the code before every text
beforeEach(() => {
         addExpense = jest.fn();
         history = { push: jest.fn() };
         wrapper = shallow(<AddExpensePage addExpense = {addExpense} history = {history} />);  
})
test('should render add expense page correctly', () => {
     expect(wrapper).toMatchSnapshot();
});


test("should handle onSubmit", () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(addExpense).toHaveBeenLastCalledWith(expenses[1]);
})