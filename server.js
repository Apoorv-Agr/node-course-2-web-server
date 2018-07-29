const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');


app.use( (req,res,next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;
    console.log(log);
    //fs.appendFileSync('server.log',log + '\n');
    fs.appendFile('server.log',log + '\n', (err) =>{
        if(err){
            console.log('Unable to append to file i.e server.log');
        }
    })
    next();
});

app.use( (req,res, next) => {
    res.render('maintenance.hbs');
})
app.use(express.static(__dirname+'/public'));// Middle Ware
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();

});
hbs.registerHelper('sreamIt', (params) => {
    return params.toUpperCase();
})

app.get('/', (req,resp) => {
    //resp.send("Hello there");
    resp.render('home.hbs',{
        pageTitle:'Home Page',
        message : 'Welcome to my website'
    })
});

app.get('/about', (req,resp) => {
    //resp.send('<h1> This is about page </h1>');
    resp.render('about.hbs', {
        pageTitle : 'About Page'
    });
});

app.get('/bad', (req,resp) =>{
    resp.send({
        errorMessage : "Unable to handle request"
    })
});

app.listen(3000, ()=>{
    console.log("Service Started on port 3000");
});