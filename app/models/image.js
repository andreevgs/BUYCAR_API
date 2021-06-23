module.exports = (sequelize, Sequelize) => {
    const Image = sequelize.define("images", {
        name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        is_main: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
    });
    return Image;
};