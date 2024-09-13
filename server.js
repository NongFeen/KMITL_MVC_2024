const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./src/config/corsOptions');
const { logger } = require('./src/middleware/logEvents');
const errorHandler = require('./src/middleware/errorHandler');
const PORT = process.env.PORT || 5500;

// custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//serve static files
app.use('/', express.static(path.join(__dirname, 'src/public')));

// routes
app.use('/', require('./src/routes/root'));
app.use('/employees', require('./src/routes/api/employees'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname,'src', 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));