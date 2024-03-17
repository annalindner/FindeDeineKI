// Importierung Express-Bibliothek
const express = require('express');

// Importierung Body-Parser-Bibliothek
const bodyParser = require('body-parser');

// Importierung MySQL-Bibliothek
const mysql = require('mysql');

// Erstellung einer neuen Express-App
const app = express();

// Verwendung Body-Parser, um JSON-Daten in req.body zu parsen
app.use(bodyParser.urlencoded({ extended: true }));

// Verwendung  Express-Statik-Middleware, um statische Dateien aus dem Ordner "pages" bereizustellen
app.use(express.static('pages'));

// Erstellung einer neuen MySQL-Verbindung
const db = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: ''
});

// Verbindung mit MySQL-Datenbank
db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// Definierung eine neue POST-Route für das Hinzufügen von AI-Daten
app.post('/add_ai', (req, res) => {
  // Erstellung ein neues AI-Objekt mit den Daten aus dem Request-Body
  let ai = {
    name: req.body.aiName,
    link: req.body.aiLink,
    zugehoerigkeit: JSON.stringify(req.body.aiZugehoerigkeit), // Konvertiere die Zugehörigkeiten in JSON
    preis: req.body.aiPreis,
    beschreibung: req.body.aiBeschreibung,
    quelle: req.body.aiQuelle
  };

  // Ausführung eine INSERT-Abfrage in der MySQL-Datenbank
  let sql = 'INSERT INTO k_Modelle SET ?';
  db.query(sql, ai, (err, result) => {
    if (err) throw err;
    res.send('AI hinzugefügt...');
  });
});

// Definierung einer neue GET-Route für das Abrufen von AI-Daten
app.get('/getData', (req, res) => {
  // Ausführung eine SELECT-Abfrage in der MySQL-Datenbank
  let sql = 'SELECT * FROM k_Modelle';
  db.query(sql, (err, results) => {
      if (err) {
          console.log('error: ', err);
          res.send(err);
      } else {
          res.send(results);
      }
  });
});

// Starten Express-Server auf Port 3306
app.listen('3306', () => {
  console.log('Server gestartet auf Port 3306');
});
