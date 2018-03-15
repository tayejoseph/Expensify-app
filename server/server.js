//after setting up this file u have to run ur (yarn run build:prod)
//after that u open another cmd promp and navigate to ur folder dir and run the following(node server/server.js)
//after this go to ur web browser and type search for localhost:3000
const path = require('path')
const express = require("express");
const app = express(); //this creates an express application
const publicPath = path.join(__dirname, "..", "public") //this take us to the public directory from our current path
//the const below means that if heroku gives a port name then is shld not use the 3000 & vice versa
const port = process.env.PORT || 3000; 
app.use(express.static(publicPath));//this tell express to use our public directory to serve up all our static asset

//the func below make return index.html if the address is not found
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});

//this tell express server to serve using the availabe port(which can be either the one rendered by heroku or localhost)
app.listen(port, () => {
    console.log("Server is up")
});//this is used to start up the server