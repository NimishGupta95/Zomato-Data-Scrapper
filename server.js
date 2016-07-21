var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var dbHelper = require('./dbHelper');
var utils = require('./utils');
var csvHelper = require('./csvHelper');

var app = express();


app.get('/scrape', function(req, res) {
	url = "https://www.zomato.com/ncr/restaurants";

	request(url, function(err, response, html) {
		if(!err && response.statusCode == 200) {
			var $ = cheerio.load(html);
			var restaurantName = [], address = [], cost = [];
			var FinalData = {};

			$('.result-title').filter(function() {
				restaurantName.push(($(this).text()).trim());
			});

			$('.search-result-address').each(function(i, element) {
				address.push(($(this).text()).trim());
			});

			$('.res-cost span:nth-child(2)').each(function(i, element) {
				cost.push(($(this).text()).trim());
			});

			var data = utils.convertToJson(restaurantName, cost, address);
            
			dbHelper.connectToMongo("mongodb://localhost:27017/adurcup", function(err, db) {
				if(!err) {
					console.log('connected to database');
					dbHelper.insertToMongo(db, data, function(err, response) {
						if(!err) {
							csvHelper.generateCSV(data, function(err, result) {
								if(!err) {
									res.send(result);
								}
							})
							
						}
					});
				}
			})
			
		}
	})
});

app.listen('3000', function(err) {
	if(err) console.log(err);
	console.log('Server Started');
});

exports = module.exports = app;