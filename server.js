const express = require("express");
const path = require("path");
const fs = require("fs");
const apiRoutes = require('./routes/apiroutes')
const htmlRoutes = require('./routes/htmlroutes');
const app = express()









app.use('/', htmlRoutes)
app.use('/api', apiRoutes)