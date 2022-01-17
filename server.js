const express = require("express");
const path = require("path");
const fs = require("fs");
const apiRoutes = require('./routes/apiroutes')
const htmlRoutes = require('./routes/htmlroutes');
const app = express()
const PORT = process.env.PORT || 3001;






app.use('/', htmlRoutes)
app.use('/api', apiRoutes)

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});