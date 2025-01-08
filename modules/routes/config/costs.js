const express = require('express');
const { costs, resources, offices } = require('../../models');
const router = express.Router();

router.get('/', async (req, res) => {
    const costs = await costs.findAll({
        include: [resources, offices],
    });
    res.json(costs);
});

router.post('/', async (req, res) => {
    const { resourceId, buildingId, month, amount, tariff } = req.body;

    const resource = await resources.findByPk(resourceId);
    if (!resource) {
        return res.status(404).json({ error: 'Resource not found' });
    }
    const cost = tariff * amount;

    const newCost = await costs.create({
        resourceId,
        buildingId,
        month,
        amount,
        tariff,
        cost,
    });
    res.json(newCost);
});

module.exports = router;