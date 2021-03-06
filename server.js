const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 8080;

var app = express();
app.set('view engine','hbs');
app.get('/',(req,res) =>{
	//res.send('<h1>Hello Express!</h1>');
	res.send({
		name : 'deepika',
		likes : [
			'Biking',
			'Cities'
		]
	})
});
hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('screamIt', (text) =>{
	return text.toUpperCase();
});

app.use((req,res,next) =>{
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	
	console.log(log);
	fs.appendFile('server.log',log+'\n');
	next();
})

// app.use((req,res,next) => {
	// res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));
app.get('/about',(req,res) =>{
	//res.send('<h1>Hello Express!</h1>');
	res.render('About.hbs',{
		pageTitle: 'About Page',
		currentYear: new Date().getFullYear()
	});
});

app.get('/Home',(req,res) =>{
	//res.send('<h1>Hello Its Home page!</h1>');
	res.render('Home.hbs',{
		pageTitle: 'Home Page',
		currentYear: new Date().getFullYear()
	});
});

app.get('/bad',(req,res) =>{
	res.send({
		error : 'errorMessage',
		Message : 'unable to connect'
	})
});

app.listen(port, ()=>{
	console.log(`Server is up on port ${port}`);
});