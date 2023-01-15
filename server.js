const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const authorize = require('../server/ACL/authorize');

app.use( bodyParser.json() ); 
app.use(bodyParser.urlencoded({  extended: true   })); 
console.log(path.join(__dirname, 'build'));
app.use(express.static(path.join(__dirname, 'build'))); 


app.use('/webservice', require('../server/webservice.routes'));
app.use('/api/auth', require('../server/auth.routes'));
app.use('/api', authorize(), require('../server/ACL/panel.router'));
app.use(require('../server/error.handle'));


app.get('*', (req,res) =>{  
    res.sendFile(path.join(__dirname+'/build/index.html'));
});

console.log("Hi Mohammad.");
var server = app.listen(80);

process.on('SIGINT', function() { 
	console.log("\nGood Bye Mohammad.");
	server.close();
    process.exit();
});
