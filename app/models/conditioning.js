module.exports = (sequelize, Sequelize) => {
    const Conditioning = sequelize.define("conditioning_types", {
        name_ru: {
            type: Sequelize.STRING,
            allowNull: true
        },
    });
    return Conditioning;
};