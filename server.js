const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use('/public', express.static(__dirname + '/uploads'));
app.use('/newsmd', express.static(__dirname + '/news'));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;
const Offer = db.offer;
const Body = db.body;
const Mark = db.mark;
const Model = db.model;

db.sequelize.sync().then(() => {
  // initial();
});
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require("./app/routes/news")(app);
require("./app/routes/cars")(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });

  // Body.create({
  //   name_ru: "Седан"
  // });
  // Offer.findByPk(1).then((offer) => {
  //   Body.findOne({
  //     where: {
  //       id: 3
  //     }
  //   }).then((body) => {
  //     offer.setBodyType(body).catch(err=>console.log(err));
  //   }).catch(err=>console.log(err));
    
  // }).catch(err=>console.log(err));

}