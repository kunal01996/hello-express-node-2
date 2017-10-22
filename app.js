const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('currentYear', ()=>{
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
})

app.set('view engine', 'hbs');

app.use((request, response, next)=>{
  var now = new Date().toString();
  var log = `${now}: ${request.method} ${request.url}`+"\n";
  console.log(log);
  fs.appendFile('server.log', log, (err)=>{
    if(err){
      console.log(err);
    }
  });
  next();
});

app.use((request, response, next)=>{
  response.render('maintenance.hbs', {
    pageTitle: 'Maintenance Mode'
  });
});

app.use(express.static(__dirname + '/public'));


app.get('/', (request, response)=>{
  response.render('welcome.hbs', {
    pageTitle: 'Welcome Page',
    });
});



app.get('/about', (request, response)=>{
  response.render('about.hbs', {
    pageTitle: 'About Page',
    });
});

app.get('/bad', (request, response)=>{
  response.send("<h1>Bad Request !</h1>");
});

app.listen(3000, ()=>{
  console.log('Server is up on port 3000');
});
