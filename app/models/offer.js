module.exports = (sequelize, Sequelize) => {
    const Offer = sequelize.define("offers", {
        cost: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        mileage_km: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        mileage_m: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        text: {
            type: Sequelize.TEXT,
            allowNull: true
        },
    });
    return Offer;
};