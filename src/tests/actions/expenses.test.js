import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";
import { startAddExpense, 
    addExpense, 
    editExpense,
    startEditExpense, 
    removeExpense, 
    setExpenses, 
    startSetExpenses, 
    startRemoveExpense 
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import database from "../../firebase/firebase";
//expect.any(String) this means the code should expect a string as id because the id is unique
//expect.any(String) this means the code should expect a string as id because the id is unique

const createMockStore = configureMockStore([thunk]); //we are configuring mock store from our libraries
const  uid = "thisismytestuid";
const defaultAuthState = { auth: { uid } };
//this is used to get our data from firebase when ever the page reloads
beforeEach((done) => {
    const expenseData = {};
    expenses.forEach(({id, description, note, amount, createdAt }) => {
        expenseData[id] = { description, note, amount, createdAt };
    });
    //the sdone is used so that the data will first be fatched from the database before the foreach runs
    database.ref(`users/${uid}/expenses`).set(expenseData).then(() => done())
});

test('Should set up remove expense action object', () => {
    const action = removeExpense({ id: "123abc" });
  //hen we are compair two object we use toEqual() func
  //be when we are compairing string,boolean etc we use toBe() func
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: "123abc"
    });
});

//the done is used so the the test will wait for some time so that the data can change in firebase before it is being tested
test("Should remove expense from fireBase", (done) => {
const store = createMockStore(defaultAuthState);
const id = expenses[2].id;
store.dispatch(startRemoveExpense({ id })).then(() => {
const actions = store.getActions();
expect(action).toEqual({
type: "REMOVE_EXPENSE",
id
});
return database.ref(`users/${uid}/expenses/${id}`).once('value');
}).then((snapshot) => {
expect(snapshot.val()).toBeFalsy(); //toBeFalsy() is a standard firebase func that check if the value is null
done();
});
});

test('should set up edit expense action object', () => {
    const action = editExpense("123abc", { note: "New note value"} );
    expect(action).toEqual({
        type: "EDIT_EXPENSE",
        id: "123abc", 
        updates: { 
            note: "New note value"
        }
    });
});

//u use the done() func when u know that ur test is dealing with a asychronise eg. database
test("Should edit expense from firebase store", (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[0].id;
    const updates = { amount: 21045 };
    store.dispatch(startEditExpense(id, updates)).then(() => {
        const action = store.getActions(); //this is used to get the action back
        expect(action[0]).toEqual({
            type: "EDIT_EXPENSE",
            id,
            updates
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value'); //this check for the expense with the id of id
    }).then((snapshot) => {
        expect(snapshot.val().amount).toBe(updates.amount);
        done();
    });
    });
    

test('should setup add expense action object with provided values', () => {
        const action = addExpense(expenses[2]);
        expect(action).toEqual({
            type: "ADD_EXPENSE",
            expense: expenses[2]
        });
});

test('should add expense to database and store', (done) => {
        const store = createMockStore(defaultAuthState);
        const expenseData = {
            description: "Mouse",
            amount: 3000,
            note: "This one is better",
            createdAt: 1000
        };

        store.dispatch(startAddExpense(expenseData)).then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: "ADD_EXPENSE",
                expense: {
                    id: expect.any(String),
                    ...expenseData
                }
            });

            return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
            }).then((snapshot) => {
                expect(snapshot.val()).toEqual(expenseData);
                done();
        });
});


test('should add expense with defaults to database and store', (done) => {
const store = createMockStore(defaultAuthState);
        const expenseDefaults = {
            description: "",
            amount: 0,
            note: "",
            createdAt: 0
        };

        store.dispatch(startAddExpense({})).then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: "ADD_EXPENSE",
                expense: {
                    id: expect.any(String),
                    ...expenseDefaults
                }
            });

            return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
            }).then((snapshot) => {
                expect(snapshot.val()).toEqual(expenseDefaults);
                done();
        });
});  


test("Should setup set expense action object with data", () => {
const action = setExpenses(expenses);
expect(action).toEqual({
    type: "SET_EXPENSES",
    expenses
});
});


test("Should fetch the expenses from firebase", (done) => {
    const store = createMockStore(defaultAuthState);//this is our mock store
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({ //i think the action[0] is from the firebase expense-test in our store
            type: "SET_EXPENSES",
            expenses
        });
    done(); //this make jest to wait until done() completes
});
});