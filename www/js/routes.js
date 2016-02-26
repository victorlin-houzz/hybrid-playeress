angular.module('app.routes', ['app.factories'])
    .run(function ($rootScope, $state, Authorization,$ionicLoading,$timeout) {
        // Listen to '$locationChangeSuccess', not '$stateChangeStart'
        $rootScope.$on('$locationChangeSuccess', function () {
            console.log("Changing state to: " + $state.current.name + "  " + Authorization.isAuthenticated);
            if (!Authorization.isAuthenticated) {
                // $state.go('login');
            }
        })
        $rootScope.showLoading = function (msg) {
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
                        controller: 'searchCtrl'
                    }
                }
            })
            .state('tabsController.chat', {
                url: '/chat',
                views: {
                    'tab2': {
                        templateUrl: 'templates/chat.html',
                        controller: 'chatCtrl'
                    }
                }
            })
            .state('tabsController.favorite', {
                url: '/fav',
                views: {
                    'tab3': {
                        templateUrl: 'templates/favorite.html',
                        controller: 'favoriteCtrl'
                    }
                }
            })
            .state('tabsController', {
                url: '',
                abstract: true,
                templateUrl: 'templates/tabsController.html',
                //controller: 'tabCtrl'
            })
            .state('tabsController.me', {
                url: '/me',
                views: {
                    'tab4': {
                        templateUrl: 'templates/me.html',
                        controller: 'meCtrl'
                    }
                }
            })
            .state('tabsController.profile', {
                url: '/profile',
                views: {
                    'tab4': {
                        templateUrl: 'templates/profile.html',
                        controller: 'profileCtrl'
                    }
                }
            })
            .state('tabsController.name', {
                url: '/name',
                views: {
                    'tab4': {
                        templateUrl: 'templates/name.html',
                        controller: 'nameCtrl'
                    }
                }
            })
            .state('tabsController.gender', {
                url: '/gender',
                views: {
                    'tab4': {
                        templateUrl: 'templates/gender.html',
                        controller: 'genderCtrl'
                    }
                }
            })
            .state('tabsController.settings', {
                url: '/settings',
                views: {
                    'tab4': {
                        templateUrl: 'templates/settings.html',
                        controller: 'settingsCtrl'
                    }
                }
            })
            .state('tabsController.age', {
                url: '/age',
                views: {
                    'tab4': {
                        templateUrl: 'templates/age.html',
                        controller: 'ageCtrl'
                    }
                }
            })
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'loginCtrl'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'templates/signup.html',
                controller: 'signupCtrl'
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('login');
    });