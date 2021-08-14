const {user} = require("../models");
const db = require("../models");
const User = db.user;
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

    return {limit, offset};
};

const getPagingData = (data, page, limit) => {
    const {count: totalItems, rows: offers} = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return {totalItems, offers, totalPages, currentPage};
};

const queryForParams = (offer) => {
    const queryPromises = [
        Mark.findByPk(offer.markId),
        Model.findByPk(offer.modelId),
        Year.findByPk(offer.yearId),
        Transmission.findByPk(offer.transmissionTypeId),
        Color.findByPk(offer.colorId),
        Capacity.findByPk(offer.capacityValueId),
        Engine.findByPk(offer.engineTypeId),
        Body.findByPk(offer.bodyTypeId),
        Image.findOne({
            attributes: ['name'],
            where: {
                offerId: offer.id,
                is_main: 1
            }
        })
    ];

    if (Object.keys(offer.dataValues).length > 11) {
        if (offer.generationId) {
            queryPromises.push(Generation.findByPk(offer.generationId));
        }
        queryPromises.push(Image.findAll({
            attributes: ['name'],
            where: {
                offerId: offer.id,
                is_main: 0
            }
        }));
    }
    // if(offer.capacityValueId){
    //   queryPromises.push(offer.capacityValueId)
    // }
    // if(offer.engineTypeId){
    //   queryPromises.push(offer.engineTypeId)
    // }
    // if(offer.bodyTypeId){
    //   queryPromises.push(offer.bodyTypeId)
    // }
    // if(offer.driveUnitId){
    //   queryPromises.push(offer.driveUnitId)
    // }

    return Promise.all(queryPromises);
}

const queryAllParams = (offerPromises) => {
    return Promise.all([...offerPromises]);
}

const checkAllFields = (dataObject) => {
    if (
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
    ) {
        return true;
    } else {
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
        bodyTypeId: dataObject.checkedBody,
        stateId: dataObject.checkedState,
        engineTypeId: dataObject.checkedEngine,
        capacityValueId: dataObject.checkedCapacity,
        driveUnitId: dataObject.checkedUnit,
        transmissionTypeId: dataObject.checkedTransmission,
        colorId: dataObject.checkedColor,
        interiorId: dataObject.checkedInterior,
        materialId: dataObject.checkedMaterial
    }
}

// Find params for offer creator
exports.createOfferParams = async (req, res) => {
    let offerParams = {};

    if (req.query.mark_id) {
        offerParams.models = await Model.findAll({
            attributes: ['id', 'name', 'system_id'],
            where: {
                markId: req.query.mark_id
            }
        }).catch(err => {
            res.status(500).send({
                message: "Error getting models"
            });
        });
    } else if (req.query.model_id) {
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
    } else {
        offerParams.marks = await Mark.findAll({
            attributes: ['id', 'name', 'system_id']
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
        return res.status(500).send({message: 'Необходимо прикрепить хотя бы 1 фото'});
    }

    if (checkAllFields(req.body)) {
        let offer = createObjectFromFields(req.body);
        offer.userId = req.userId;
        offer.status = 1;
        console.log('offer: ', offer);
        if (offer.capacityValueId === 'undefined') {
            offer.capacityValueId = null;
        }
        Offer.create(offer)
            .then((createdOffer) => {
                req.body.images.forEach((image, number) => {
                    createdOffer.createImage({name: image, is_main: number === 0 ? 1 : 0});
                });
                res.send({message: 'Объявление создано успешно'});
            })
            .catch(error => {
                console.log(error);
                return res.status(500).send({message: 'Ошибка при загрузке данных'});
            });
    }
};

const normalizeAllOffers = (offers, params) => {
    console.log('offers: ', offers)
    console.log('params: ', params)

    if (offers.length === params.length) {
        offers = offers.map((offer, index) => {
            let normalizedOffer = {
                id: offer.id,
                mileage_km: offer.mileage_km,
                mark: params[index][0].name,
                model: params[index][1].name,
                generation: offer.generationId,
                year: params[index][2].value,
                transmission: params[index][3].name_ru,
                color: params[index][4].name_ru,
                capacity: params[index][5].value,
                engine: params[index][6].name_ru,
                body: params[index][7] && params[index][7].name_ru,
                image: params[index][8].name,
            };
            if (Object.keys(offer.dataValues).length > 11) {
                if (params[index][9]) {
                    normalizedOffer.generation = params[index][9].generation + ' (' + params[index][9].first_year + ' - ' + params[index][9].second_year + ')';
                }
                if (params[index][10]) {
                    normalizedOffer.images = params[index][10];
                }
            }
            return normalizedOffer;
        });
    }
    return offers;
}

exports.findOffers = async (req, res) => {
    const {page} = req.query;
    const {limit, offset} = getPagination(page, 9);

    let searchFilter = {};

    if (req.params.mark) {
        let mark = await Mark.findOne({
            attributes: ['id'],
            where: {
                system_id: req.params.mark.toUpperCase()
            }
        });
        searchFilter.markId = mark.id;
        console.log('searchFilter: ', searchFilter);

        if (req.params.model) {
            let model = await Model.findOne({
                attributes: ['id'],
                where: {
                    system_id: req.params.model.toUpperCase()
                }
            });
            searchFilter.modelId = model.id;
            if (req.params.generation) {
                searchFilter.generationId = req.params.generation;
            }
        }
    }

    Offer.findAndCountAll(
        {
            attributes: ['id', 'mileage_km', 'markId', 'modelId', 'generationId', 'yearId', 'transmissionTypeId', 'colorId', 'capacityValueId', 'engineTypeId', 'bodyTypeId'],
            where: searchFilter,
            limit,
            offset
        })
        .then(data => {
            const response = getPagingData(data, page, limit);
            const queriesForParams = [];

            for (offer of response.offers) {
                queriesForParams.push(queryForParams(offer));
            }
            queryAllParams(queriesForParams)
                .then(offersParams => {
                    response.offers = normalizeAllOffers(response.offers, offersParams);
                    res.send(response);
                });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while getting offers."
            });
        });
};

exports.showOffer = async (req, res) => {
    let offer;
    if (req.params.offer) {
        offer = await Offer.findOne({
            where: {
                id: req.params.offer
            }
        }).catch(() => {
            res.status(500).send({
                message: "Error getting offer"
            });
        });
    }
    console.log(req.params.offer);

    queryAllParams([queryForParams(offer)])
        .then(offersParams => {
            offer = normalizeAllOffers([offer], offersParams)[0];
            res.send(offer);
        });
};

exports.createFavorite = (req, res) => {
    User.findOne({
        where: {
            id: req.userId
        }
    }).then(user => {
        Offer.findOne({
            where: {
                id: req.params.offer
            }
        }).then(offer => {
            offer.getUsers().then((usersInOffer) => {
                for (userInOffer of usersInOffer) {
                    if (usersInOffer.id === req.userId) {
                        res.status(500).send({
                            message: "Уже добавлено в избранное"
                        });
                        return;
                    }
                }
                offer.addUser(user);
                res.send(200);
            })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while getting users of offer"
                    });
                })
        })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while getting offer"
                });
            })
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while getting user"
            });
        });
}

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Tutorial.update(req.body, {
        where: {id: id}
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
        where: {id: id}
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
            res.send({message: `${nums} Tutorials were deleted successfully!`});
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
    const {page, size} = req.query;
    const {limit, offset} = getPagination(page, size);

    Tutorial.findAndCountAll({where: {published: true}, limit, offset})
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
