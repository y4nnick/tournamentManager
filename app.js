angular.module('formApp', ['ngAnimate', 'ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
        .state('form',          {url: '/form',      templateUrl: 'form.html',   controller: 'formController'})
        .state('form.nation',   {url: '/nation',    templateUrl: 'form-nation.html'})
        .state('form.spieler',  {url: '/spieler',   templateUrl: 'form-spieler.html'})
        .state('form.team',     {url: '/team',      templateUrl: 'form-team.html'})
        .state('form.submit',   {url: '/submit',    templateUrl: 'form-submit.html'});

    $urlRouterProvider.otherwise('/form/nation');
})

//Form controller
.controller('formController', function($scope,$state) {

    $scope.formData = {};
        $scope.wetter = ["Sonnig","Mild","Schneefall","Zufall","Zapfig","Eiskalt"];

    $scope.selectedNation = function(){
        $state.go("form.spieler")
    }

   /*     $scope.loaded = false;
        $scope.$on('$viewContentLoaded', function(){

           if (!$scope.loaded){
                $scope.loaded = true;
                console.log("afsdfsdfsd");
               $('#nationform').append('<div id="country" class="bfh-selectbox bfh-countries" data-country="AT" data-flags="true"></div>');
              $('#country').bfhcountries({flags:true})

              //  $('#nationform').append('');

                 $('#countries1').bfhcountries({country: 'US',flags:true})
                $('#show1').bfhcountries({country: 'US',flags:true})
            }


        });*/

       /*     $scope.$watch('$viewContentLoaded', function(){
                console.log("init Yannick");
                $('#nationform').append('<select id="countries1" class="form-control"></select>');
                console.log("init XXX");
                $('#countries1').bfhcountries({country: 'US'})
            });
*/

    $scope.processForm = function() {

        //Validation

        //reformat
        sendData = {
            "282_x_2_Land": $scope.formData["nation"],
            "281_x_8_E-Mail-Adresse": "y.schwarenthorer@icloud.com",
            "283_x_2_Handynummer": "0664/4087432",
            "284_x_2_Herkunft": $scope.formData["herkunft"],
            "285_x_2_Alter-Gesamt": $scope.formData["alter"],
            "288_x_2_Schon-mal-teilgenommen?-Wenn-ja,-welche-Platzierung?": $scope.formData["teilnahme"],
            "286_x_7_Wetterwunsch":$scope.formData["wetterwunsch"],
            "287_x_3_Warum-gewinnt-Euer-Team": $scope.formData["warum"],
            "mobile": false,
            "dauer": 0,
            "bewerb_id": "17"
        };

        //Spieler in Vor und Nachname splitten
        var anzSpieler = 3;
        for(var i = 0; i < anzSpieler; i++){

            var name = $scope.formData["spieler"+(i+1)];

            var parts = name.split(" ");
            console.log(parts);

            var nachname = parts[parts.length-1];
            var vorname = "";
            for(var x = 0; x < parts.length-1; x++)vorname += parts[x]+" ";

            sendData["280_"+i+"_10_Name_vorname"] = vorname.trim();
            sendData["280_"+i+"_10_Name_nachname"] = nachname.trim();
        }

        console.log(sendData);

        //send to http://www.beachcrew.at/LogIT_test/anmelden.php?id=65
    };
});

