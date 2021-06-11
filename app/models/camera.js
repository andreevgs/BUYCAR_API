module.exports = (sequelize, Sequelize) => {
    const Camera  = sequelize.define("camera_types", {
        name_ru: {
            type: Sequelize.STRING,
            allowNull: true
        },
    });
    return Camera;
};