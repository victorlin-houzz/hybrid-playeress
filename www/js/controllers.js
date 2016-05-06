angular.module('app.controllers', ['firebase', 'ngCordova', 'app.factories', 'ionic', 'app.services'])
    .config(function($ionicConfigProvider) {
        $ionicConfigProvider.views.maxCache(5);
        $ionicConfigProvider.tabs.position('bottom');
        // note that you can also chain configs
    })

    .controller('myCtrl', function ($ionicPopup, $rootScope, $state, $scope, $ionicHistory) {
        $scope.myGoBack = function () {
            console.log("Back func: " + $state.current.name + " " + $rootScope.user.id);
            var fb = new Firebase("https://shining-torch-6074.firebaseio.com/users");
            var fbAuth = fb.getAuth();
            // An alert dialog
            this.showAlert = function () {
                var alertPopup = $ionicPopup.alert({
                    title: '資料不完整喔!',
                    template: '缺少以下資訊: ' + paramList
                });

                alertPopup.then(function (res) {
                    console.log('Thank you for not eating my delicious ice cream cone');
                });
            };

            if ($state.current.name == "tabsController.name") {
                console.log($rootScope.tempId + "==?" + $rootScope.user.id);
                if ($rootScope.tempId === $rootScope.user.id) {
                    console.log("Didn't change ID");
                    $ionicHistory.goBack();
                } else {
                    fb.orderByChild("id").equalTo($rootScope.tempId).once("value", function (querySnapshot) {
                        console.log("ID: " + querySnapshot.numChildren());
                        if (querySnapshot.numChildren() != 0) {
                            console.log("UserID exists already!!");
                        } else {
                            console.log("Updating DB: " + fbAuth.uid + " ===> " + $rootScope.tempId);
                            $rootScope.user.id = $rootScope.tempId;
                            fb.child(fbAuth.uid).update({
                                "id": $rootScope.user.id
                            });
                            $ionicHistory.goBack();
                        }
                    });
                }
            } else if ($state.current.name == "tabsController.profile") {
                var paramList = "";
                var jsonData = {};
                if (!Boolean($rootScope.tempId) && !($rootScope.user.id)) {
                    console.log($rootScope.tempId + " didnt change ID");
                    paramList += "暱稱, ";
                } else if ($rootScope.tempId) {
                    jsonData["id"] = $rootScope.tempId;
                }
                if (!Boolean($rootScope.tempAge) && !($rootScope.user.age)) {
                    console.log($rootScope.tempAge + " didnt change age");
                    paramList += "年齡, ";
                } else if ($rootScope.tempAge) {
                    jsonData["age"] = $rootScope.tempAge;
                }
                if (!Boolean($rootScope.tempHeight) && !($rootScope.user.height)) {
                    console.log($rootScope.tempHeight + " didnt change height");
                    paramList += "身高, ";
                } else if ($rootScope.tempHeight) {
                    jsonData["height"] = $rootScope.tempHeight;
                }
                if (!Boolean($rootScope.tempGender) && !($rootScope.user.gender)) {
                    console.log($rootScope.tempGender + " didnt change gender");
                    paramList += "性別, ";
                } else if ($rootScope.tempGender) {
                    jsonData["gender"] = $rootScope.tempGender;
                }
                if (!Boolean($rootScope.tempBodyType) && !($rootScope.user.bodyType)) {
                    console.log("didnt change bodyType");
                    paramList += "體型, ";
                } else if ($rootScope.tempBodyType) {
                    jsonData["bodyType"] = $rootScope.tempBodyType;
                }
                if (!Boolean($rootScope.tempSmokingHabit) && !($rootScope.user.smokingHabit)) {
                    console.log("didnt change smoking habit");
                    paramList += "抽煙習慣, ";
                } else if ($rootScope.tempSmokingHabit) {
                    jsonData["smokingHabit"] = $rootScope.tempSmokingHabit;
                }
                if (!Boolean($rootScope.tempDrinkingHabit) && !($rootScope.user.drinkingHabit)) {
                    console.log("didnt change drinkingHabit");
                    paramList += "抽煙習慣, ";
                } else if ($rootScope.tempDrinkingHabit) {
                    jsonData["drinkingHabit"] = $rootScope.tempDrinkingHabit;
                }
                if (!Boolean($rootScope.tempCity) && !($rootScope.user.city)) {
                    console.log("didnt change city");
                    paramList += "所在地, ";
                } else if ($rootScope.tempCity) {
                    jsonData["city"] = $rootScope.tempCity;
                }
                if (!Boolean($rootScope.tempMyDes) && !($rootScope.user.myDes)) {
                    console.log("didnt change myDes");
                    paramList += "關於我, ";
                } else if ($rootScope.tempMyDes) {
                    jsonData["myDes"] = $rootScope.tempMyDes;
                }
                if (!Boolean($rootScope.tempBounty) && !($rootScope.user.bounty)) {
                    console.log($rootScope.tempBounty + " didnt change bounty");
                    paramList += "懸賞金, ";
                } else if ($rootScope.tempBounty) {
                    jsonData["bounty"] = $rootScope.tempBounty;
                }
                if (!Boolean($rootScope.tempBountyUnit) && !($rootScope.user.bountyUnit)) {
                    console.log($rootScope.tempBountyUnit + " didnt change bountyUnit");
                    paramList += "賞金單位, ";
                } else if ($rootScope.tempBountyUnit) {
                    jsonData["bountyUnit"] = $rootScope.tempBountyUnit;
                }
                if (paramList != "") {
                    paramList = paramList.substr(0, paramList.length - 2);
                    console.log(paramList);

                    this.showAlert();
                } else {
                    console.log("Update Json: " + JSON.stringify(jsonData));
                    if (Boolean(jsonData.id)) {
                        $rootScope.user.id = jsonData.id;
                        console.log("id: " + jsonData.id);
                    }
                    if (Boolean(jsonData.age)) {
                        $rootScope.user.age = jsonData.age;
                        console.log("age: " + jsonData.age);
                    }
                    if (Boolean(jsonData.height)) {
                        $rootScope.user.height = jsonData.height;
                        console.log("height: " + jsonData.height);
                    }
                    if (Boolean(jsonData.gender)) {
                        $rootScope.user.gender = jsonData.gender;
                        console.log("gender: " + jsonData.gender);
                    }
                    if (Boolean(jsonData.bodyType)) {
                        $rootScope.user.bodyType = jsonData.bodyType;
                        console.log("bodyType: " + jsonData.bodyType);
                    }
                    if (Boolean(jsonData.smokingHabit)) {
                        $rootScope.user.smokingHabit = jsonData.smokingHabit;
                        console.log("smokingHabit: " + jsonData.smokingHabit);
                    }
                    if (Boolean(jsonData.drinkingHabit)) {
                        $rootScope.user.drinkingHabit = jsonData.drinkingHabit;
                        console.log("drinkingHabit: " + jsonData.drinkingHabit);
                    }
                    if (Boolean(jsonData.city)) {
                        $rootScope.user.city = jsonData.city;
                        console.log("city: " + jsonData.city);
                    }
                    if (Boolean(jsonData.myDes)) {
                        $rootScope.user.myDes = jsonData.myDes;
                        console.log("myDes: " + jsonData.myDes);
                    }
                    if (Boolean(jsonData.bounty)) {
                        $rootScope.user.bounty = jsonData.bounty;
                        console.log("bounty: " + jsonData.bounty);
                    }
                    if (Boolean(jsonData.bountyUnit)) {
                        $rootScope.user.bountyUnit = jsonData.bountyUnit;
                        console.log("bountyUnit: " + jsonData.bountyUnit);
                    }
                    fb.child(fbAuth.uid).update(jsonData);
                    $ionicHistory.goBack();
                }
            } else {
                $ionicHistory.goBack();
            }
        };
    })
    
    .controller('tabCtrl', function($ionicHistory, $ionicPlatform, $rootScope, $scope, $state) {
        console.log("tabCtrl...");
        //     // run this function when either hard or soft back button is pressed
        //     var doCustomBack = function () {
        //         if($state.current.name=="tabsController.name"){
        //             console.log($state.nameInput);
        //         }
        //         $ionicHistory.goBack();
        //         console.log($state.current.name);
        //     };

        //     // override soft back
        //     // framework calls $rootScope.$ionicGoBack when soft back button is pressed
        //     var oldSoftBack = $rootScope.$ionicGoBack;
        //     $rootScope.$ionicGoBack = function () {
        //         doCustomBack();
        //     };
        //     var deregisterSoftBack = function () {
        //         $rootScope.$ionicGoBack = oldSoftBack;
        //     };

        //     // override hard back
        //     // registerBackButtonAction() returns a function which can be used to deregister it
        //     var deregisterHardBack = $ionicPlatform.registerBackButtonAction(
        //         doCustomBack, 101
        //         );

        //     // cancel custom back behaviour
        //     $scope.$on('$destroy', function () {
        //         deregisterHardBack();
        //         deregisterSoftBack();
        //     });
    })

    .controller('searchCtrl', function($ionicHistory, $rootScope, $scope, $firebaseAuth, resolveSelf) {

        $ionicHistory.clearHistory();
        console.log("searchCtrl");
        $scope.offset = 0;
        $scope.users = [];
        $rootScope.user = resolveSelf;
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Data from route: " + JSON.stringify($rootScope.user.id));
        var fbUsers = new Firebase("https://shining-torch-6074.firebaseio.com/users/");

        $scope.refresh = function() {
            $scope.offset = 0;
            $scope.users = [];
            $scope.loadMore();
        };
        $scope.loadMore = function() {

            var oppoGender = "Playress";
            if ($rootScope.user.gender == "Playress") {
                oppoGender = "Player";
            }
            console.log("Oppo gender is: " + oppoGender);
            fbUsers.orderByChild("gender").equalTo(oppoGender).limitToFirst(10).once("value", function(querySnapshot) {
                querySnapshot.forEach(function(data) {
                    if (fbUsers.getAuth().uid != data.key()) {
                        var oneUserRef = fbUsers.child(data.key());
                        oneUserRef.once('value', function(snapshot) {
                            if (snapshot.val().id && snapshot.val().age) {
                                var oneImageUrl = "img/playressIcon_128.png";
                                var oneGender = snapshot.val().gender;
                                if (!oneGender) {
                                    oneGender = "Playress";
                                } else if (oneGender == "Playress") {
                                    imageUrl = "img/playressIcon_128.png";
                                } else {
                                    imageUrl = "img/playerIcon_128.png";
                                }
                                if (snapshot.val().profileImage) {
                                    imageUrl = "data:image/jpeg;base64," + snapshot.val().profileImage;
                                }
                                $scope.users.push({
                                    uid : fbUsers.getAuth().uid,
                                    id: snapshot.val().id,
                                    age: snapshot.val().age,
                                    gender: oneGender,
                                    profileImage: oneImageUrl,

                                });
                                console.log(data.key() + "~~~: ~~~" + snapshot.val().id);
                            }

                            console.log("User: " + JSON.stringify($scope.users));
                        });

                    }

                });
            });
        };

        // $scope.loadMore();
    })

    .controller('chatCtrl', function($scope) {

    })

    .controller('favoriteCtrl', function($scope) {

    })

    
    .controller('userCtrl', function($scope, $stateParams) {

    })
    
    .controller('profileCtrl', function($scope) {

    });
