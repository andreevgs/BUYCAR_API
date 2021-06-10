module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "12042001",
  DB: "BUYCAR_DB",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
