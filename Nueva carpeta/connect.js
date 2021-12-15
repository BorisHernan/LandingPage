var express = require("express");
var mysql = require("mysql");
var app = express();
var cors = require("cors");

app.use(express.json());
app.use(cors());

var conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "apirest",
});

conexion.connect(function (error) {
  if (error) {
    throw error;
  } else {
    console.log("Conexión exitosa");
  }
});

const puerto = process.env.PUERTO || 3000;
app.listen(puerto, function () {
    console.log("Servidor funcionando en puerto: " + puerto);
  });

  app.post("/api/orden", (req, res) => {
    let data = {
      nameord: req.body.nameord,
      emaord: req.body.emaord,
      celord: req.body.celord,
      foonamord: req.body.foonamord,
      msgcord: req.body.msgcord
    };
    let sql = "INSERT INTO orden SET ?";
    conexion.query(sql, data, function (error, results) {
      if (error) {
        throw error;
      } else {
        console.log(data);
        res.send(data);
      }
    });
  });