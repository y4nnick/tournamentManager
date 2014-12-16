angular.module('formApp').controller('formController' , formController);

function formController($scope,Loader,$state,$http) {
    $scope.loader = Loader;
    $scope.formData = {};
    $scope.wetter = ["Sonnig", "Mild", "Schneefall", "Zufall", "Zapfig", "Eiskalt"];
    $scope.spielerRegEx = /^[a-zA-Z-äöüÄÖÜéàèÉÈ]{3,}\s[a-zA-Z-äöüÄÖÜéàèÉÈ ]{3,}/;
    $scope.emailRegEx = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}/;
    $scope.handynummerminlength = 9;
    $scope.disableSubmitButton = false;

    $scope.voll = false;

    //Checken ob noch Platz
    $http.get("http://www.beachcrew.at/LogIT_test/rest/BewerbService/isBewerbVoll?bewerbID=17")
        .success(function(data, status, headers, config) {

            $scope.voll = data.result;

            if($scope.voll){
                swal({
                        title: "Leider sind keine Startplätze mehr frei!",
                        text: "Um jedem Team ein schönes Spielerlebnis bieten zu können, haben wir leider nur Platz für 24 Teams.",
                        type: "info",
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        closeOnConfirm: false }
                );
            }

        }).
        error(function(data, status, headers, config) {
            swal({
                    title: "Ups!",
                    text: "Das tut uns leid, aber anscheinend ist etwas schiefgelaufen. Bitte versuche es nach ein paar Minuten nochmal oder melde dich bei uns unter yannick@beachcrew.at",
                    type: "error",
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    closeOnConfirm: false }
            );
        });

    $scope.isEmailInValid = function(form){
        if($scope.emailRegEx.test($scope.formData.email))return false;

        return ((form.email.$invalid || form.email.$pristine) && (form.email.$touched  || form.$submitted));
    }

    $scope.isHandyInValid = function(form){
        if(typeof $scope.formData.handy !== 'undefined' && $scope.formData.handy.length >= $scope.handynummerminlength)return false;

        return ((form.handy.$invalid || form.handy.$pristine) && (form.handy.$touched  || form.$submitted));
    }


    $scope.processSubmitForm = function(isValid,isPrestine){

        //Check if Email and Handynummer is valid
        if(!$scope.emailRegEx.test($scope.formData.email) || typeof $scope.formData.handy === 'undefined' || $scope.formData.handy.length < $scope.handynummerminlength){
            return;
        }

        //Check if Nation ist ausgewählt
        if(typeof $scope.formData.nation === 'undefined' || $scope.formData.nation == ""){

            swal({
                title: "Keine Nation ausgewählt!",
                text: "Wähle eine Nation welche ihr vertretten wollt.",
                type: "error",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Ok!",
                closeOnConfirm: true }
                ,
                function(){
                    $state.go("form.nation");
                });

            return;
        }

        //Check if Spieler sind valid
        if(!$scope.spielerRegEx.test($scope.formData.spieler1) || !$scope.spielerRegEx.test($scope.formData.spieler2) || !$scope.spielerRegEx.test($scope.formData.spieler3)){

            swal({
                    title: "Nicht alle Spieler angegeben!",
                    text: "Bitte gib alle deine Mitspieler an.",
                    type: "error",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Ok!",
                    closeOnConfirm: true }
                ,
                function(){
                    $state.go("form.spieler");
                });
            return;
        }

        $scope.sendAnmeldung();
    };

    $scope.creatAnmeldungen = function(sendData){
        $scope.disableSubmitButton = true;
        Loader.createAnmeldung(sendData)
            .success(function(data, status, headers, config) {
                $scope.angemeldet = true;

                swal({
                        title: "Geschafft!",
                        text: "Wir freuen uns das ihr dabei seit. Du erhältst in Kürze eine Bestätigungs-Mail mit allen wichtigen Infos.",
                        type: "success",
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        closeOnConfirm: false }
                    );
            })
            .error(function(data, status, headers, config) {

                if(data.message == "Es sind leider keine Plätze mehr frei."){
                    swal({
                            title: "Leider sind keine Startplätze mehr frei",
                            text: "Um jedem Team ein schönes Spielerlebniss zu bieten können wir leider nur 24 Teams annehmen",
                            type: "info",
                            showConfirmButton: false,
                            allowOutsideClick: false,
                            closeOnConfirm: false }
                    );
                }else{
                    console.log(data);
                    console.log(status);

                    swal({
                            title: "Ups!",
                            text: "Das tut uns leid, aber anscheinend ist etwas schiefgelaufen. Bitte versuche es nach ein paar Minuten nochmal oder melde dich bei uns unter yannick@beachcrew.at",
                            type: "error",
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Ok",
                            closeOnConfirm: true }
                    );
                }


            });
    };

    $scope.sendAnmeldung = function (){

        //reformat
        sendData = {
            "282_x_2_Land": $scope.formData["nation"],
            "281_x_8_E-Mail-Adresse": $scope.formData["email"],
            "283_x_2_Handynummer": $scope.formData["handy"],
            "284_x_2_Herkunft": $scope.formData["herkunft"],
            "285_x_2_Alter-Gesamt": $scope.formData["alter"],
            "288_x_2_Schon-mal-teilgenommen?-Wenn-ja,-welche-Platzierung?": $scope.formData["teilnahme"],
            "286_x_7_Wetterwunsch": $scope.formData["wetterwunsch"],
            "287_x_3_Warum-gewinnt-Euer-Team": $scope.formData["warum"],
            "mobile": false,
            "dauer": 0,
            "bewerb_id": "17"
        };

        //Spieler in Vor und Nachname splitten
        var anzSpieler = 3;
        for (var i = 0; i < anzSpieler; i++) {

            var name = $scope.formData["spieler" + (i + 1)];

            var parts = name.split(" ");

            var nachname = parts[parts.length - 1];
            var vorname = "";
            for (var x = 0; x < parts.length - 1; x++)vorname += parts[x] + " ";

            sendData["280_" + i + "_10_Name_vorname"] = vorname.trim();
            sendData["280_" + i + "_10_Name_nachname"] = nachname.trim();
        }

        $scope.creatAnmeldungen(sendData);

        //send to http://www.beachcrew.at/LogIT_test/anmelden.php?id=65
    };

    //Wechsel zu Form.Spieler
    $scope.$watch('formData.nation', function(newVal, oldVal){
        if(typeof newVal !== 'undefined'){
            $state.go("form.spieler")
        }
    });

    //Wechsel zu Form.Submit
    $scope.goToSubmit = function(){
        $state.go("form.submit");
    }

    //Wechsel zu Form.Team
    $scope.processSpielerForm = function(isValid,isPrestine){
        if(isValid && !isPrestine){
            $state.go("form.team");
        }
    };
};