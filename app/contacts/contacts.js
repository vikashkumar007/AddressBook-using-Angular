'use strict';

angular.module('myApp.contacts', ['ngRoute', 'smart-table', 'lrDragNDrop'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/contacts', {
        templateUrl: 'contacts/contacts.html',
        controller: 'ContactsCtrl'
    });
}])

.controller('ContactsCtrl', [
    '$scope', '$location', 'ContactsDataService',
    function($scope, $location, contactsDataService) {

        $scope.contacts = contactsDataService.getContacts();
        $scope.rowCollection = [];
        $scope.editContact = function(id) {
            $location.path('/edit-contact/' + id);
        };

        $scope.showDetails = function(id) {
            var el = angular.element(document.getElementById('#ct-details-' + id));
            el.toggleClass('details-hidden');
        }

        $scope.columns = ['id','firstName', 'lastName', 'contactEmail', 'contactNumber'];
        var numberOfRecords = $scope.contacts.length;
        for (var i = 0; i < numberOfRecords; i++) {
            $scope.rowCollection.push($scope.contacts[i]);
        }
        $scope.itemsByPage=3;
    }
]);
