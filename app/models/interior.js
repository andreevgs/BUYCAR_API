module.exports = (sequelize, Sequelize) => {
    const Interior  = sequelize.define("interior_colors", {
        name_ru: {
            type: Sequelize.STRING,
            allowNull: true
        },
    });
    return Interior;
};