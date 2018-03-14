import { createStore, combineReducers } from "redux";

import expensesReducer from "../reducers/expenses";
import filtersReducer from "../reducers/filters";

export default () => {
    //store creation
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer
        }),
        //this help u to use ur redux developer tool
        //for all ur application make sure u add it in other for u to be able to use the redux dev tool
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

return store;
}
 


