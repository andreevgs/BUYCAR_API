module.exports = (sequelize, Sequelize) => {
    const Region  = sequelize.define("regions", {
        name_ru: {
            type: Sequelize.STRING,
            allowNull: true
        },
    });
    return Region;
};