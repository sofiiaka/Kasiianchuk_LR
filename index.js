const express = require('express');
const sequelize = require('./DB/database');
const bodyParser = require('body-parser');
const routes = require('./modules/routes/routes');

const application = express();
application.use('/', routes);
application.use(bodyParser.json());

sequelize.sync().then(() => {application.listen(3000, () => {console.log('Server started on http://localhost:3000');});});