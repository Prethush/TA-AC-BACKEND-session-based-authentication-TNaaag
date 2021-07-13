let express = require('express');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let app = express();
//middlewares
app.use(cookieParser());
app.use((req, res, next) => {
    
    res.cookie("name", "Prethush");
    next();
});

app.get('/', (req, res, next) => {
    console.log(req.cookies.name);
    res.send('Welcome to Index Page');
});

app.listen(5000, () => {
    console.log("Server is listening port 5k");
});