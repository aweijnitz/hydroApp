angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeLogin();
            }, 1000);
        };
    })
    .controller('ScheduleCtrl', function ($scope, $http, $interval, $ionicLoading) {
        var dataEndpoint = 'http://hydro.homelinux.net/pumpschedule?count=16&format=json'; // TODO: Move to config
        var dataRefreshInterval = 20*1000; // TODO: Move to config
        var intervalId;

        $scope.stopDataFetch = function () {
            if (angular.isDefined(intervalId)) {
                $interval.cancel(intervalId);
                intervalId = undefined;
            }
        };

        $scope.showLoading = function () {
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });
        };
        $scope.hideLoading = function () {
            $ionicLoading.hide();
        };
        $scope.showLoading();
        // Initial data fetch
        $http.get(dataEndpoint).then(function (resp) {
            $scope.sensorData = resp.data;
            $scope.hideLoading();

            // Begin fetching data regularly
            if (!angular.isDefined(intervalId)) {
                intervalId = $interval(function dataFetcher() {
                    $http.get(dataEndpoint).then(function (resp) {
                        $scope.schedule = resp.data;
                    }, function error (err) {

                    });
                }, dataRefreshInterval);
            }
        }, function (err) {
            console.error('ERR', err);
            // err.status will contain the status code
        });

        $scope.$on('$destroy', function () {
            $scope.stopDataFetch();
        });
    })

    .controller('CurrentCtrl', function ($scope, $http, $interval, $ionicLoading) {
        var dataEndpoint = 'http://hydro.homelinux.net/latestdata'; // TODO: Move to config
        var dataRefreshInterval = 2000; // TODO: Move to config
        var intervalId;

        $scope.stopDataFetch = function () {
            if (angular.isDefined(intervalId)) {
                $interval.cancel(intervalId);
                intervalId = undefined;
            }
        };

        $scope.showLoading = function () {
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });
        };
        $scope.hideLoading = function () {
            $ionicLoading.hide();
        };

        $scope.showLoading();
        // Initial data fetch
        $http.get(dataEndpoint).then(function (resp) {
            $scope.hideLoading();
            $scope.sensorData = resp.data;

            // Begin fetching data regularly
            if (!angular.isDefined(intervalId)) {
                intervalId = $interval(function dataFetcher() {
                    $http.get(dataEndpoint).then(function (resp) {
                        $scope.sensorData = resp.data;
                    }, function error (err) {

                    });
                }, dataRefreshInterval);
            }
        }, function (err) {
            console.error('ERR', err);
            // err.status will contain the status code
        });

        $scope.$on('$destroy', function () {
            $scope.stopDataFetch();
        });
    });
