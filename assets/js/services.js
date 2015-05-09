angular.module('starter.services', [])
	.run(function($rootScope){
		$rootScope.host = "http://192.168.1.120:1337/";
		$rootScope.nextRefresh = undefined;
		$rootScope.gym = undefined;
	})
    .factory('ResourceProvider', function($http, $rootScope) {
        return {
            getres: function(restype, resid, successcb, errorcb) {
                var url = $rootScope.host + restype + "/" + resid;
                $http.get(url)
                    .success(function(data, status) {
                        successcb(data);
                    })
                    .error(function(data, status) {
                        errorcb(data);
                    });
            }
        };
    })
    .factory('Geo', ['$http', '$rootScope',
        function($http, $rootScope) {
            var curloc = undefined;
            var url = $rootScope.host + 'gym/nearby';
            var getnearby = function(loc, cb) {
                $http.post(url, loc)
                    .success(function(data, status) {
                        cb(data);
                    })
                    .error(function(data, status) {});
            };
            return {
                getloc: function(cb, force) {
                    //get cur time
                    var now = Math.floor(Date.now() / 1000);
                    if (!force && $rootScope.nextrefresh && now < $rootScope.nextrefresh) {
                        cb(curloc);
                    } else {
                        $rootScope.nextrefresh = now + 60;
                        var geolocation = new BMap.Geolocation(); 
						geolocation.getCurrentPosition(function(data) {
								curloc = {
									latitude: data.point.lat,
									longitude: data.point.lng
								};
								alert(JSON.stringify(curloc));
                                cb(curloc);
                                //update nextrefresh
                                //next time refresh should be later than 60 second
                            },
                            function(data) {
                                alert(JSON.stringify(data));
                            });
                    }
                },
                nearby: function(cb) {
                    this.getloc(function(loc) {
                        getnearby(loc, cb);
                    });
                }
            }
        }
    ])
    .factory('Chats', function() {
        // Might use a resource here that returns a JSON array
        // Some fake testing data
        var chats = [{
            id: 0,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
        }, {
            id: 1,
            name: 'Max Lynx',
            lastText: 'Hey, it\'s me',
            face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
        }, {
            id: 2,
            name: 'Andrew Jostlin',
            lastText: 'Did you get the ice cream?',
            face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
        }, {
            id: 3,
            name: 'Adam Bradleyson',
            lastText: 'I should buy a boat',
            face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
        }, {
            id: 4,
            name: 'Perry Governor',
            lastText: 'Look at my mukluks!',
            face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
        }];

        return {
            all: function() {
                return chats;
            },
            remove: function(chat) {
                chats.splice(chats.indexOf(chat), 1);
            },
            get: function(chatId) {
                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].id === parseInt(chatId)) {
                        return chats[i];
                    }
                }
                return null;
            }
        };
    });
