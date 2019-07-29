'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        let migrations = [];

        migrations.push(queryInterface.addColumn(
            'Practices', //name of source table
            'created_by', //name of key we are adding
            {
                type: Sequelize.UUID,
                references: {
                    model: 'Users', //name of target table
                    key:'id',
                },
                onUpdate:'CASCADE',
                onDelete:'SET NULL',
            }
        ));

        migrations.push(queryInterface.addColumn(
            'Practices', //name of source table
            'category_id', //name of key we are adding
            {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Categories', //name of target table
                    key:'id',
                },
                onUpdate:'CASCADE',
                onDelete:'SET NULL',
            }
        ));

        return Promise.all(migrations);
    },

    down: (queryInterface, Sequelize) => {
        let migrations = [];

        migrations.push(queryInterface.removeColumn(
            'Practices', //name of source table
            'created_by' //key we want to remove
        ));

        migrations.push(queryInterface.removeColumn(
            'Practices', //name of source table
            'category_id' //key we want to remove
        ));

        return Promise.all(migrations);
    }
};
