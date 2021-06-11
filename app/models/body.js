module.exports = (sequelize, Sequelize) => {
    const Body = sequelize.define("body_types", {
        name_ru: {
            type: Sequelize.STRING,
            allowNull: true
        },
    });
    return Body;
};