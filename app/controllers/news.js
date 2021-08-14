const fs = require('fs');

const db = require("../models");
const News = db.news;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 12;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: tutorials } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, tutorials, totalPages, currentPage };
};

exports.create = (req, res) => {
  console.log('create: ', req.body);
  if (!req.body.title && !req.body.description && req.body.content) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const newsArticle = {
    title: req.body.title,
    description: req.body.description,
    cover: req.body.cover,
    published: req.body.published ? req.body.published : false
  };

  News.create(newsArticle)
    .then(data => {
      fs.writeFile(`news/news-${data.id}.md`, String(req.body.content), (err) => {
        if (err) return console.log(err);
        res.send(data);
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the newsArticle."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const { page, size, title } = req.query;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  News.findAndCountAll({ where: condition, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving newsArticles."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  News.findByPk(id)
    .then(data => {
      fs.readFile(`news/news-${data.id}.md`, 'utf8', (error, content) => {
        data.dataValues.content = content;
        res.send(data);
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving newsArticle with id=" + id
      });
    });
};

// Update a Tutorial by the id in the request
// exports.update = (req, res) => {
//   const id = req.params.id;

//   Tutorial.update(req.body, {
//     where: { id: id }
//   })
//     .then(num => {
//       if (num == 1) {
//         res.send({
//           message: "Tutorial was updated successfully."
//         });
//       } else {
//         res.send({
//           message: `Cannot update newsArticle with id=${id}. Maybe Tutorial was not found or req.body is empty!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error updating newsArticle with id=" + id
//       });
//     });
// };

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  News.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "newsArticle was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete newsArticle with id=${id}. Maybe newsArticle was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete newsArticle with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {
//   Tutorial.destroy({
//     where: {},
//     truncate: false
//   })
//     .then(nums => {
//       res.send({ message: `${nums} Tutorials were deleted successfully!` });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all tutorials."
//       });
//     });
// };

// // find all published Tutorial
// exports.findAllPublished = (req, res) => {
//   const { page, size } = req.query;
//   const { limit, offset } = getPagination(page, size);

//   Tutorial.findAndCountAll({ where: { published: true }, limit, offset })
//     .then(data => {
//       const response = getPagingData(data, page, limit);
//       res.send(response);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     });
// };
