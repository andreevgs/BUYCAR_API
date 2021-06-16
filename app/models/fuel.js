module.exports = (sequelize, Sequelize) => {
    const Fuel  = sequelize.define("fuel_types", {
        name_ru: {
            type: Sequelize.STRING,
            allowNull: true
        },
    });
    return Fuel;
};