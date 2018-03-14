//------OBJECT DESTRUCTURING---------//
const person = {
    name: "Andrew",
    age: 24,
    location : {
        city: "Phili",
        temp: 92
    }
 }
// const name = person.name;
// const age = person.age;
//both const above(name, age) is the same thing as the const below
// const { name, age } = person;
// console.log(`${name} is ${age}.`);


// if(person.location.city && person.location.temp){
// console.log(`Its ${person.location.temp} in ${person.location.city}.`);
// }

 // the if statement above can be destructured below
//  const { city, temp } = person.location;
//  if(city && temp){
// console.log(`Its ${temp} in ${city}.`);
// }
// if we don't want the name temp but we want to change it to temperature, we do the following below
// const { city, temp: temperature  } = person.location;
// // so now temp is now renamed to temperature
// if (city && temperature) {
//     console.log(`Its ${temperature} in ${city}.`);
// }

//Instude of u writting an if statement to set the name of the person 
//to be anonymous if the name is undefined we can do the following using the 
// //shortcourt below
// const { name = "Anonymous", age } = person;
//note the difference between renaming a property(temp: temperature) and give the 
//property a new value incase it is undefined(name = "Anonymous")
// console.log(`${name} is ${age}.`); //not if name is not defined in the person object or if 
//is undefined from the variable above "Anonymous" will now have to show up in the console

// const { name: firstName = "Anonymous", age } = person;
// console.log(`${firstName} is ${age}`);

// ----- Exercise ------- //
const book = {
    title : "Ego is the Enemy",
    author: "Ryan Holiday",
    publisher: {
       // name: "Penguin"
    }
};

const {name: publisherName = "self-Published"} = book.publisher;
console.log(publisherName);



/// -------- ARRAY DESTRUCTURING ------------///
//const address = ["1299 S Junioer Street", "Silicon Valley", "14343"];
//console.log(`You are in ${address[1]} ${address[2]}`)
 // now we need to destructure the array
 //note for object destructuring we use "{}"  for array destructuring we use "[]"
 //const [street, city, state, zip] = address; //now street=address[0], city=address[1]etc
 //if u what to skip the street in ur array u can just do this const [, , state] = address;
//console.log(`You are in ${city} ${state}`);
// //u can also set new value(default) eg.
//  const address = [];
//  const [, , state = "New York"] = address;
//  console.log(`You are in ${state}. `) //note since the address array is empty it returns the default array we made
 
//--- Exercise ---/
const item = ['Coffee (hot)', "$2.00", "$2.50", "$2.75"];
const [coffee, small, medium, large] = item;
console.log(`A ${coffee} costs ${medium}`);