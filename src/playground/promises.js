//the Promise is a new Es6 func that work for anything that occurs asychronically(wastes time before it wrks)
//the promise func take two argument resolve(give info after the asynchronicing) and reject(give info after async), 
//the resolve is called when the process went well while reject is the opposite
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve({
        //     name: "Andrew",
        //     age: 26
        // })
        reject('something went wrong');
    // resolve('This is my resolved data');//this runs onces the promise is successfull
     }, 500);
    //note the promise and resolve can be run ones if we call another promise after the comment it won't work
    //resolve only takes one argument if u want to resolve so many thing then u have to create an object

// });
});
console.log("before")
//the .then a callback func that only if the promises resolve(passes) if the resolve was reject the .catch() will catch the error an u can now display to the user
promise.then((data) => {
    console.log(data);
}).catch((error) => {
    console.log('error:', error)
});


//ur catch handler can also be treatched with add the catch func but by add any func after the first
// promise.then((data) => {
//     console.log(data);
// }, (error) => {
//     console.log('error:', error)
// })


