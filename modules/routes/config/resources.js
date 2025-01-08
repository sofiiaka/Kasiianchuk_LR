const express = require('express');
const { resource } = require('../../models');
const router = express.Router();

router.get('/', async (req, res) => {
    const resources = await resource.findAll();
    res.json(resources);
});

router.post('/', async (req, res) => {
    const { name, unit} = req.body;
    const newResource = await resource.create({ name, unit});
    res.json(newResource);
});

module.exports = router;