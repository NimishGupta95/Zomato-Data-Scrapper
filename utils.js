module.exports = {
	convertToJson: function(restaurants, cost, address) {
	var RestaurantsData = [];
	for(var i=0; i<restaurants.length; i++) {
		var json = {name: "", address: "", cost: ""};
		json.name = restaurants[i];
		json.address = address[i];
		json.cost = cost[i];

		RestaurantsData[i] = json;
	}
	return RestaurantsData;
}
}

