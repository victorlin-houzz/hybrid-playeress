angular.module('app.controllers', ['firebase', 'ngCordova', 'app.factories'])
    .controller('IdCtrl', function ($rootScope, $scope, Authorization) {
        this.id = Authorization.id;
        $rootScope.tempId = Authorization.id;
        this.updateId = function () {
            $rootScope.tempId = this.id;
            console.log("Changing ID: " + $rootScope.tempId);
        };
    })
    .controller('myCtrl', function ($rootScope, $state, $scope, $ionicHistory, Authorization) {
        $scope.myGoBack = function () {
            console.log("Back func: " + $state.current.name + " " + Authorization.id + " " + Authorization.isAuthenticated);
            var fb = new Firebase("https://shining-torch-6074.firebaseio.com/users");
            var fbAuth = fb.getAuth();
            if ($state.current.name == "tabsController.name") {
                console.log($rootScope.tempId + "==?" + Authorization.id);
                if ($rootScope.tempId === Authorization.id) {
                    console.log("Didn't change ID");
                    $ionicHistory.goBack();
                } else {
                    fb.orderByChild("id").equalTo($rootScope.tempId).once("value", function (querySnapshot) {
                        console.log("ID: " + querySnapshot.numChildren());
                        if (querySnapshot.numChildren() != 0) {
                            console.log("UserID exists already!!");
                        } else {
                            console.log("Updating DB: " + fbAuth.uid + " ===> " + $rootScope.tempId);
                            Authorization.id = $rootScope.tempId;
                            fb.child(fbAuth.uid).update({
                                "id": Authorization.id
                            });
                            $ionicHistory.goBack();
                        }
                    });
                }
            } else {
                $ionicHistory.goBack();
            }
        };
    })
// .controller('tabCtrl', function ($ionicHistory,$ionicPlatform, $rootScope, $scope, $state) {

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
// })

    .controller('searchCtrl', function ($scope, $state, $ionicHistory, $firebaseArray, $cordovaCamera, $cordovaFacebook, Authorization) {

        $ionicHistory.clearHistory();
        console.log("searchCtrl");
        console.log(Authorization.name);
        $scope.images = [];
        var fb = new Firebase("https://shining-torch-6074.firebaseio.com");
        var fbAuth = fb.getAuth();
        if (fbAuth) {
            //alert("UID: "+fbAuth.uid);
            var userReference = fb.child("users/" + fbAuth.uid);
            var syncArray = $firebaseArray(userReference.child("images"));
            $scope.images = syncArray;
            // fb.child("users").child(fbAuth.uid).update({
            //     "testing": "123"
            // });
        } else {

        }

        $scope.upload = function () {
            var options = {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                popoverOptions: CameraPopoverOptions,
                targetWidth: 500,
                targetHeight: 500,
                saveToPhotoAlbum: false
            };
            $cordovaCamera.getPicture(options).then(function (imageData) {
                syncArray.$add({ image: imageData }).then(function () {
                    alert("Image has been uploaded");
                });
            }, function (error) {
                console.error(error);
            });
        }
    })

    .controller('chatCtrl', function ($scope) {

    })

    .controller('favoriteCtrl', function ($scope) {

    })

    .controller('meCtrl', function ($scope) {

    })

    .controller('profileCtrl', function ($scope) {

    })

    .controller('nameCtrl', function ($scope, $state) {
        //console.log("nameCtrl");
        //$state.go('/profile');
    })

    .controller('genderCtrl', function ($scope) {

    })

    .controller('settingsCtrl', function ($scope) {

    })

    .controller('ageCtrl', function ($scope) {

    })

    .controller('loginCtrl', function ($rootScope, $scope, $state, $ionicHistory, $cordovaFacebook, Authorization) {


        $scope.data = {};
        $scope.loginEmail = function () {

            var ref = new Firebase("https://shining-torch-6074.firebaseio.com");

            ref.authWithPassword({
                email: $scope.data.email,
                password: $scope.data.password
            }, function (error, authData) {
                if (error) {
                    Authorization = {};
                    alert("Login Failed!", error);
                } else {
                    Authorization.isAuthenticated = true;
                    $ionicHistory.nextViewOptions({
                        disableAnimate: true,
                        disableBack: true
                    });
                    $state.go('tabsController.search');
                    //alert("Authenticated successfully with payload:", authData);
                }
            });

        };

        $scope.loginFacebook = function () {
            $rootScope.showLoading("Authenticating..");

            var ref = new Firebase("https://shining-torch-6074.firebaseio.com");
            var userRef = new Firebase("https://shining-torch-6074.firebaseio.com/users");

            if (ionic.Platform.isWebView()) {
                $cordovaFacebook.login(["public_profile", "email"]).then(function (success) {
                    console.log(success);

                    ref.authWithOAuthToken("facebook", success.authResponse.accessToken, function (error, authData) {
                        if (error) {
                            Authorization = {};
                            window.alert('isWebView Firebase login failed!', error);
                        } else {
                            Authorization.isAuthenticated = true;
                            $ionicHistory.nextViewOptions({
                                disableAnimate: true,
                                disableBack: true
                            });
                            $state.go('tabsController.search');
                            window.alert('isWebView Authenticated successfully', authData);
                        }
                    });

                }, function (error) {
                    console.log(error);
                });

            }
            else {
                ref.authWithOAuthPopup("facebook", function (error, authData) {
                    if (error) {
                        Authorization = {};
                        window.alert('Firebase login failed!', error);
                    } else {
                        Authorization.id = authData.facebook.displayName.replace(/ /g, "_");
                        Authorization.lastName = authData.facebook.cachedUserProfile.last_name;
                        Authorization.firstName = authData.facebook.cachedUserProfile.first_name;
                        Authorization.gender = authData.facebook.cachedUserProfile.gender;
                        Authorization.isAuthenticated = true;
                        userRef.child(authData.uid).once("value", function (querySnapshot) {
                            if (querySnapshot.numChildren() == 0) {
                                userRef.child(String(authData.uid)).set({
                                    "id": Authorization.id,
                                    "last_name": Authorization.lastName,
                                    "first_name": Authorization.firstName,
                                    "gender": Authorization.gender
                                });
                                console.log(querySnapshot.numChildren() + "Reg new user.");
                            } else {
                                console.log(querySnapshot.numChildren() + "Dont reg new user.");
                            }
                        });

                        $ionicHistory.nextViewOptions({
                            disableAnimate: true,
                            disableBack: true
                        });
                        $state.go('tabsController.search');
                        //JSON.stringify(authData)
                        console.log(JSON.stringify(authData));

                       // window.alert('Authenticated successfully' + JSON.stringify(authData), authData);
                    }
                });
            }
        };
    })

    .controller('signupCtrl', function ($scope, $state, Authorization) {
        $scope.data = {};
        $scope.signupEmail = function () {

            var ref = new Firebase("https://shining-torch-6074.firebaseio.com");
            ref.createUser({
                email: $scope.data.email,
                password: $scope.data.password
            }, function (error, userData) {
                if (error) {
                    window.alert("Error creating user:", error);
                } else {
                    $state.go('login');
                    window.alert("Successfully created user account with uid:", userData.uid);
                }
            });

        };
    });
 