// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'ionic.cloud'])

.run(function($ionicPlatform, $rootScope,  $cordovaToast, $ionicDeploy, $interval, $ionicPopup) {
  $ionicPlatform.ready(function() {
 
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    
   
    $rootScope.procuraAtualizacao = function () {
        $ionicDeploy.check().then(function (snapshotAvailable) {
          // alert("check");
          console.log('checking for update ', snapshotAvailable);
          if (snapshotAvailable) {
            $interval.cancel(snapshotInterval);
            // console.log('downloading update');
            $ionicDeploy.download().then(function () {
              // console.log('extracting udate');
              $ionicDeploy.extract().then(function () {
                // console.log('loading update');
                // $ionicDeploy.load();

                $ionicPopup.show({
                  title: 'Atualização Disponível',
                  subTitle: 'Uma nova atualização está disponível, deseja atualizar para a última versão?',
                  buttons: [
                    {
                      text: 'Agora não'
                    },
                    {
                      text: 'Reiniciar',
                      onTap: function (e) {
                        $ionicDeploy.load();
                      }
                    }
                  ]
                });

              });
            });
          }
        });
      }
      
    var snapshotInterval = $interval($rootScope.procuraAtualizacao(), 10000);
      //polling for an update every 10 second





// BOTAO VOLTAR
   $ionicPlatform.registerBackButtonAction(function(e) {
     if ($rootScope.backButtonPressedOnceToExit) {
        navigator.app.exitApp(); // or // ionic.Platform.exitApp(); both work
    // } else if ($ionicHistory.backView()) {
    //     $ionicHistory.goBack();
     } else {
        $rootScope.backButtonPressedOnceToExit = true;
          $cordovaToast.show('Pressione novamente para sair.', 'long', 'bottom');                
        $timeout(function() {
            $rootScope.backButtonPressedOnceToExit = false;
        }, 2000); // reset if user doesn't press back within 2 seconds, to fire exit
    }
    e.preventDefault();
    return false;
  }, 101);

  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicCloudProvider) {
  
  
    $ionicCloudProvider.init({
    "core": {
      "app_id": "0b2d7f93"
    }
  });
  
  
  
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});
