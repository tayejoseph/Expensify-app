import moment from "moment";
import selectExpenses from "../../selectors/expenses";
import expenses from "../fixtures/expenses";


test('should filter by text value', () => {
    const filters = {
        //we want to only sort by text so the remaining props will be their default value
        text: 'e',
        sortBy: "date",
        startDate: undefined,
        endDate: undefined
    };
    const result = selectExpenses(expenses, filters);
    //expense[2] came first be we are not only filtering by text we are also filtering by date
    expect(result).toEqual([ expenses[2], expenses[1] ]);
});


test("should filter by startDate", () => {
    const filters = {
        text: "",
        sortBy: "date",
        startDate: moment(0),
        endDate: undefined
    };
    const result = selectExpenses(expenses, filters);
  //we are expecting that one that has the highest created dates shld be returned while the 
  //one with the lowest shld be filtered out
    expect(result).toEqual([expenses[2], expenses[0]])
});


//shld filter by endDate
test("Should filter by endDate", () => {
   const filters = {
        text: "",
        sortBy: "date",
        startDate: undefined,
        endDate: moment(0).add(2, "days") //this is filter out items created futher than two days from moment
    };
     const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[0], expenses[1]])
});

test("should sort by date", () => {
       const filters = {
        text: "",
        sortBy: "date",
        startDate: undefined,
        endDate: undefined
       };
     const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[2], expenses[0], expenses[1]]);
});

test("should sort by amount", () => {
       const filters = {
        text: "",
        sortBy: "amount",
        startDate: undefined,
        endDate: undefined
       };
     const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[1], expenses[2], expenses[0]]);
});