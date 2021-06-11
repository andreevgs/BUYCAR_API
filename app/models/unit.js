module.exports = (sequelize, Sequelize) => {
    const Unit  = sequelize.define("drive_units", {
        name_ru: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });
    return Unit;
};