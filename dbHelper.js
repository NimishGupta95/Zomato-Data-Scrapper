var mongo = require('mongodb');

module.exports = {
	connectToMongo : function(url,callback) {
		connectToMongo(url, callback);
	},

	insertToMongo: function(db, data, callback) {
		insertToMongo(db, data, callback);
	}
}

function connectToMongo(url, callback) {
	mongo.connect(url, function(err, db) {
		if(err)
			return callback(err);
		callback(null, db);
	})
}

function insertToMongo(db, data, callback) {
	var r_db = db.collection('restaurants');
	r_db.insert(data, function(err, docs) {
		if(err)
			return callback(err);
		callback(null, {result: 'Success'});
	})
}


