const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  console.log('reg data: ');

  console.log('reg data: ', req.body);
  if(req.body.name && req.body.phone && req.body.email && req.body.password){
    
    User.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: bcrypt.hashSync(req.body.password, 8)
    })
      .then(user => {
        if (req.body.roles) {
          Role.findAll({
            where: {
              name: {
                [Op.or]: req.body.roles
              }
            }
          }).then(roles => {
            user.setRoles(roles).then(() => {
              res.send({ message: "Регистрация прошла успешно" });
            });
          });
        } else {
          // user role = 1
          user.setRoles([1]).then(() => {
            res.send({ message: "Регистрация прошла успешно" });
          });
        }
      })
      .catch(err => {
        console.log('reg data: ', err.message);
        res.status(500).send({ message: err.message });
      });
      return;
  }
  res.status(500).send({ message: 'Неверные данные'});
};

exports.signin = (req, res) => {
  console.log('reg data: ', req.body)

  if(req.body.email && req.body.password){

    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: "Этот E-Mail не зарегистрирован" });
        }

        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Неверный пароль"
          });
        }

        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });

        var authorities = [];
        user.getRoles().then(roles => {
          for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
          }
          res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
          });
        });
      })
      .catch(err => {
        return res.status(500).send({ message: err.message });
      });
      return;
  }
  res.status(500).send({ message: 'Неверные данные'});
};
