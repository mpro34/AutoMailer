const express = require('express');
require('./services/passport');

const app = express();

//Setup Express routes given the express app object as input
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
