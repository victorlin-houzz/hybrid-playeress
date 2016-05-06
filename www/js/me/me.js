angular.module('app.me', ['firebase', 'ionic','ngCordova','app.services', 'app.directives','app.factories'])
    .config(function ($ionicConfigProvider) {
        $ionicConfigProvider.views.maxCache(5);
        $ionicConfigProvider.tabs.position('bottom');
        // note that you can also chain configs
    })

    .controller('ProfileCtrl', function ($rootScope, $scope) { 
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
        this.setId = function () {
            $rootScope.tempId = this.id;
            console.log("Changing id.." + this.id);
        };

        this.setAge = function () {
            $rootScope.tempAge = this.age;
            console.log("Changing age.." + this.age);
        };

        this.setHeight = function () {
            $rootScope.tempHeight = this.height;
            console.log("Changing height.." + this.height);
        };

        this.setGender = function () {
            $rootScope.tempGender = this.gender;
            // if (this.gender.substring(0, 8) == "Playress") {
            //     this.wishType = "許願池";
            // } else {
            //     this.wishType = "藏寶箱";
            // }
            console.log("Changing gender.." + this.gender);
        };

        this.setBodyType = function () {
            $rootScope.tempBodyType = this.bodyType;
            console.log("Changing bodyType.." + this.bodyType);
        };
        this.setSmokingHabit = function () {
            $rootScope.tempSmokingHabit = this.smokingHabit;
            console.log("Changing smokingHabit.." + this.smokingHabit);
        };
        this.setDrinkingHabit = function () {
            $rootScope.tempDrinkingHabit = this.drinkingHabit;
            console.log("Changing drinkingHabit.." + this.drinkingHabit);
        };
        this.setCity = function () {
            $rootScope.tempCity = this.city;
            console.log("Changing city.." + this.city);
        };
        this.setMyDes = function () {
            $rootScope.tempMyDes = this.myDes;
            console.log("Changing myDes.." + this.myDes);
        };
        this.setBounty = function () {
            $rootScope.tempBounty = this.bounty;
            console.log("Changing bounty.." + this.bounty);
        };
        this.setBountyUnit = function () {
            $rootScope.tempBountyUnit = this.bountyUnit;
            console.log("Changing bountyUnit.." + this.bountyUnit);
        };
        this.bodyTypes = ["精瘦", "運動", "標準", "壯碩", "肥胖", "不顯示"];
        this.smokingHabits = ["不抽煙", "偶爾抽煙", "經常抽煙", "不顯示"];
        this.drinkingHabits = ["不喝酒", "偶爾喝酒", "經常喝酒", "不顯示"];
        this.bountyUnits = ["/小時", "/天", "/周", "/次"];
        this.citys = ["基隆市", "台北市", "新北市", "桃園市", "新竹市", "新竹縣", "苗栗縣", "台中市", "南投縣市", "彰化縣市", "雲林縣市", "嘉義市", "嘉義縣", "台南市", "高雄市", "屏東縣市", "台東縣市", "花蓮縣市", "宜蘭縣市", "澎湖縣", "金門縣", "連江縣"];
    })
    .controller('meCtrl', function ($ionicLoading, $ionicActionSheet, $rootScope, $scope, $ionicHistory, $ionicModal, $firebaseAuth, $firebaseArray, $cordovaCamera, $cordovaFacebook, ImageService) {
        this.images = [];
        var fb = new Firebase("https://shining-torch-6074.firebaseio.com");
        var fbAuth = fb.getAuth();
        console.log("meCtrl");
        var userReference = fb.child("users/" + fbAuth.uid);
        $rootScope.syncArray = $firebaseArray(userReference.child("images"));
        $rootScope.images = $rootScope.syncArray;

        this.upload = function () {
            $scope.hideSheet = $ionicActionSheet.show({
                buttons: [
                    { text: '照相機' },
                    { text: '從相簿選取' }
                ],
                titleText: '新增相片',
                cancelText: '取消',
                buttonClicked: function (index) {
                    $scope.addImage(index);
                }
            });
        }

        $scope.addImage = function (type) {
            $scope.hideSheet();

            ImageService.handleMediaDialog(type).then(function () {
                $scope.$apply();
            });
        }

        $scope.showImages = function (index) {
            $scope.activeSlide = index;
            $scope.showModal('templates/image-popover.html');
        }

        $scope.showModal = function (templateUrl) {
            $ionicModal.fromTemplateUrl(templateUrl, {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();
            });
        }

        // Close the modal
        $scope.closeModal = function () {
            $scope.modal.hide();
            $scope.modal.remove()
        };
        this.setProfile = function (image) {
            // window.alert(imageIndex);
            $scope.hideSheet = $ionicActionSheet.show({
                destructiveText: '設為大頭照',
                // titleText: '設定大頭照',
                cancelText: '取消',
                cancel: function () { },
                destructiveButtonClicked: function () {
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

        this.deleteImage = function (imageIndex) {
            // window.alert($rootScope.syncArray[imageIndex].image);
            $scope.hideSheet = $ionicActionSheet.show({
                destructiveText: '按此刪除',
                // titleText: '刪除照片',
                cancelText: '取消',
                cancel: function () { },
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
        this.checkImages = function () {
            console.log("profileIndex in me: " + $scope.profileImage.substring(0, 3));
        };
    })
    .controller('settingsCtrl', function ($rootScope, $state, $ionicActionSheet, $ionicLoading) {
        this.logout = function () {

            var hideSheet = $ionicActionSheet.show({
                destructiveText: '按此登出',
                titleText: '',
                cancelText: '取消',
                cancel: function () { },
                buttonClicked: function (index) {
                    return true;
                },
                destructiveButtonClicked: function () {
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
