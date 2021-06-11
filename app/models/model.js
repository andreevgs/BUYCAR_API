module.exports = (sequelize, Sequelize) => {
    const Model = sequelize.define("models", {
        systemId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: true
        },
    });
    return Model;
};