angular.module('app.controllers', [])
  
.controller('homeCtrl', ['$scope', '$stateParams', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$ionicPopup) {
     Flybits.initObj({
       HOST: '//changingplacesmit.flybits.com/v2',
       APIKEY: 'DEB7677D-A317-4E2B-93A6-7CE80D1066F4'
     });
     
     
     
     
     
     //retrieve location
Flybits.context.Location.getState().then(function(geoLocation){
  var location = {
    lat: geoLocation.coords.latitude,
    lng: geoLocation.coords.longitude
  };

  //retrieve zones around the browser's location
  return Flybits.api.Zone.getZones({
    location:location
  });
}).then(function(resultObj){
    console.log("ne er came ");
  //do things with the Zones returned
  var zones = resultObj.result;
console.log("zone",zone);
  //retrieve the next page of Zones based on initial request parameters if there exists a next page;
  return resultObj.nextPageFn?resultObj.nextPageFn():false;
}).then(function(resultObj){
  //do things with the next page of zones if there were any;
  if(resultObj){
    var zones = resultObj.result;
    var nextPageFn = resultObj.nextPageFn;
    console.log(zone);
  }
}).catch(function(validation){
    console.log("error");
    console.log(validation);
  //handle errors
});

     Flybits.context.Location.getState().then(function(geoLocation){
      var location = {
        lat: geoLocation.coords.latitude,
        lng: geoLocation.coords.longitude
      };
         var confirmPopup = $ionicPopup.confirm({
     title: location.lat + ", " + location.lng,
     template: 'Are you sure you want to eat this ice cream?'
   });
   
   
   
      console.log(location);
     });


}])
   
.controller('itineraryCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('myProfileCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
        $scope.user = {
            username:"",
            email:""
        }
        var user = firebase.auth().currentUser;
        var uid = user.uid;
        console.log(uid);

        firebase.database().ref('/users/' + uid).once('value').then(function(snapshot) {
            console.log(snapshot.val());
          $scope.user.username = snapshot.val().username;
          $scope.user.email = snapshot.val().email;
        });


}])
   
.controller('logoutCtrl', ['$scope', '$stateParams', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$state) {
        firebase.auth().signOut().then(function() {
            $state.go('choose');
      // Sign-out successful.
    }, function(error) {
      // An error happened.
    });


}])
   
.controller('menuCtrl', ['$scope', '$stateParams', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$state) {
    $scope.logout = function(){
        console.log("came to log out");
        firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log("csignbed out");
      $state.go('login');
        }, function(error) {
          // An error happened.
          console.log(error);
        });
    }


}])
   
.controller('createNewTripCtrl', ['$scope', '$stateParams', '$state', function ($scope, $stateParams,$state) {
             $scope.form = {
            "from":"",
            "to":"",
            "fromDate":"",
            "toDate":"",
            "fromTime":"",
            "toTime":""
            
         };
     $scope.planMyTrip = function(form){

         console.log("came here");
         console.log($scope.form);
         $state.go('menu.itinerary');

     };
}
])
   
.controller('loginCtrl', ['$scope', '$stateParams', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$state) {
        $scope.login = {
        'email': '',
        'password': ''
    };
    
    
    var user = firebase.auth().currentUser;
    console.log(user,"users******");
    if (user) {
        uid = user.uid;
        firebase.database().ref('/users/' + uid).once('value').then(function(snapshot) {
            var firstTime = snapshot.val().firstTime;
            console.log("firstTime:", firstTime);
            console.log(firstTime, "first time");
           if (firstTime){
               console.log("first time??? ues");
                $state.go("choose");
              firebase.database().ref('users/' + user.uid + '/firstTime').set(
                  false);
            }
            else{
                console.log("not first time");
                $state.go("menu.home");
                console.log("came to home");
            }
        });


      // User is signed in.
    } else {
        console.log("came to login");
        $state.go("menu.home");

      // No user is signed in.
    }

    
    $scope.logIn = function(){
        $scope.error = "";
        console.log($scope.login);
        var email = $scope.login.email;
        var password = $scope.login.password;
        firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
  // Handle Errors here.
            $state.go('menu.home');
           }, function(error) {
                    
                    
                          console.log(error.code + "error code");
                          // Handle Errors here.
                          var errorCode = error.code;
                          var errorMessage = error.message;
                            $scope.error = errorMessage;
                
                          console.log(errorMessage,"error message");
                          // ...
                          
                  // An error happened.
                });
            
    }

}])
   
.controller('signupCtrl', ['$scope', '$stateParams', '$ionicAuth', '$ionicUser', '$state', '$firebaseArray', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicAuth, $ionicUser, $state, $firebaseArray) {
    $scope.data = {
        'name': '',
        'email': '',
        'password': ''
    };
    $scope.signUp = function(){
        $scope.error = '';
        console.log("came here");
        console.log($scope.data);
        console.log($scope.data.email);
        console.log($scope.data.password);

          


            firebase.auth().createUserWithEmailAndPassword($scope.data.email, $scope.data.password).then(function() {

                var user = firebase.auth().currentUser;
                $state.go("login");
                var uid = user.uid;
                console.log(uid);
        
                // Name, email address, and profile photo Url
                  firebase.database().ref('users/' + uid).set({
                    username: $scope.data.name,
                    email: $scope.data.email,
                    password : $scope.data.password,
                    firstTime:true
                  });
                      

    
                      // Email sent.
                }, function(error) {
                    
                    
                          console.log(error.code + "error code");
                          // Handle Errors here.
                          var errorCode = error.code;
                          var errorMessage = error.message;
                            $scope.error = errorMessage;
                
                          console.log(errorMessage,"error message");
                          // ...
                          
                  // An error happened.
                });
            
        
    };


}])
   
.controller('exploreCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('dayOneCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('holidayShoppingIdeasCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('reclistCtrl', ['$scope', '$stateParams','$ionicPopup','$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$ionicPopup,$state) {

   var confirmPopup = $ionicPopup.confirm({
     title: 'There is a store around here offering 50% off',
     template: 'Do you want to get the coupon?'
   });

   confirmPopup.then(function(res) {
     if(res) {
       console.log('Yes');
       $state.go("menu.recommendations");
     } else {
       console.log('no');
     }
   });
 

}])
   
.controller('electronicsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('recommendationsCtrl', ['$scope', '$stateParams','$ionicPopup','$state','$timeout', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$ionicPopup,$state,$timeout) {


  // Triggered on a button click, or some other target
  $scope.data = {};

  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    template: '<input type="text" ng-model="data.wifi">',
    title: 'Answer this question to get coupon',
    subTitle: 'why did you come to Andorra?',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Save</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data.wifi) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
           var alertPopup = $ionicPopup.alert({
               title: 'Thanks for the info',
               template: 'We thank you! You code is THANKYOU.'
             });

             alertPopup.then(function(res) {
               console.log('Thank you for not eating my delicious ice cream cone');
             });
           };

           }
        }
      
    ]
  });





}])
   
.controller('listOfFoodCtrl', ['$scope', '$stateParams','$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$state) {

  $scope.open=function(){
    $state.go('menu.recommendations');
  }


}])
 