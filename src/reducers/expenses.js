//Expenses Reducer
const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
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
