module.exports = (sequelize, Sequelize) => {
    const Roof  = sequelize.define("roof_types", {
        name_ru: {
            type: Sequelize.STRING,
            allowNull: true
        },
    });
    return Roof;
};