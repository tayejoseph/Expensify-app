import uuid from 'uuid';
import database from "../firebase/firebase";


//ADD_EXPENSE(Action)
export const addExpense = (expense) => ({
        type: "ADD_EXPENSE",
        expense
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid //This gives u the user id
        const {
        description = "",
        note = "",       
        amount = 0,
        createdAt = 0
        } = expenseData;

        const expense = { description, note, amount, createdAt };
      
        return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    };
};

//REMOVE_EXPENSE(Action)
export const removeExpense = ({ id } = {}) => ({
    type: "REMOVE_EXPENSE",
    id
});

//START_REMOVEEXPENSE -> this removes items from our firebase database
export const startRemoveExpense = ({ id } = {}) => {
//dispatch is authomatically passed to this func by the redux library
    return (dispatch, getState) => {
       const uid = getState().auth.uid;
       return database.ref(`user/${uid}/expenses/${id}`).remove().then(() => {
        //once it has be able to be removed from the data base the dispatch below the 
        //removes it from the app using the removeExpense above
        dispatch(removeExpense({ id }));
       });
};
};

//EDIT_EXPENSE
export const editExpense = (id, updates) => ({
    type: "EDIT_EXPENSE",
    id,
    updates
});

//startEditExpense wrks with the database
export const startEditExpense = (id, updates) => {
return (dispatch, getState) => {
    const uid = getState().auth.uid
    return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(() => {
        dispatch(editExpense(id, updates))
});
};
};

//SET_EXPENSES
export const setExpenses = (expenses) => ({
    type: "SET_EXPENSES",
    expenses
});

//this export is used to get our data from firebase as soon as our page is loaded
export const startSetExpenses = () => {
  return (dispatch, getState) => {
      const uid = getState().auth.uid;
      //this is tell database to get our expenses value once
     return  database.ref(`users/${uid}/expenses`).once('value').then((snapshot) => {
        const expenses = [];
        //this is used to get our expense from firebase and turn it into an array of objects
        snapshot.forEach((childSnapShot) => {
            expenses.push({
                id: childSnapShot.key,//this turn our id to firebase key
                ...childSnapShot.val()
            });
        });
        //this is now used to set the expenses on our page passing the expenses we got from our firebase as an argument
        dispatch(setExpenses(expenses));
      });
  };
};




