import { createStore, combineReducers } from "redux";
import uuid from "uuid"
//the combine reducer that is import helps use combine multiple reducers to creat a sing store



//ADD_EXPENSE(Action)
const addExpense = (
    {
        description = "",
        note = "",          //{all this are the default value of addExpense}
        amount = 0,
        createdAt = 0
    }) => ({
        type: "ADD_EXPENSE",
        expense: {
            id: uuid(),// the imported id generator
            description,
            note,
            amount,
            createdAt
        }
    })

//REMOVE_EXPENSE(Action)
const removeExpense = ({ id } = {}) => ({
    type: "REMOVE_EXPENSE",
    id
});


//EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: "EDIT_EXPENSE",
    id,
    updates
});

//SET_TEXT_FILTER
const setTextFilter = (text = "") => ({
    type: "SET_TEXT_FILTER",
    text
});

//SORT_BY_DATE
const sortByDate = () => ({
    type: "SORT_BY_DATE"
});

//SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: "SORT_BY_AMOUNT"
});

//SET_START_DATE
const setStartDate = (startDate) => ({
    type: "SET_START_DATE",
    startDate
});

//SET_END_DATE
const setEndDate = (endDate) => ({
    type: "SET_END_DATE",
    endDate
})

//Expenses Reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case "ADD_EXPENSE":
            return [
                ...state, //this is the es6 spreed opertator it add the value of state and add.expense together
                action.expense // its just like using state.concat(action.expenses)
            ];
        case "REMOVE_EXPENSE":
            return state.filter(({ id }) => (id !== action.id)); //
        case "EDIT_EXPENSE":
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense, //this give the object all the expense
                        ...action.updates //this override the amount with the one we gave it 
                    };
                } else {
                    return expense;
                };
            });

        default:
            return state;
    }
};

//filter Reducer
const filtersReducerDefaultState = {
    text: "",
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};


const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case "SET_TEXT_FILTER":
            return {
                ...state,
                text: action.text
            };
        case "SORT_BY_AMOUNT":
            return {
                ...state,
                sortBy: "amount"
            };
        case "SORT_BY_DATE":
            return {
                ...state,
                sortBy: "date"
            };
        case "SET_START_DATE":
            return {
                ...state,
                startDate: action.startDate
            };
        case "SET_END_DATE":
            return {
                ...state,
                endDate: action.endDate
            };
        default:
            return state;
    }
}


//Get Visible Expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== "number" || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase()); //this check if the text matches the one in expenses decription

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === "amount") {
            return a.amount < b.amount ? 1 : -1;
        }
    });
};

//store creation
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses); //Any time the state changes this function runs
});

const expenseOne = store.dispatch(addExpense({ description: "Rent", amount: 100, createdAt: -21000 }));
const expenseTwo = store.dispatch(addExpense({ description: "coffee", amount: 300, createdAt: -1000 }));

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));
// store.dispatch(editExpense(expenseTwo.expense.id, {amount: 500}));

// store.dispatch(setTextFilter("rent"));
//store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());


// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(999));





//this is a demo on how our state will be
const demoState = {
    expenses: [{
        id: "poli",
        description: "January Rent",
        note: "This was the final payment for the address",
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: "rent",
        sortBy: "amount", //data or amount
        startedDate: undefined,
        endDate: undefined
    }
};