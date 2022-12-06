// var http = require('http');
const express = require('express');
let ejs = require('ejs');
const app = express();
let con = require('./database');
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.render('connexion.ejs');
});
app.get('/connexion', (req, res) => {
	res.render('connexion.ejs');
});
app.get('/inscription', (req, res) => {
	res.render('inscription.ejs');
});

//Inserer mes données
app.post('/inscription', (req, res) => {
	var nom = req.body.nom;
	var email = req.body.email;
	var motDePasse = req.body.motDePasse;
	var sql =
		"INSERT INTO etudiant (nom, email, motDePasse) VALUES ('" +
		nom +
		"', '" +
		email +
		"', '" +
		motDePasse +
		"')";
	con.query(sql, function (err, result) {
		if (err) throw err;
		res.redirect('/connexion');
	});
});

//Afficher les éléments de ma liste
app.get('/maliste', function (req, res) {
	var sql = 'SELECT * FROM etudiant';
	con.query(sql, function (error, result) {
		if (error) console.log(error);
		// console.log(result);
		res.render('maliste', { etudiant: result });
	});
});

//selection avant Modification
app.get('/modif', function (req, res) {
	var id = req.query.id;
	var sql = 'SELECT * FROM etudiant WHERE id=?';
	con.query(sql, [id], function (error, result) {
		if (error) console.log(error);
		res.render('modif', { etudiant: result });
	});
});

//Modification
app.post('/modif', function (req, res) {
	var id = req.body.id;
	var nom = req.body.nom;
	var email = req.body.email;
	var motDePasse = req.body.motDePasse;

	var sqls = 'UPDATE etudiant SET nom=?, email=?, motDePasse=? WHERE id=?';
	con.query(sqls, [nom, email, motDePasse, id], function (error, result) {
		if (error) {
			console.log(error);
		} else {
			res.redirect('/maliste');
		}
	});
});
app.listen(5000);
