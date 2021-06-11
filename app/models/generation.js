module.exports = (sequelize, Sequelize) => {
    const Generation = sequelize.define("generations", {
        generation: {
            type: Sequelize.STRING,
            allowNull: true
        },
        first_year: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        second_year: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        is_rest: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        photo: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });
    return Generation;
};