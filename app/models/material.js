module.exports = (sequelize, Sequelize) => {
    const Material  = sequelize.define("interior_trim_materials", {
        name_ru: {
            type: Sequelize.STRING,
            allowNull: true
        },
    });
    return Material;
};