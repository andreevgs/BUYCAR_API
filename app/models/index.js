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

db.news = require("./news.js")(sequelize, Sequelize);

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.offer = require("../models/offer")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.mark = require('../models/mark')(sequelize, Sequelize);
db.model = require('../models/model')(sequelize, Sequelize);
db.generation = require('../models/generation')(sequelize, Sequelize);
db.body = require('../models/body')(sequelize, Sequelize);
db.camera = require('../models/camera')(sequelize, Sequelize);
db.capacity = require('../models/capacity')(sequelize, Sequelize);
db.city = require('../models/city')(sequelize, Sequelize);
db.color = require('../models/color')(sequelize, Sequelize);
db.conditioning = require('../models/conditioning')(sequelize, Sequelize);
db.cruise = require('../models/cruise')(sequelize, Sequelize);
db.disk = require('../models/disk')(sequelize, Sequelize);
db.engine = require('../models/engine')(sequelize, Sequelize);
db.fuel = require('../models/fuel')(sequelize, Sequelize);
db.generation = require('../models/generation')(sequelize, Sequelize);
db.headlight = require('../models/headlight')(sequelize, Sequelize);
db.interior = require('../models/interior')(sequelize, Sequelize);
db.material = require('../models/material')(sequelize, Sequelize);
db.suspension = require('../models/suspension')(sequelize, Sequelize);
db.transmission = require('../models/transmission')(sequelize, Sequelize);
db.parking = require('../models/parking')(sequelize, Sequelize);
db.region = require('../models/region')(sequelize, Sequelize);
db.roof = require('../models/roof')(sequelize, Sequelize);
db.state = require('../models/state')(sequelize, Sequelize);
db.year = require('../models/year')(sequelize, Sequelize);
db.unit = require('../models/unit')(sequelize, Sequelize);
db.image = require('../models/image')(sequelize, Sequelize);

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

db.offer.belongsToMany(db.user, {
  through: "favorites",
  foreignKey: "offerId",
  otherKey: "userId"
});

db.user.belongsToMany(db.offer, {
  through: "favorites",
  foreignKey: "userId",
  otherKey: "offerId"
});

db.mark.hasMany(db.model);
db.model.hasMany(db.generation);

db.mark.hasMany(db.offer);
db.model.hasMany(db.offer);
db.generation.hasMany(db.offer);
db.body.hasMany(db.offer);
db.camera.hasMany(db.offer);
db.capacity.hasMany(db.offer);
db.city.hasMany(db.offer);
db.color.hasMany(db.offer);
db.conditioning.hasMany(db.offer);
db.cruise.hasMany(db.offer);
db.disk.hasMany(db.offer);
db.engine.hasMany(db.offer);
db.fuel.hasMany(db.offer);
db.suspension.hasMany(db.offer);
db.transmission.hasMany(db.offer);
db.headlight.hasMany(db.offer);
db.interior.hasMany(db.offer);
db.material.hasMany(db.offer);
db.parking.hasMany(db.offer);
db.roof.hasMany(db.offer);
db.state.hasMany(db.offer);
db.unit.hasMany(db.offer);
db.year.hasMany(db.offer);
db.user.hasMany(db.offer);

db.region.hasMany(db.city);

db.offer.hasMany(db.image);

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
