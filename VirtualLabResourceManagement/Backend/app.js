const express  = require('express');

const app = new express();
app.use(express.json());
const routes = require('./routes');
app.use(routes);
app.listen(3001,function(){
    console.log("Server listen at 3001;");
});


