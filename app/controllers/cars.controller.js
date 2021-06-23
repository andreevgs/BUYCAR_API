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
const Offer = db.offer;
const Image = db.image;

const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: offers } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, offers, totalPages, currentPage };
};

const checkAllFields = (dataObject) => {
  if(
    dataObject.checkedMark && 
    dataObject.checkedModel && 
    dataObject.checkedGeneration && 
    dataObject.checkedYear &&
    dataObject.checkedBody &&
    dataObject.checkedState &&
    dataObject.checkedEngine &&
    dataObject.checkedCapacity &&
    dataObject.checkedUnit &&
    dataObject.checkedTransmission &&
    dataObject.checkedColor &&
    dataObject.checkedInterior &&
    dataObject.checkedMaterial &&
    dataObject.mileage &&
    dataObject.cost
  ){
    return true;
  }
  else {
    return false;
  }
}

const createObjectFromFields = (dataObject) => {
  return {
    cost: dataObject.cost,
    mileage_km: dataObject.mileage,
    markId: dataObject.checkedMark,
    modelId: dataObject.checkedModel,
    generationId: dataObject.checkedGeneration,
    yearId: dataObject.checkedYear,
    bodyId: dataObject.checkedBody,
    stateId: dataObject.checkedState,
    engineTypeId: dataObject.checkedEngine,
    capacityValueId: dataObject.checkedCapacity,
    unitId: dataObject.checkedUnit,
    transmissionTypeId: dataObject.checkedTransmission,
    colorId: dataObject.checkedColor,
    interiorId: dataObject.checkedInterior,
    materialId: dataObject.checkedMaterial
  }
}

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
  console.log('files: ', req.files);
  
  if (req.files.length <= 0) {
    return res.status(500).send({ message: 'Необходимо прикрепить хотя бы 1 фото' });
  }

  if (checkAllFields(req.body)){
    let offer = createObjectFromFields(req.body);
    offer.userId = req.userId;
    offer.status = 1;
    console.log('offer: ', offer);
    if(offer.capacityValueId === 'undefined'){
      offer.capacityValueId = null;
    }
    Offer.create(offer)
      .then((createdOffer) => {
        req.body.images.forEach((image, number) => {
          createdOffer.createImage({name: image, is_main: number === 0 ? 1 : 0});
        });
        res.send({ message: 'Объявление создано успешно' });
      })
      .catch(error => {
        console.log(error);
        return res.status(500).send({ message: 'Ошибка при загрузке данных' });
      });
  }
};

exports.findOffers = (req, res) => {
  const { page } = req.query;
  const { limit, offset } = getPagination(page, 3);

  Offer.findAndCountAll({ where: { status: 1 }, limit, offset })
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
