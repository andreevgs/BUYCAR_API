module.exports = (sequelize, Sequelize) => {
    const Mark = sequelize.define("marks", {
        systemId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: true
        },
    });
    return Mark;
};