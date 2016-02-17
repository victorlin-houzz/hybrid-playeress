angular.module('app.controllers', ['firebase', 'ngCordova'])
  
.controller('searchCtrl', function($scope) {

})
   
.controller('chatCtrl', function($scope) {

})
   
.controller('favoriteCtrl', function($scope) {

})
      
.controller('meCtrl', function($scope) {

})
   
.controller('profileCtrl', function($scope) {

})
   
.controller('nameCtrl', function($scope) {

})
   
.controller('genderCtrl', function($scope) {

})
   
.controller('settingsCtrl', function($scope) {

})
   
.controller('ageCtrl', function($scope) {

})
   
.controller('loginCtrl', function($scope, $state, $cordovaFacebook) {


  $scope.data = {};
  $scope.loginEmail = function(){

    var ref = new Firebase("https://shining-torch-6074.firebaseio.com");

    ref.authWithPassword({
      email    : $scope.data.email,
      password : $scope.data.password
    }, function(error, authData) {
      if (error) {
        alert("Login Failed!", error);
      } else {
        $state.go('tabsController.search');
        alert("Authenticated successfully with payload:", authData);
      }
    });

  };

  $scope.loginFacebook = function(){
   
    var ref = new Firebase("https://shining-torch-6074.firebaseio.com");


    if(ionic.Platform.isWebView()){
      $cordovaFacebook.login(["public_profile", "email"]).then(function(success){
        console.log(success);

        ref.authWithOAuthToken("facebook", success.authResponse.accessToken, function(error, authData) {
          if (error) {
            window.alert('Firebase login failed!', error);
          } else {
            $state.go('tabsController.search');
            window.alert('Authenticated successfully with payload:', authData);
          }
        });
     
      }, function(error){
        console.log(error);
      });        

    }
    else {

      ref.authWithOAuthPopup("facebook", function(error, authData) {
        if (error) {
           window.alert('Firebase login failed!', error);
        } else {
          $state.go('tabsController.search');
          window.alert('Authenticated successfully with payload:', authData);
        }
      });

    }

  };

})
   
.controller('signupCtrl', function($scope, $state) {
    $scope.data = {};
    $scope.signupEmail = function(){  
    
    var ref = new Firebase("https://shining-torch-6074.firebaseio.com");
    ref.createUser({
      email    : $scope.data.email,
      password : $scope.data.password
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
 