angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
    $scope.updates = [{
        avator: "http://ionicframework.com/img/docs/mcfly.jpg",
        img: "http://ionicframework.com/img/docs/delorean.jpg",
        description: "hahahaha"
    }];
})

.controller('ChatsCtrl', function($scope, Chats) {
    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
        Chats.remove(chat);
    }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('GymDetailCtrl', function($scope, $stateParams, ResourceProvider) {
    $scope.gymid = $stateParams.gymId;
    ResourceProvider.getres('gym', $scope.gymid, function(data) {
        console.log(JSON.stringify(data));
    });

})

.controller('CoachCtrl', function($scope, $stateParams, ResourceProvider, $ionicHistory, $ionicModal, $ionicSlideBoxDelegate) {
    $scope.goBack = function() {
        $ionicHistory.goBack();
    }
    $scope.tabfirst = true;
    $scope.coachid = $stateParams.id;
    //1.get coach detail
    ResourceProvider.getres('coach', $scope.coachid, function(coach) {
        $scope.coach = coach;
        console.log(coach);
        ResourceProvider.getres('timeline', coach.alias, function(timeline) {
            timeline.recent.reverse();
            $scope.timeline = timeline;
            console.log(timeline);
        });
    });

    $ionicModal.fromTemplateUrl('templates/image-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });


    $scope.openModal = function(img) {
    	$scope.aImages = [{
       	 'src': img,
       	 //'src': 'http://ionicframework.com/img/ionic-logo-blog.png',
       	 'msg': ''
		}];
        $scope.modal.show();
        // Important: This line is needed to update the current ion-slide's width
        // Try commenting this line, click the button and see what happens
        $ionicSlideBoxDelegate.update();
    };

    $scope.closeModal = function() {
        $scope.modal.hide();
    };

    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
        // Execute action
    });
    $scope.$on('modal.shown', function() {
        console.log('Modal is shown!');
    });

    // Call this functions if you need to manually control the slides
    $scope.next = function() {
        $ionicSlideBoxDelegate.next();
    };

    $scope.previous = function() {
        $ionicSlideBoxDelegate.previous();
    };

    // Called each time the slide changes
    $scope.slideChanged = function(index) {
        $scope.slideIndex = index;
    };
    $scope.showpost = function() {
        $scope.tabfirst = true;
    };
    $scope.showcourse = function() {
        $scope.tabfirst = false;
    };
})

.controller('GymCtrl', function($scope, $rootScope, $ionicHistory) {
    $scope.gym = $rootScope.gym;
    $scope.goBack = function() {
        $ionicHistory.goBack();
    }
})

.controller('AccountCtrl', ['$scope', 'BdMap', '$http', 'Geo', '$rootScope', '$ionicLoading', '$location',
    function($scope, BdMap, $http, Geo, $rootScope, $ionicLoading, $location) {
        var longitude = 116.43183;
        var latitude = 39.99274;
        $ionicLoading.show({
            template: '<ion-spinner icon="spiral"></ion-spinner><p style="color:black">定位中</p>',
            //template: '<ion-spinner icon="dots"></ion-spinner>',
            hideOnStageChange: true
        });
        $scope.gymlist = [];
        $scope.curloc = undefined;
        $scope.mapmode = false;
        $scope.loaded = false;

        $scope.toggleDisplayMode = function() {
            $scope.mapmode = !$scope.mapmode;
        }
        $scope.markerclickaction = function(gym) {
            if ($rootScope.gym != gym) {
                $rootScope.gym = gym;
            }
            $location.path('/gym/' + gym.id);
        }
        Geo.getloc(function(loc) {
            $scope.curloc = loc;
            BdMap.initMap(loc, 'bdmap');
            Geo.nearby(function(gymlist) {
                $scope.gymlist = gymlist;
                BdMap.addmarkers(gymlist, $scope.markerclickaction);
                $ionicLoading.hide();
            });
        });
    }
]);
