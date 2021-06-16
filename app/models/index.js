const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.offer = require("../models/offer")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.mark = require('../models/mark')(sequelize, Sequelize);
db.model = require('../models/model')(sequelize, Sequelize);
db.generation = require('../models/generation')(sequelize, Sequelize);
db.body = require('../models/body')(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.mark.hasMany(db.model);
db.model.hasMany(db.generation);
db.offer.belongsTo(db.body);

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
