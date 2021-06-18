module.exports = (sequelize, Sequelize) => {
    const Model = sequelize.define("models", {
        system_id: {
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