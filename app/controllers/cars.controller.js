const db = require("../models");
const Mark = db.mark;
const Model = db.model;
const Generation = db.generation;
const Year = db.year;
const Body = db.body;
const State = db.state;
const Engine = db.engine;
const Capacity = db.capacity;
const Unit = db.unit;
const Transmission = db.transmission;
const Color = db.color;
const Interior = db.interior;
const Material = db.material;

const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: tutorials } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, tutorials, totalPages, currentPage };
};

// Find params for offer creator
exports.createOfferParams = async (req, res) => {
    let offerParams = {};

    if(req.query.mark_id){
        offerParams.models = await Model.findAll({
            attributes: ['id', 'name'],
            where: {
                markId: req.query.mark_id
            }
        }).catch(err => {
                res.status(500).send({
                message: "Error getting models"
            });
        });
    }
    else if(req.query.model_id){
        offerParams.generations = await Generation.findAll({
            attributes: ['id', 'generation'],
            where: {
                modelId: req.query.model_id
            }
        }).catch(err => {
                res.status(500).send({
                message: "Error getting generations"
            });
        });
    }
    else {
        offerParams.marks = await Mark.findAll({
            attributes: ['id', 'name']
        }).catch(err => {
                res.status(500).send({
                message: "Error getting marks"
            });
        });

        offerParams.years = await Year.findAll({
            attributes: ['id', 'value']
        }).catch(err => {
              res.status(500).send({
                message: "Error getting years"
            });
        });

        offerParams.bodyTypes = await Body.findAll({
            attributes: ['id', 'name_ru']
        }).catch(err => {
              res.status(500).send({
                message: "Error getting body types"
            });
        });

        offerParams.states = await State.findAll({
          attributes: ['id', 'name_ru']
        }).catch(err => {
              res.status(500).send({
                message: "Error getting states"
            });
        });

        offerParams.engineTypes = await Engine.findAll({
          attributes: ['id', 'name_ru']
        }).catch(err => {
              res.status(500).send({
                message: "Error getting engine types"
            });
        });

        offerParams.capacityValues = await Capacity.findAll({
          attributes: ['id', 'value']
        }).catch(err => {
              res.status(500).send({
                message: "Error getting capacity values"
            });
        });

        offerParams.units = await Unit.findAll({
          attributes: ['id', 'name_ru']
        }).catch(err => {
              res.status(500).send({
                message: "Error getting units"
            });
        });

        offerParams.transmissions = await Transmission.findAll({
          attributes: ['id', 'name_ru']
        }).catch(err => {
              res.status(500).send({
                message: "Error getting units"
            });
        });

        offerParams.colors = await Color.findAll({
          attributes: ['id', 'name_ru']
        }).catch(err => {
              res.status(500).send({
                message: "Error getting units"
            });
        });

        offerParams.interiors = await Interior.findAll({
          attributes: ['id', 'name_ru']
        }).catch(err => {
              res.status(500).send({
                message: "Error getting units"
            });
        });

        offerParams.materials = await Material.findAll({
          attributes: ['id', 'name_ru']
        }).catch(err => {
              res.status(500).send({
                message: "Error getting units"
            });
        });
    }
    res.send(offerParams);

};

exports.saveOffer = async (req, res) => {
  try {
    // await upload(req, res);
    console.log('files: ', req.files);
    console.log('body in controller: ', req.body);
    if (req.files.length <= 0) {
      return res.send(`You must select at least 1 file.`);
    }

    return res.send(`Files has been uploaded.`);
  } catch (error) {
    console.log(error);

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(500).send("Too many files to upload.");
    }
    return res.status(500).send(`Error when trying upload many files: ${error}`);
  }
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Tutorial.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// find all published Tutorial
exports.findAllPublished = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  Tutorial.findAndCountAll({ where: { published: true }, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
