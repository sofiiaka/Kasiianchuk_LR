const express = require('express');
const office = require('../../models');
const router = express.Router();

router.get('/', async (req, res) => {
    const offices = await office.findAll();
    res.json(offices);
})

module.exports = router;