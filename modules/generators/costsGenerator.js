const express = require('express');
const { office, resource, costs } = require('../models');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const offices = await office.findAll();
        const resources = await resource.findAll();
        const data = [];

        let month_counter = 0
        function getMonthName(month) {
            return new Intl.DateTimeFormat("uk-UA", { month: "long" }).format(new Date(2023, month));
        }

        while (month_counter <= 11) {
            for (const office of offices) {
                for (const resource of resources) {
                    let consumed = Math.floor(Math.random() * (10000 - 500 + 1) + 10000);
                    data.push({
                        Month: getMonthName(month_counter),
                        office_id: office.id,
                        office_name: office.name,
                        resource_id: resource.id,
                        resource_name: resource.name,
                        Consumed: consumed,
                        Total_cost: resource.tariff * consumed,
                    });
                }
            }
            month_counter += 1;
        }

        await costs.bulkCreate(data);
        res.status(200).json({ message: `Costs generated successfully.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error while creating costs.' });
    }
});

module.exports = router;