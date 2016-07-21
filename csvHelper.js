var fs = require('fs');
var csv = require('fast-csv');
var json2csv = require('json2csv');

module.exports = {
	generateCSV: function(data, callback) {
        var fields = ['name', 'address', 'cost'];
        var csv = json2csv({ data: data, fields: fields });
 
        fs.writeFile('./data.csv', csv, function(err) {
           if (err) throw err;
           console.log('CSV File Saved');
           callback(null, {'result': "Success"});
        });
		
	}
}

