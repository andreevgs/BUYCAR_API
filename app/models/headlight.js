module.exports = (sequelize, Sequelize) => {
    const Headlight  = sequelize.define("headlights", {
        name_ru: {
            type: Sequelize.STRING,
            allowNull: true
        },
    });
    return Headlight;
};