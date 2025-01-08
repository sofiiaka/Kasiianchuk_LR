const { sequelize } = require('../associations');
const Table = require('cli-table3');

async function getOfficeDataWithMonths() {
    try {
        const [offices] = await sequelize.query(`SELECT id, name FROM offices`);


        for (const office of offices) {
            const officeId = office.id;
            const officeName = office.name;

            console.log(`\nОфіс: ${officeName}`);



            const [months] = await sequelize.query(`SELECT DISTINCT month FROM fabrications 
                      WHERE officeId = :officeId ORDER BY month`, { replacements: { officeId } });

            const consumptionQuery = `SELECT month, SUM(consumed) AS totalConsumption FROM costs
                WHERE resource_id = (SELECT id FROM resources WHERE name = 'Електроенергія') AND office_id = :officeId GROUP BY month`;

            const costQuery = `SELECT c.month, SUM(c.consumed * r.tariff) AS totalCost FROM costs c
                         INNER JOIN resources r ON c.resource_id = r.id WHERE r.name = 'Електроенергія' AND c.office_id = :officeId
                         GROUP BY c.month`;

            const fabricationQuery = `SELECT month, SUM(Price) AS totalProduction FROM fabrications WHERE officeID = :officeId GROUP BY month`;

            const [consumptionData] = await sequelize.query(consumptionQuery, { replacements: { officeId } });
            const [costData] = await sequelize.query(costQuery, { replacements: { officeId } });
            const [fabricationData] = await sequelize.query(fabricationQuery, { replacements: { officeId } });

            const monthHeaders = months.map(month => month.month);
            const table = new Table({
                head: ['Показник', ...monthHeaders],
                style: {
                    head: [],
                    border: [],
                },
                colWidths: [35, ...monthHeaders.map(() => 13)],
            });
            const fillRow = (data, field) =>
                months.map(month => data.find(item => item.month === month.month)?.[field] || 0);

            table.push(
                ['Споживання електроенергії', ...fillRow(consumptionData, 'totalConsumption')],
                ['Витрати на електроенергію', ...fillRow(costData, 'totalCost')],
                ['Обсяги виробництва продукції', ...fillRow(fabricationData, 'totalProduction')]
            );

            console.log(table.toString());
        }
    } catch (error) {
        console.error('Помилка під час отримання даних:', error);
        throw error;
    }
}

getOfficeDataWithMonths()
    .then(() => console.log('Вивід завершено'))
    .catch(err => console.error('Помилка:', err));
