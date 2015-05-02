/**
 * GymsvcController
 *
 * @description :: Server-side logic for managing gymsvcs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


module.exports = {

  /**
   * `GymsvcController.nearby()`
   */
  nearby: function (req, res) {
	var lon = 116.431893;
	var lat = 39.992704
	var cb = function(ht){
		res.send(ht);
	};
	GeoSvc.getnearby(lon, lat, cb, cb);
  }
};

