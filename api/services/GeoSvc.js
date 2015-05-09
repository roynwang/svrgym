var request = require("request");
var ak = 'xcXyK7eUjimfC4f7fQucAZEo';
var mapurl = "http://api.map.baidu.com/geosearch/v3/nearby";
var geotable_id = "102715";
var radius = "20000";

module.exports = {
	getnearby: function(lon,lat,success, fail){
		var param = [];
		param.push("ak="+ak);
		param.push("geotable_id="+ geotable_id);
		param.push("radius="+radius);
		param.push("location="+lon + "," + lat);
		var url = mapurl + "?" + param.join("&");
		console.log(url);
		request(url, function (error, response, body) {
				if (!error && response.statusCode == 200) {
					success(body);
				}
				else{
					fail(body);
				}
		});
	}
}
