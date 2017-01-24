angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.home', {
    url: '/page1',
    views: {
      'side-menu21': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('menu.itinerary', {
    url: '/page7',
    views: {
      'side-menu21': {
        templateUrl: 'templates/itinerary.html',
        controller: 'itineraryCtrl'
      }
    }
  })

  .state('menu.myProfile', {
    url: '/page2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/myProfile.html',
        controller: 'myProfileCtrl'
      }
    }
  })

  .state('logout', {
    url: '/page3',
    templateUrl: 'templates/logout.html',
    controller: 'logoutCtrl'
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('menu.createNewTrip', {
    url: '/newTrip',
    views: {
      'side-menu21': {
        templateUrl: 'templates/createNewTrip.html',
        controller: 'createNewTripCtrl'
      }
    }
  })

  .state('login', {
    url: '/page5',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/page6',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('menu.explore', {
    url: '/page8',
    views: {
      'side-menu21': {
        templateUrl: 'templates/explore.html',
        controller: 'exploreCtrl'
      }
    }
  })

  .state('menu.dayOne', {
    url: '/page9',
    views: {
      'side-menu21': {
        templateUrl: 'templates/dayOne.html',
        controller: 'dayOneCtrl'
      }
    }
  })

  .state('menu.holidayShoppingIdeas', {
    url: '/page10',
    views: {
      'side-menu21': {
        templateUrl: 'templates/holidayShoppingIdeas.html',
        controller: 'holidayShoppingIdeasCtrl'
      }
    }
  })

  .state('menu.reclist', {
    url: '/page16',
    views: {
      'side-menu21': {
        templateUrl: 'templates/reclist.html',
        controller: 'reclistCtrl'
      }
    }
  })

  .state('menu.electronics', {
    url: '/page11',
    views: {
      'side-menu21': {
        templateUrl: 'templates/electronics.html',
        controller: 'electronicsCtrl'
      }
    }
  })

  .state('menu.recommendations', {
    url: '/page15',
    views: {
      'side-menu21': {
        templateUrl: 'templates/recommendations.html',
        controller: 'recommendationsCtrl'
      }
    }
  })

  .state('menu.listOfFood', {
    url: '/page17',
    views: {
      'side-menu21': {
        templateUrl: 'templates/listOfFood.html',
        controller: 'listOfFoodCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/page5')

  

});