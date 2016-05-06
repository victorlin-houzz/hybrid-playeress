angular.module('app.routes', ['app.factories'])
    .run(function ($rootScope, $state, Authorization, $ionicLoading, $timeout) {
        // Listen to '$locationChangeSuccess', not '$stateChangeStart'
        $rootScope.$on('$locationChangeSuccess', function () {
            // any time auth status updates, add the user data to scope
            console.log("Changing state to: " + $state.current.name + "  " + Authorization.isAuthenticated + "; auth: " + $rootScope.authData);
            if (!$rootScope.authData) {
                console.log("going back to login page");
                // $state.go('login');
            }
        })
        $rootScope.showLoading = function (msg) {
            console.log("ShowLoading...");
            $ionicLoading.show({
                template: msg || 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
            $timeout(function () {
                $rootScope.hideLoading();
            }, 2999);
        }

        $rootScope.hideLoading = function () {
            console.log("HideLoading...");
            $ionicLoading.hide();
        };

        $rootScope.toast = function (msg) {
            $rootScope.showLoading(msg);
            $timeout(function () {
                $rootScope.hideLoading();
            }, 2999);
        };
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider
            .state('tabsController.search', {
                url: '/search',
                views: {
                    'tab1': {
                        templateUrl: 'templates/search.html',
                        controller: 'searchCtrl',
                        // resolve: {
                        //     self: function(Authorization) {
                        //         // load the user before the view is loaded
                        //         return Authorization;
                        //     }
                        // }
                        resolve: {
                            resolveSelf: function (AuthLogin) {
                                return AuthLogin.getCurrentUser();
                            }
                        }
                    }
                }
            })
            .state('tabsController.chat', {
                url: '/chat',
                views: {
                    'tab2': {
                        templateUrl: 'templates/chat.html',
                    }
                }
            })
            .state('tabsController.favorite', {
                url: '/fav',
                views: {
                    'tab3': {
                        templateUrl: 'templates/favorite.html',
                    }
                }
            })
            .state('tabsController', {
                url: '',
                abstract: true,
                templateUrl: 'templates/tabsController.html',
            })
            .state('tabsController.me', {
                url: '/me',
                views: {
                    'tab4': {
                        templateUrl: 'templates/me/me.html',
                    }
                }
            })
            .state('tabsController.profile', {
                url: '/profile',
                views: {
                    'tab4': {
                        templateUrl: 'templates/me/profile.html',
                    }
                }
            })
            .state('user', {
                url: '/user/:userId',
                templateUrl: 'templates/user.html',
                // views: {
                //     'tab1': {

                //     }
                // }
            })
            .state('tabsController.settings', {
                url: '/settings',
                views: {
                    'tab4': {
                        templateUrl: 'templates/me/settings.html',
                    }
                }
            })
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login/login.html',
            })
            .state('imageopopover', {
                url: '/imageopopover',
                templateUrl: 'templates/image-opopover.html',
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'templates/login/signup.html',
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('login');
    });