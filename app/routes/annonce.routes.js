module.exports = app => {
  const annonces = require("../controllers/annonce.controller");

  var router = require("express").Router();

  // Create a new Annonce
  router.post("/", annonces.create);

  // Retrieve all Annonces
  router.get("/", annonces.findAll);

  // Retrieve a single Annonce with id
  router.get("/:id", annonces.findOne);

  // Update a Annonce with id
  router.put("/:id", annonces.update);

  // Delete a Annonce with id
  router.delete("/:id", annonces.delete);

  // Delete all Annonces
  router.delete("/", annonces.deleteAll);

  app.use('/api/annonces', router);
};
