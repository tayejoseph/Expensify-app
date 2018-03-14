import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";


test('should set default state', () => {
    const state = expensesReducer(undefined, {type: "@@INIT" });
    expect(state).toEqual([]);
});

test('should remove expense by id', () => {
    const action = {
        type: "REMOVE_EXPENSE",
        id: expenses[1].id
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]])
});

test('should not remove expense if id not found', () => {
    const action = {
        type: "REMOVE_EXPENSE",
        id: "-1"
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses)
});

test("should add expense", () => {
    const expense = {
    id: "109",
    description: "Scholarship",
    note: "",
    createdAt: 20000,
    amount: 10000000000
    };
    const action = {
        type: "ADD_EXPENSE",
        expense
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([ ...expenses, expense]); //we spreed out the original expenses and add in ours
    });

test("should edit expense", () => {
    const updates = {
    id: expenses[1].id,
    description: "Glue",
    }
    const action = {
        type: "EDIT_EXPENSE",
        updates
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
})

test("should not edit expense if expense not found", () => {
    const updates = {
    id: "10",
    description: "Glue",
    }
    const action = {
        type: "EDIT_EXPENSE",
        updates
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
})