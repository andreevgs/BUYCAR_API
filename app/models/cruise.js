module.exports = (sequelize, Sequelize) => {
    const Cruise  = sequelize.define("cruise_types", {
        name_ru: {
            type: Sequelize.STRING,
            allowNull: true
        },
    });
    return Cruise;
};