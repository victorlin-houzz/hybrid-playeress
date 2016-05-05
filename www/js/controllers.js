angular.module('app.controllers', ['firebase', 'ngCordova', 'app.factories', 'ionic', 'app.services'])
    .config(function($ionicConfigProvider) {
        $ionicConfigProvider.views.maxCache(5);
        $ionicConfigProvider.tabs.position('bottom');
        // note that you can also chain configs
    })

    .controller('loginCtrl', function($rootScope, $scope, $state, $ionicHistory, $cordovaFacebook, Authorization, Auth, AuthLogin, $firebaseAuth) {

        $rootScope.auth = Auth;

        // any time auth status updates, add the user data to scope
        $rootScope.auth.$onAuth(function(authData) {
            $rootScope.authData = authData;
            // console.log("authData: " + JSON.stringify(authData));
        });


        $scope.user = {
            "email": "swissashley@gmail.com",
            "password": "1111"
        };
        $rootScope.ref = new Firebase("https://shining-torch-6074.firebaseio.com");
        $rootScope.userRef = new Firebase("https://shining-torch-6074.firebaseio.com/users");

        $scope.loginEmail = function() {
            $rootScope.showLoading("Authenticating..");
            AuthLogin.login($scope.user);
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tabsController.search');
        };

        $scope.loginFacebook = function() {
            $rootScope.showLoading("Authenticating..");
            AuthLogin.facebookLogin($scope.user);
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('tabsController.search');
        };
    })

    .controller('signupCtrl', function($scope, $state) {
        $scope.data = {};
        $scope.signupEmail = function() {

            var ref = new Firebase("https://shining-torch-6074.firebaseio.com");
            ref.createUser({
                email: $scope.data.email,
                password: $scope.data.password
            }, function(error, userData) {
                if (error) {
                    window.alert("Error creating user:", error);
                } else {
                    $state.go('login');
                    window.alert("Successfully created user account with uid:", userData.uid);
                }
            });

        };

    })

    .controller('ProfileCtrl', function($rootScope, $scope) {
        this.id = $rootScope.user.id;
        this.age = $rootScope.user.age;
        this.height = $rootScope.user.height;
        this.gender = $rootScope.user.gender;
        this.bodyType = $rootScope.user.bodyType;
        this.smokingHabit = $rootScope.user.smokingHabit;
        this.drinkingHabit = $rootScope.user.drinkingHabit;
        this.city = $rootScope.user.city;
        this.myDes = $rootScope.user.myDes;
        this.bounty = $rootScope.user.bounty;
        this.bountyUnit = $rootScope.user.bountyUnit;
        this.setId = function() {
            $rootScope.tempId = this.id;
            console.log("Changing id.." + this.id);
        };

        this.setAge = function() {
            $rootScope.tempAge = this.age;
            console.log("Changing age.." + this.age);
        };

        this.setHeight = function() {
            $rootScope.tempHeight = this.height;
            console.log("Changing height.." + this.height);
        };

        this.setGender = function() {
            $rootScope.tempGender = this.gender;
            // if (this.gender.substring(0, 8) == "Playress") {
            //     this.wishType = "許願池";
            // } else {
            //     this.wishType = "藏寶箱";
            // }
            console.log("Changing gender.." + this.gender);
        };

        this.setBodyType = function() {
            $rootScope.tempBodyType = this.bodyType;
            console.log("Changing bodyType.." + this.bodyType);
        };
        this.setSmokingHabit = function() {
            $rootScope.tempSmokingHabit = this.smokingHabit;
            console.log("Changing smokingHabit.." + this.smokingHabit);
        };
        this.setDrinkingHabit = function() {
            $rootScope.tempDrinkingHabit = this.drinkingHabit;
            console.log("Changing drinkingHabit.." + this.drinkingHabit);
        };
        this.setCity = function() {
            $rootScope.tempCity = this.city;
            console.log("Changing city.." + this.city);
        };
        this.setMyDes = function() {
            $rootScope.tempMyDes = this.myDes;
            console.log("Changing myDes.." + this.myDes);
        };
        this.setBounty = function() {
            $rootScope.tempBounty = this.bounty;
            console.log("Changing bounty.." + this.bounty);
        };
        this.setBountyUnit = function() {
            $rootScope.tempBountyUnit = this.bountyUnit;
            console.log("Changing bountyUnit.." + this.bountyUnit);
        };
        this.bodyTypes = ["精瘦", "運動", "標準", "壯碩", "肥胖", "不顯示"];
        this.smokingHabits = ["不抽煙", "偶爾抽煙", "經常抽煙", "不顯示"];
        this.drinkingHabits = ["不喝酒", "偶爾喝酒", "經常喝酒", "不顯示"];
        this.bountyUnits = ["/小時", "/天", "/周", "/次"];
        this.citys = ["基隆市", "台北市", "新北市", "桃園市", "新竹市", "新竹縣", "苗栗縣", "台中市", "南投縣市", "彰化縣市", "雲林縣市", "嘉義市", "嘉義縣", "台南市", "高雄市", "屏東縣市", "台東縣市", "花蓮縣市", "宜蘭縣市", "澎湖縣", "金門縣", "連江縣"];
    })
    .controller('myCtrl', function($ionicPopup, $rootScope, $state, $scope, $ionicHistory) {
        $scope.myGoBack = function() {
            console.log("Back func: " + $state.current.name + " " + $rootScope.user.id);
            var fb = new Firebase("https://shining-torch-6074.firebaseio.com/users");
            var fbAuth = fb.getAuth();
            // An alert dialog
            this.showAlert = function() {
                var alertPopup = $ionicPopup.alert({
                    title: '資料不完整喔!',
                    template: '缺少以下資訊: ' + paramList
                });

                alertPopup.then(function(res) {
                    console.log('Thank you for not eating my delicious ice cream cone');
                });
            };

            if ($state.current.name == "tabsController.name") {
                console.log($rootScope.tempId + "==?" + $rootScope.user.id);
                if ($rootScope.tempId === $rootScope.user.id) {
                    console.log("Didn't change ID");
                    $ionicHistory.goBack();
                } else {
                    fb.orderByChild("id").equalTo($rootScope.tempId).once("value", function(querySnapshot) {
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

    .controller('meCtrl', function($ionicLoading, $ionicActionSheet, $rootScope, $scope, $ionicHistory, $ionicModal, $firebaseAuth, $firebaseArray, $cordovaCamera, $cordovaFacebook, ImageService) {
        this.images = [];
        var fb = new Firebase("https://shining-torch-6074.firebaseio.com");
        var fbAuth = fb.getAuth();
        console.log("meCtrl");
        var userReference = fb.child("users/" + fbAuth.uid);
        $rootScope.syncArray = $firebaseArray(userReference.child("images"));
        $rootScope.images = $rootScope.syncArray;

        this.upload = function() {
            $scope.hideSheet = $ionicActionSheet.show({
                buttons: [
                    { text: '照相機' },
                    { text: '從相簿選取' }
                ],
                titleText: '新增相片',
                cancelText: '取消',
                buttonClicked: function(index) {
                    $scope.addImage(index);
                }
            });
        }

        $scope.addImage = function(type) {
            $scope.hideSheet();

            ImageService.handleMediaDialog(type).then(function() {
                $scope.$apply();
            });
        }

        $scope.showImages = function(index) {
            $scope.activeSlide = index;
            $scope.showModal('templates/image-popover.html');
        }

        $scope.showModal = function(templateUrl) {
            $ionicModal.fromTemplateUrl(templateUrl, {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modal = modal;
                $scope.modal.show();
            });
        }

        // Close the modal
        $scope.closeModal = function() {
            $scope.modal.hide();
            $scope.modal.remove()
        };
        this.setProfile = function(image) {
            // window.alert(imageIndex);
            $scope.hideSheet = $ionicActionSheet.show({
                destructiveText: '設為大頭照',
                // titleText: '設定大頭照',
                cancelText: '取消',
                cancel: function() { },
                destructiveButtonClicked: function() {
                    // console.log($rootScope.syncArray.length + "  " + JSON.stringify(image) + "; " + fbAuth.uid);
                    fb.child("users/" + fbAuth.uid).update({
                        "profileImage": image
                    });
                    // $scope.profileIndex = imageIndex;
                    $rootScope.user.profileImage = image;
                    // console.log("ProfileIndex ===> " + $scope.profileIndex);
                    $scope.closeModal();
                    $scope.hideSheet();
                }
            });
        }

        this.deleteImage = function(imageIndex) {
            // window.alert($rootScope.syncArray[imageIndex].image);
            $scope.hideSheet = $ionicActionSheet.show({
                destructiveText: '按此刪除',
                // titleText: '刪除照片',
                cancelText: '取消',
                cancel: function() { },
                destructiveButtonClicked: function index() {
                    $ionicLoading.show({
                        template: '刪除中...'
                    });
                    $rootScope.syncArray.$remove($rootScope.syncArray[imageIndex]);
                    $ionicLoading.hide();
                    $scope.closeModal();
                    $scope.hideSheet();
                }
            });
        }

        // $scope.profileImage = Authorization.profileImage;
        this.checkImages = function() {
            console.log("profileIndex in me: " + $scope.profileImage.substring(0, 3));
        };
    })
    .controller('userCtrl', function($scope, $stateParams) {

    })
    
    .controller('profileCtrl', function($scope) {

    })

    .controller('settingsCtrl', function($rootScope, $scope, $state, $ionicActionSheet, $ionicLoading, $cordovaFacebook, Authorization) {
        this.logout = function() {

            var hideSheet = $ionicActionSheet.show({
                destructiveText: '按此登出',
                titleText: '',
                cancelText: '取消',
                cancel: function() { },
                buttonClicked: function(index) {
                    return true;
                },
                destructiveButtonClicked: function() {
                    $ionicLoading.show({
                        template: '登出中...'
                    });
                    $rootScope.auth.$unauth();
                    $ionicLoading.hide();
                    $state.go('login');
                }
            });

        }
    });
