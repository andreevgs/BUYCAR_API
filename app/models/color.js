module.exports = (sequelize, Sequelize) => {
    const Color  = sequelize.define("colors", {
        name_ru: {
            type: Sequelize.STRING,
            allowNull: true
        },
    });
    return Color;
};