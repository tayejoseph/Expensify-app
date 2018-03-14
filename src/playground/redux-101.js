import { createStore } from 'redux'

//Action generators - functions that return action objects
//{ incrementBy = 1 } = { } this mean if incrementBy does not exist set it to an empty object ({});
//{ incrementBy = 1} this means if incrementBy exist but it has no value then give it a default value of 1
const incrementCount = ({ incrementBy = 1} = {}) => ({
    type: "INCREMENT",
    incrementBy
});
const decrementCount = ({ decrementBy = 1} = {}) => ({
    type: "DECREMENT",
    decrementBy
});
const setCount = ({ count }) => ({
    type: "SET",
    count
});
const resetCount = () => ({
    type: "RESET"
});

//Reducers
const countReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case "INCREMENT":
            return {
                count: state.count + action.incrementBy
            };
        case "DECREMENT":
            return {
                count: state.count - action.decrementBy
            };
        case "SET":
            return {
                count: action.count
            };
        case "RESET":
            return {
                count: state.count
            };
        default:
            return state;
    }
};

const store = createStore(countReducer);

const unsubcribe = store.subscribe(() => {
    console.log(store.getState());   
})

store.dispatch(incrementCount({ incrementBy: 5 }));

store.dispatch(incrementCount());

store.dispatch(setCount({ count : 10 }));

store.dispatch(resetCount());

store.dispatch(decrementCount());

store.dispatch(decrementCount(10));

store.dispatch(setCount({ count : 101}))




 






























// //-------------REDUX -------------------///
// import { createStore } from "redux";
// //Action generators(the incrementCount below is an action generator) - functions that return action objects

// const incrementCount = ({ incrementBy = 1 } = {}) => ({
//     type: "INCREMENT", 
//     incrementBy
// });


// const decrementCount = ({ decrementBy = 1 } = {}) => ({
//     type: "DECREMENT",
//     decrementBy
// });
// const store = createStore((state = { count: 0}, action) => {
//     switch (action.type) {
//         case "INCREMENTBY":
//         return {
//             count:       }
//     }

// //this is for redux the first argument is for the current state
// //the state = { count: 0 } this set the state argument with a default count value as 0
// const store = createStore((state = { count: 0}, action) => { 
//     switch (action.type) {
//     case "INCREMENT":
//     const incrementBy = typeof action.incrementBy === "number" ? action.incrementBy : 1;
//        //the incrementBy const above check if any dispatch has an action property name incrementBy by
// // then it uses a tenary operation to check the type of value the incrementBy has if it is a number
// //it will be passed down else it will set it to be 1
//         return {
//             count: state.count + action.incrementBy
//   };
//     case "DECREMENT":           
//         return {
//             count: state.count - action.decrementBy
//         }
//     case "RESET":
//         return {
//             count: 0
//         }
//     case "SET":
//     return {
//         count: action.count
//     }
//     default:
//         return state;
// }
// });
//  //store.getState() is a standard method to return the current state of the store
// // store.subscribe(() => { //this function is called every time the state gets changed so u can use it to do anything u want when the state changes 
// //     console.log(store.getState())
// // })
// const unsubcribe = store.subscribe(() => {
//     console.log(store.getState())  //where every the function is called it is used to stop the console.log
// })
// //store.dispatch is a function that is used to perform an action on the state object
// store.dispatch({
//     type: "INCREMENT" //Note the uppercase naming convention
// });

// //unsubcribe(); // this function will return only on console.log because it is used to to the subscribe above

// store.dispatch(incrementCount({ incrementBy: 5})) //this dispatch uses the incrementCount action generator create above
// store.dispatch({
//     type: "INCREMENT",
//     incrementBy : 5 // now we this dispatches it increases the count by 5
// });
// //because store.dispatch method is called twice the count value in our store.getState now will increase by 2

// store.dispatch(incrementCount());


// store.dispatch(decrementCount());
// store.dispatch(decrementCount({ decrementBy: 10}));
// store.dispatch({
//      type: "RESET"
// });
// store.dispatch({
//      type: "DECREMENT"
// })
// store.dispatch({
//     type: "SET",
//     count: 101
// })
// //the getState function returns the current state object
