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
    nearby: function(req, res) {
        var lon = req.param('longitude');
        var lat = req.param('latitude');
        var cb = function(ht) {
            var nearby = JSON.parse(ht);
            if (nearby.status != 0) {
                //error handler
            } else {
                var gymlist = [];
                nearby.contents.forEach(function(item) {
                    var gymitem = {
                        width: 60,
                        height: 49,
                    };
                    gymitem['longitude'] = item.location[0];
                    gymitem['latitude'] = item.location[1];
                    gymitem['title'] = item.title;
                    gymitem['content'] = "价格:" + item.price;
                    gymlist.push(gymitem);
                });
                res.json(gymlist);
            }
        };
        GeoSvc.getnearby(lon, lat, cb, cb);
    }
};
