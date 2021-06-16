module.exports = (sequelize, Sequelize) => {
    const Transmission = sequelize.define("transmission_types", {
        name_ru: {
            type: Sequelize.STRING,
            allowNull: true
        },
    });
    return Transmission;
};