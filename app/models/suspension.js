module.exports = (sequelize, Sequelize) => {
    const Suspension  = sequelize.define("suspensions", {
        name_ru: {
            type: Sequelize.STRING,
            allowNull: true
        },
    });
    return Suspension;
};