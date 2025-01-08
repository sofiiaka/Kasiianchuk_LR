const express = require('express');
const OFFICES = require('./config/offices');
const FABRICATION = require('./config/fabrication');
const RESOURCES = require('./config/resources');
const expensesRouter = require('./config/costs');


const router = express.Router();

router.use('/offices', OFFICES);
router.use('/fabrication', FABRICATION);
router.use('/resources', RESOURCES);
router.use('/expenses', expensesRouter);

router.use('/generateCosts', require('../generators/costsGenerator'))
router.use('/generateFab', require('../generators/fabGenerator'))

module.exports = router;
