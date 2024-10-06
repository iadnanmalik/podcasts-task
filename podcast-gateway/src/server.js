const express = require('express');
const podcastsRoute = require('./routes/podcasts');
const notFound = require('./midlleware/notFound');
const errorHandler = require('./midlleware/errorHandler');
const app = express();
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Routes
app.use('/api/podcasts', podcastsRoute);

app.use(notFound);

// General Error Handling Middleware
app.use(errorHandler);



const PORT = process.env.PORT;
app.listen(PORT, () => {
  
});
