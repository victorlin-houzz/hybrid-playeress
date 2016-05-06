angular.module('app.login', ['firebase', 'ngCordova', 'app.factories', 'ionic', 'app.services'])
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

    });
