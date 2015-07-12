var express = require("express");
var mysql = require('mysql');
var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '1niti@l1',
	database : 'fa'
});
var app = express();

connection.connect(function(err) {
	if (!err) {
		console.log("Database is connected ... \n\n");
	} else {
		console.log("Error connecting database ... \n\n");
	}
});

app.get("/", function(req, res) {
	res.json({
		"Message" : "FA Master Server v1.0."
	});
});

app.get("/products", function(req, res) {
	var query = "SELECT * FROM ??";
	var table = [ "product" ];
	query = mysql.format(query, table);
	connection.query(query, function(err, rows) {
		if (err) {
			res.json({
				"Error" : true,
				"Message" : "Error executing MySQL query"
			});
		} else {
			res.json({
				"Error" : false,
				"Message" : "Success",
				"Products" : rows
			});
		}
	});
});

app.get("/products/:id", function(req, res) {
	var query = "SELECT * FROM ?? WHERE ??=?";
	var table = [ "product", "id", req.params.id ];
	query = mysql.format(query, table);
	connection.query(query, function(err, rows) {
		if (err) {
			res.json({
				"Error" : true,
				"Message" : "Error executing MySQL query"
			});
		} else {
			res.json({
				"Error" : false,
				"Message" : "Success",
				"Product" : rows
			});
		}
	});
});

app.use(express.static('/usr/fa/img'));
app.listen(3000);