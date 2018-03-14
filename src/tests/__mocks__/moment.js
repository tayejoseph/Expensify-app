
const moment = require.requireActual('moment'); //the func 'moment' that we want to mock

//this help u mock moment so that the test for ExpenseForm will run 
//without error because of difference in time as to when tested and when the moment was created
export default (timestamp = 0) => {
 return moment(timestamp);
};