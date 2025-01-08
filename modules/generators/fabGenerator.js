const express = require('express');
const {office, products_list, fabrication} = require('../models');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const offices = await office.findAll();
        const repaired = await products_list.findAll();
        const MIN_price = 100;
        const MAX_price = 20000;

        const data = [];

        let month_counter = 0
        let repaired_devices_counter = 0

        function getMonthName(month) {
            return new Intl.DateTimeFormat("uk-UA", {month: "long"}).format(new Date(2023, month));
        }

        while (month_counter <= 11) {
            for (const office of offices) {
                if (office.name !== "Головний офіс") {
                    for (let i = 0; i < Math.random() * 15; i++) {
                        // Генеруємо випадковий індекс масиву
                        const randomIndex = Math.floor(Math.random() * repaired.length);

                        // Отримуємо випадковий device
                        const device = repaired[randomIndex];

                        // Генеруємо ціну
                        let price = Math.floor(Math.random() * (MAX_price - MIN_price + 1) + MIN_price);

                        // Додаємо дані до масиву
                        data.push({
                            officeID: office.id,
                            office_name: office.name,
                            Repaired: device.name,
                            Price: price,
                            month: getMonthName(month_counter),
                        });
                    }
                }
            }
            month_counter += 1
        }

        await fabrication.bulkCreate(data);
        res.status(200).json({message: 'Data was successfully created!'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Error while creating data!'});
    }
});

module.exports = router;
