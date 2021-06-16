module.exports = (sequelize, Sequelize) => {
    const Engine  = sequelize.define("engine_types", {
        name_ru: {
            type: Sequelize.STRING,
            allowNull: true
        },
    });
    return Engine;
};