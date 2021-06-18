module.exports = (sequelize, Sequelize) => {
    const Capacity  = sequelize.define("capacity_values", {
        value: {
            type: Sequelize.FLOAT,
            allowNull: true
        }
    });
    return Capacity;
};