module.exports = (sequelize, Sequelize) => {
    const Parking  = sequelize.define("parking_sensors", {
        name_ru: {
            type: Sequelize.STRING,
            allowNull: true
        },
    });
    return Parking;
};