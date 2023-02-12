const sql = require("./db.js");

// constructor
const Annonce = function(annonce) {
  this.prix = annonce.prix;
  this.image = annonce.image;
  this.date = annonce.date;
  this.description = annonce.description;
  this.type = annonce.type;
  this.prix = annonce.prix;
  this.code = annonce.code;
  this.processeur = annonce.processeur;
  this.memoire = annonce.memoire;


};

Annonce.create = (newAnnonce, result) => {
  sql.query("INSERT INTO annonces SET ?", newAnnonce, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created annonce: ", { id: res.insertId, ...newAnnonce });
    result(null, { id: res.insertId, ...newAnnonce });
  });
};

Annonce.findById = (id, result) => {
  sql.query(`SELECT * FROM annonces WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found annonce: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Annonce with the id
    result({ kind: "not_found" }, null);
  });
};

Annonce.getAll = (prix,image,date,description,type,code,processeur,memoire, result) => {
  let query = "SELECT * FROM annonces";

  if (prix) {
    query += ` WHERE prix LIKE '%${prix}%'`;
    query += ` WHERE image LIKE '%${image}%'`;

    query += ` WHERE date LIKE '%${date}%'`;

    query += ` WHERE description LIKE '%${description}%'`;
    query += ` WHERE type LIKE '%${type}%'`;
    query += ` WHERE prix LIKE '%${prix}%'`;
    query += ` WHERE code LIKE '%${code}%'`;
    query += ` WHERE processeur LIKE '%${processeur}%'`;
    query += ` WHERE memoire LIKE '%${memoire}%'`;



  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("annonces: ", res);
    result(null, res);
  });
};


Annonce.updateById = (id, annonce, result) => {
  sql.query(
    "UPDATE annonces SET prix = ?, image = ?,date = ?, description = ?,type = ?, prix = ?,code = ?,processeur = ?,memoire = ? WHERE id = ?",
    [annonce.prix, annonce.image, annonce.date,annonce.description,annonce.type,annonce.prix,annonce.code,annonce.processeur,annonce.memoire, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Annonce with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated annonce: ", { id: id, ...annonce });
      result(null, { id: id, ...annonce });
    }
  );
};

Annonce.remove = (id, result) => {
  sql.query("DELETE FROM annonces WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Annonce with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted annonce with id: ", id);
    result(null, res);
  });
};

Annonce.removeAll = result => {
  sql.query("DELETE FROM annonces", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} annonces`);
    result(null, res);
  });
};

module.exports = Annonce;
