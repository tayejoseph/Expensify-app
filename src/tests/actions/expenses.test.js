import { addExpense, editExpense, removeExpense } from "../../actions/expenses";

//expect.any(String) this means the code should expect a string as id because the id is unique
//expect.any(String) this means the code should expect a string as id because the id is unique
           


test('Should set up remove expense action object', () => {
    const action = removeExpense({ id: "123abc" });
  //hen we are compair two object we use toEqual() func
  //be when we are compairing string,boolean etc we use toBe() func
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: "123abc"
    });``
})

test('should set up edit expense action object', () => {
    const action = editExpense("123abc", { note: "New note value"} );
    expect(action).toEqual({
        type: "EDIT_EXPENSE",
        id: "123abc", 
        updates: { 
            note: "New note value"
        }

    })
})


test('should setup add expense action object with provided values', () => {
    const expenseData = {
        description: "Rent",
        amount: 109500,
        createdAt: 1000,
        note: "This was last months rent"
    };
        const action = addExpense(expenseData);
        expect(action).toEqual({
            type: "ADD_EXPENSE",
            expense: {
                ...expenseData,
                id: expect.any(String) //this means the code should expect a string as id because the id is unique
            }
        });
});

// test("should setup add expense action object with default values", () => {
//    const action = addExpense();
//    expect(action).toEqual({
//        type: "ADD_EXPENSE",
//        expense: {
//            id: expect.any(String),
//            description: "",
//            note: "",
//            amount: 0,
//            createdAt: 0
//        }
//    });
// });