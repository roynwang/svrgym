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
				var gymhash = {}

                nearby.contents.forEach(function(item) {
                    gymhash[item.gymid] = item;
                });
                Gym.find()
                    .where({
                        id: Object.keys(gymhash)
                    })
					.populate('coaches')
                    .exec(function(err, gyms) {
						console.log(gyms);
                        gyms.forEach(function(gymitem) {
                            gymitem['width'] = 60;
							gymitem['height'] = 49;
							item = gymhash[gymitem.id];
                            gymitem['longitude'] = item.location[0];

                            gymitem['latitude'] = item.location[1];
                            gymitem['title'] = item.title;
							gymitem['address'] = item.address;
							gymitem['distance'] = item.distance;

                            //fake
                            gymitem['gymid'] = item.gymid;
                            gymitem['pics'] = ['http://media-cdn.tripadvisor.com/media/photo-s/01/87/38/c8/small-gym-area.jpg',
                                'http://www.differentworld.com/mexico-hotels/azul-beach/images/gym.jpg'
                            ];
                            gymitem['content'] = "价格:" + item.price;
                            gymlist.push(gymitem);
                        });
						console.log(gymlist);
                        res.json(gymlist);
                    });
            }
        };
        GeoSvc.getnearby(lon, lat, cb, cb);
    }
};
