// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ionic.service.core','starter.controllers', 'ngJustGage'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider, $ionicAppProvider) {

        $ionicAppProvider.identify({
            // The App ID (from apps.ionic.io) for the server
            app_id: '08678e8c',
            // The public API key all services will use for this app
            api_key: '5b4c6cc3eab385e9d07d30aa2bf53f6644ca3633c7f13ec', // NOTE!: Paste the real one from the console!
            // The GCM project ID (project number) from your Google Developer Console (un-comment if used)
            // gcm_id: 'YOUR_GCM_ID'
        });

        $stateProvider

            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: 'AppCtrl'
            })

            .state('app.current', {
                url: "/current",
                views: {
                    'menuContent': {
                        templateUrl: "templates/current.html",
                        controller: 'CurrentCtrl'
                    }
                }
            })

            .state('app.webcam', {
                url: "/webcam",
                views: {
                    'menuContent': {
                        templateUrl: "templates/webcam.html"
                    }
                }
            })

            .state('app.schedule', {
                url: "/schedule",
                views: {
                    'menuContent': {
                        templateUrl: "templates/pumpSchedule.html",
                        controller: 'ScheduleCtrl'
                    }
                }
            })

            .state('app.timelapse', {
                url: "/timelapse",
                views: {
                    'menuContent': {
                        templateUrl: "templates/timelapse.html"
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/current');
    });
