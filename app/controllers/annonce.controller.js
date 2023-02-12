const Annonce = require("../models/annonce.model");

// Create and Save a new Annonce
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Annonce
  const annonce = new Annonce({
    prix: req.body.prix,
    image: req.body.image,
    date: req.body.date,
    description: req.body.description,
    type: req.body.type,
    code: req.body.code,
    processeur: req.body.processeur,
    memoire: req.body.memoire,

  });

  // Save Annonce in the database
  Annonce.create(annonce, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Annonce."
      });
    else res.send(data);
  });
};

// Retrieve all Annonces from the database (with condition).
exports.findAll = (req, res) => {
  const prix = req.query.prix;
  const image = req.query.image;
  const date = req.query.date;
  const description = req.query.description;
  const type = req.query.type;
  const code = req.query.code;
  const processeur = req.query.processeur;
  const memoire = req.query.memoire;

  Annonce.getAll(prix,image,date,description,type,code,processeur,memoire, (err, data) => {
    if(err)
    res.status(500).send({
      message:
      err.message || "Some error occurred while retrieving annonces."
    });
    else res.send(data);
  });

};
  

// Find a single Annonce by Id
exports.findOne = (req, res) => {
  Annonce.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Annonce with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Annonce with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};



// Update a Annonce identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Annonce.updateById(
    req.params.id,
    new Annonce(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Annonce with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Annonce with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Annonce with the specified id in the request
exports.delete = (req, res) => {
  Annonce.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Annonce with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Annonce with id " + req.params.id
        });
      }
    } else res.send({ message: `Annonce was deleted successfully!` });
  });
};

// Delete all Annonces from the database.
exports.deleteAll = (req, res) => {
  Annonce.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all annonces."
      });
    else res.send({ message: `All Annonces were deleted successfully!` });
  });
};
