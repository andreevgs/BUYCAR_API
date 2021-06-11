module.exports = (sequelize, Sequelize) => {
    const City  = sequelize.define("cities", {
        name_ru: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });
    return City;
};