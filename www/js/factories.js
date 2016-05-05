angular.module('app.factories', ['firebase', 'ngCordova'])
    .factory('Authorization', [function() {

        var user = {};
        user.id = "";
        user.height = 0;
        user.age = 0;
        user.gender = "";
        return user;
    }])

    .factory("Auth", ["$firebaseAuth", function($firebaseAuth, $rootScope) {
        var ref = new Firebase("https://shining-torch-6074.firebaseio.com");
        return $firebaseAuth(ref);
    }])

    .factory('AuthLogin', [function($firebaseAuth) {
        var ref = new Firebase("https://shining-torch-6074.firebaseio.com");
        var userRef = new Firebase("https://shining-torch-6074.firebaseio.com/users");
        var user = {};
        return {
            getCurrentUser: function() {
                return user;
            },
            facebookLogin: function() {
                ref.authWithOAuthPopup("facebook", function(error, authData) {
                    if (error) {
                        window.alert('FB login failed!');
                    } else {
                        userRef.child(authData.uid).once("value", function(querySnapshot) {
                            querySnapshot.forEach(function(data) {
                                user.uid = authData.uid;
                                switch (data.key()) {
                                    case "id":
                                        user.id = data.val();
                                        break;
                                    case "first_name":
                                        user.first_name = data.val();
                                        break;
                                    case "last_name":
                                        user.last_name = data.val();
                                        break;
                                    case "height":
                                        user.height = data.val();
                                        break;
                                    case "age":
                                        user.age = data.val();
                                        break;
                                    case "gender":
                                        user.gender = data.val();
                                        break;
                                    case "bodyType":
                                        user.bodyType = data.val();
                                        break;
                                    case "smokingHabit":
                                        user.smokingHabit = data.val();
                                        break;
                                    case "drinkingHabit":
                                        user.drinkingHabit = data.val();
                                        break;
                                    case "city":
                                        user.city = data.val();
                                        break;
                                    case "myDes":
                                        user.myDes = data.val();
                                        break;
                                    case "bounty":
                                        user.bounty = data.val();
                                        break;
                                    case "bountyUnit":
                                        user.bountyUnit = data.val();
                                        break;
                                    case "profileIndex":
                                        user.profileIndex = data.val();
                                        break;
                                    case "profileImage":
                                        user.profileImage = data.val();
                                        console.log("ProfileImage: " + data.key() + "'s value is " + data.val().substring(1,5));
                                        break;
                                    default:
                                        break;
                                }
                                if (data.key() !== "profileImage" && data.key() !== "images") {
                                    console.log("FBLogin The " + data.key() + "'s value is " + data.val());
                                }

                            });
                        });

                        userRef.child(authData.uid).once("value", function(querySnapshot) {
                            if (querySnapshot.numChildren() == 0) {
                                userRef.child(String(authData.uid)).set({
                                    "id": user.id,
                                    // "last_name": Authorization.lastName,
                                    // "first_name": Authorization.firstName,
                                    "gender": user.gender
                                });
                                console.log(querySnapshot.numChildren() + "Reg new user.");
                            } else {
                                console.log(querySnapshot.numChildren() + "Dont reg new user.");
                            }
                        });
                    }
                });
            },
            login: function(incomingUser) {
                console.log(incomingUser);
                ref.authWithPassword({
                    email: incomingUser.email,
                    password: incomingUser.password
                }, function(error, authData) {
                    if (error) {
                        alert("Email Login Failed!", error);
                    } else {
                        userRef.child(authData.uid).once("value", function(querySnapshot) {
                            user.uid = authData.uid;
                            querySnapshot.forEach(function(data) {
                                switch (data.key()) {
                                    case "id":
                                        user.id = data.val();
                                        break;
                                    case "height":
                                        user.height = data.val();
                                        break;
                                    case "age":
                                        user.age = data.val();
                                        break;
                                    case "gender":
                                        user.gender = data.val();
                                        break;
                                    case "bodyType":
                                        user.bodyType = data.val();
                                        break;
                                    case "smokingHabit":
                                        user.smokingHabit = data.val();
                                        break;
                                    case "drinkingHabit":
                                        user.drinkingHabit = data.val();
                                        break;
                                    case "city":
                                        user.city = data.val();
                                        break;
                                    case "myDes":
                                        user.myDes = data.val();
                                        break;
                                    case "bounty":
                                        user.bounty = data.val();
                                        break;
                                    case "bountyUnit":
                                        user.bountyUnit = data.val();
                                        break;
                                    case "profileIndex":
                                        user.profileIndex = data.val();
                                        break;
                                    case "profileImage":
                                        user.profileImage = data.val();
                                        console.log("ProfileImage: " + data.key() + "'s value is " + data.val().substring(1,5));
                                        break;
                                    default:
                                        break;

                                }
                                if (data.key() !== "profileImage" && data.key() !== "images") {
                                    console.log("EmailLogin The " + data.key() + "'s value is " + data.val());
                                }
                            });
                        });

                        // logout: function() {
                        //     simpleLogin.$logout();
                        // },
                        // onLogin: function(cb) {
                        //     $rootScope.$on('$firebaseSimpleLogin:login',
                        //         function(e, user) {
                        //             cb(e, user);
                        //         });
                        // },
                        // onLogout: function(cb) {
                        //     $rootScope.$on('$firebaseSimpleLogin:logout',
                        //         function(e, user) {
                        //             cb(e, user);
                        //         });
                        // }
                    }
                });
                return user;
            },
        }
    }])

    .factory('ImageService', function($cordovaCamera, $q, $cordovaFile, $rootScope) {
        function makeid() {
            var text = '';
            var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

            for (var i = 0; i < 5; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        };

        function optionsForType(type) {
            var source;
            switch (type) {
                case 0:
                    source = Camera.PictureSourceType.CAMERA;
                    break;
                case 1:
                    source = Camera.PictureSourceType.PHOTOLIBRARY;
                    break;
            }
            return {
                quality: 60,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: source,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                popoverOptions: CameraPopoverOptions,
                cameraDirection: 1,
                targetWidth: 500,
                targetHeight: 500,
                saveToPhotoAlbum: false
            };
        }

        function saveMedia(type) {
            return $q(function(resolve, reject) {
                var options = optionsForType(type);
                $cordovaCamera.getPicture(options).then(function(imageUrl) {
                    $rootScope.syncArray.$add({ image: imageUrl }).then(function() {
                        window.alert("Image has been uploaded");
                    });
                }, function(error) {
                    window.alert("Image Error");
                    console.error(error);
                });
            })
        }
        return {
            handleMediaDialog: saveMedia
        }
    });