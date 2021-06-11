module.exports = (sequelize, Sequelize) => {
    const Disk  = sequelize.define("disks", {
        name_ru: {
            type: Sequelize.STRING,
            allowNull: true
        },
    });
    return Disk;
};