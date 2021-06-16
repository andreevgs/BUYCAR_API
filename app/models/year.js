module.exports = (sequelize, Sequelize) => {
    const Year  = sequelize.define("years", {
        value: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
    });
    return Year;
};