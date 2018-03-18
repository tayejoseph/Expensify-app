import * as firebase from "firebase";

const config = {
    //All this codes are gotten from the firebase website
    apiKey: "AIzaSyChJGR0nJtVkJIm_svV2Ab64Lhl-yxTcrU",
    authDomain: "expensify-c5dc4.firebaseapp.com",
    databaseURL: "https://expensify-c5dc4.firebaseio.com",
    projectId: "expensify-c5dc4",
    storageBucket: "expensify-c5dc4.appspot.com",
    messagingSenderId: "66194136826"
  };



  
  firebase.initializeApp(config);
const database = firebase.database();
// ref() this is a short form for reference

// database.ref().set({
//     name: "Taye Joseph",
//     age: 26,
//     isSingle: true,
//     location: {
//         city: "Philadelphia",
//         country: "United States",
//     }
// }).then(() => {
//     console.log("Date is saved!"); //this run when ur data is successfully updated
// }).catch((error) => {
//     console.log("This failed.", error); //this runs if the data was not updated successfully to firebase
// });

// //this help us to remove data from the database using the remove()
// // database.ref("isSingle").remove().then(() => {
// //     console.log("Data was removed")
// // }).catch((error) => {
// //     console.log("Did not remove data due to: ", error)
// // });

// //u can use set also to remove data in the database by setting the value to null
// //but using the remove is more better
// database.ref('isSingle').set(null);

// //the update func is used to update stuffs
// // //note the update only works at the root level eg: if we do the following
// // database.ref().update({
// //     location: {
// //         city: "New York"
// //     }
// // })
// // this will remove the country and only the city props will be under the location
// // because update() only wrks with the root props
// //so now if we want to update the city without deleting country like before we need to do the following
// database.ref().update({
//     "location/city": "Boston" //this updates the city without changing the country
// });

// database.ref().update({
//     name: "Mike",
//     age: 29,
//     job: "Software developer", //we can also use it to set new props like this job which is just set
//     isSingle: null //this delete is single
// });



//HOW TO FETCH DATA FROM THE DATABASE
//USING ONCE(): this don't change as we authomatically the data from our firebase unlike the on() which does
// database.ref() //if we put location as the ref argument then we just get the datas under location
// .once('value')//this once() helps us to fetch data from the database
// .then((snapshot) => {
// const val = snapshot.val(); //this saves all what is in our database to val
// console.log(val)
// }).catch((error) => {
//     cosole.log('Error fetching data: ', error)
// });


//USING ON(): this has more advantage than using once bcause we can change the value from our database and from our page and it will authomatically update the data in our const
// const onValuechange = database.ref().on('value', (snapshot) => {
// console.log(snapshot.val());
// }, (error) => {
//     console.log("Error with data fetching", e) 
// })

// //THE OFF(): this is used to stop subscription done by on() to our browser but it will still updata in our database
// setTimeout(() => {
//     database.ref('age').set(29)
// },3500);
// setTimeout(() => {
//     database.ref().off(onValuechange);//this off only the onValuechange on() but if their is no argument in the off() then it offs all on() subscription so now any changes we make to our database from the browser do not change the const val data but changes only the data in our database
// }, 7000);
// setTimeout(() => {
//     database.ref('age').set(30); //this changes only in the database but not in our const val data because the off() has already been called before the change was made
// }, 10500);
// database.ref().update({
//     company: "Amazon"
// });
// database.ref().update({
//     job: {
//         title: "Software Engineer",
//         company: "Google"
//     }
// });

// // ---- CHALLENGE TIME -- //
// database.ref().on('value', (snapshot) => {
//     const val = snapshot.val();
//     console.log(val)
//     console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
// })


//FIREBASE DOES NOT SUPPORT ARRAY SO WHAT EVER WE ARE DOING WE DO THEM LIKE THIS
//this is how firebase saves data
// const firebaseNotes = {
//     notes: {
//         apolijasdf: {
//             title: "Firt Note",
//             body: "this is my note"
//         },
//         apoijasdfpoijwe: {
//             title: "Firt Note",
//             body: "this is my note"
//         }
//     }
// };

//IF WE WANT TO STORE LIST BASESD DATE ON FIREBASE(ARRAY LIKE) WE USE THE push() func
// database.ref("notes").push({
//     title: "course Topics",
//     body: "React Native, Angular"
// });

//MNIPULATING THE LIST BASE DATABASE
// database.ref("notes/-L7iPwF8fmE9_PTKcabC").update({
//     body: "buy food" //this update the note in our data base that has the id -L7iPwF8fmE9_PTKcabC
// })
// database.ref("notes/-L7iPwF8fmE9_PTKcabC").remove() //this remove the data base with the id(-L7iPwF8fmE9_PTKcabC)

//---- CHALLENGE TIME -----//
// create an expenses array in ur database
// database.ref("Expenses").push({
//     description: "Good one",
//     note: "You need to come again",
//     amount: "$500.00",
//     createdAt: 20000
// });
// database.ref("Expenses").push({
//     description: "Good two",
//     note: "You need to come again",
//     amount: "$500.00",
//     createdAt: 20000
// });


////this is ised to create an array of objects so that we can be able to use it on the browers
// database.ref('Expenses').once('value').then((snapshot) => {
//     const expenses = [];
//     snapshot.forEach((childSnapshot) => {
//         expenses.push({
//             id: childSnapshot.key, //note the .key is important
//             ...childSnapshot.val()
//         })
//     });
//     console.log(expenses)
// })

/// === Challenge time ---///
// database.ref("Expenses").on("value", (snapShot) => {
//     const expenses = [];
//     snapShot.forEach((childSnapshot) => { //now because of the on() we used when ever we change our file in the database it changes in the console
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         })
//     });
//     console.log(expenses)
// })



//child_removed 
//this is a on() subscriber argument that runs when ever a data is removed
database.ref("Expenses").on("child_removed", (snapshot) => {
    console.log(snapshot.key, snapshot.val()) //this gives u are the data that is removed at any time
})

//child_changed
database.ref("Expenses").on("child_changed", (snapshot) => {
    console.log(snapshot.key, snapshot.val())
})

//child_added
database.ref("Expenses").on("child_added", (snapshot) => {
    console.log(snapshot.key, snapshot.val()); //this subscription runs when ever any thing is added to the database
});
database.ref("Expenses").push({
    description: "data 1",
    amount: "30000",
    time: "234"
})
