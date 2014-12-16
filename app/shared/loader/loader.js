(function() {
    'use strict';

    angular.module('formApp').factory('Loader',Loader);

    Loader.$inject = ['$http'];

    function Loader($http){
        var server = "http://www.beachcrew.at/LogIT_test/rest/";
        return {
            createAnmeldung: function(anmeldungData){
                var url = server + "AnmeldService/createAnmeldung";

                anmeldungData.bewerb_id = 17;

                var requestData = {anmeldung:anmeldungData,bewerb_id:17,dauer:0,mobile:false};

                var transform = function(data){
                    return $.param(data);
                }

                return $http.post(url, requestData, {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    transformRequest: transform
                });
            },
            isBewerbVoll: function(){
                var url = server + "BewerbService/isBewerbVoll?bewerbID=17";

                return $http.get(url, {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    transformRequest: transform
                });
            }
        }
    }
})();