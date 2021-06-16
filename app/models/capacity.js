module.exports = (sequelize, Sequelize) => {
    const Capacity  = sequelize.define("capacity_values", {
        value: {
            type: Sequelize.DECIMAL,
            allowNull: true
        }
    });
    return Capacity;
};