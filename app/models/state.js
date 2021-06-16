module.exports = (sequelize, Sequelize) => {
    const State  = sequelize.define("states", {
        name_ru: {
            type: Sequelize.STRING,
            allowNull: true
        },
    });
    return State;
};