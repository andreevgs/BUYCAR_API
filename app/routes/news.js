module.exports = app => {
    const news = require("../controllers/news.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", news.create);
  
    // Retrieve all Tutorials
    router.get("/", news.findAll);
  
    // Retrieve all published Tutorials
    // router.get("/published", tutorials.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", news.findOne);
  
    // Update a Tutorial with id
    // router.put("/:id", tutorials.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", news.delete);
  
    // Create a new Tutorial
    // router.delete("/", tutorials.deleteAll);
  
    app.use('/api/news', router);
  };
  