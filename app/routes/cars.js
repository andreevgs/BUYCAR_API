const { authJwt } = require("../middleware");
const { upload } = require("../middleware");
const controller = require("../controllers/cars.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/cars/add",
    // [authJwt.verifyToken],
    controller.createOfferParams
  );

  app.get(
    [
      "/api/cars",
      "/api/cars/:mark",
      "/api/cars/:mark/:model",
      "/api/cars/:mark/:model/:generation"
    ],
    [authJwt.checkAuth],
    controller.findOffers
  );

  app.get(
    "/api/cars/:mark/:model/:generation/:offer",
    controller.showOffer
  );

  app.post(
    "/api/cars/:mark/:model/:generation/:offer/favorite",
    [authJwt.verifyToken],
    controller.createFavorite
  );

  // app.delete(
  //   "/api/cars/:mark/:model/:generation/:offer/favorite",
  //   controller.deleteFavorite
  // );

  app.post(
    "/api/cars/add",
    [
      authJwt.verifyToken,
      upload.uploadFilesMiddleware,
      upload.resizeAndSaveImages
    ],
    controller.saveOffer
  );

};
