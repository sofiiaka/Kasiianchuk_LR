const express = require('express');
const { fabrication } = require('../../models');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { buildingId, productName, fabricationVolume, month } = req.body;

        const fabrication = await fabrication.create({
            buildingId,
            productName,
            fabricationVolume,
            month
        });

        res.status(201).json({ message: 'Обсяг виробництва додано успішно!', fabrication });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Помилка при додаванні виробництва' });
    }
});

module.exports = router;
