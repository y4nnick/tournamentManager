angular.module("formApp").directive('nationpicker', function ($http,$parse) {

    return {
        restrict: 'A', // It is an attribute
        require: '?ngModel', // It uses ng-model binding
        scope: {
            ngModel: '='
        },
        link: function (scope, elem, attrs, ctrl) {
            // Add the required classes
            elem.addClass('bfh-countries');
            elem.addClass('bfh-selectbox');

            // First we initialize the selectbox with the desired options
            elem.bfhselectbox({
                filter: true
            }).on('change.bfhselectbox', function() {
                    // Listen for the change event and update the bound model
                    return scope.$apply(function () {
                        return scope.ngModel = elem.val();
                    });
                });

            $http.get("http://www.beachcrew.at/LogIT_test/rest/AnmeldService/getGewaehlteNationen")
                .success(function(data, status, headers, config) {
                    return elem.bfhcountries({
                        flags: true,
                        blank: true,
                        available: data.result, //Logik umgedreht! Die hier angegebene Länder scheinen nicht in der Liste auf
                        country: scope.ngModel
                    });
                }).
                error(function(data, status, headers, config) {
                    console.log("ERROR DATA: " + data.message);
                });
        }
    };
});