'use strict';

angular.module('myApp.services.contactsData', [])
    .factory('ContactsDataService', ['localStorageService',
        function(localStorageService, $location) {

            var updateContactsInStore = function() {
                localStorageService.set('contacts', contacts);
            };

            var getContacts = function() {
                return contacts;
            };

            var resetContact = function() {
                return {
                    firstName: '',
                    lastName: '',
                    contactEmail: '',
                    contactNumber: ''
                };
            };

            var addContact = function(contact) {
                var email = contact.contactEmail;
                var number = contact.contactNumber;
                var duplicateEmail = false;
                var duplicateNumber = false;
                for (var i = 0; i < contacts.length; i++) {
                    if ((contacts[i].contactEmail == email)) {
                        duplicateEmail = true;
                        i = contacts.length;
                    } else if ((contacts[i].contactNumber === number)) {
                        duplicateNumber = true;
                        i = contacts.length;
                    }
                }
                if (duplicateEmail == false && duplicateNumber == false) {
                    contact.id = contacts.length;
                    contacts.push(contact);
                    updateContactsInStore();
                } else if (duplicateNumber == true) {
                    contact.contactNumber = "";
                    $location.path('/contacts');
                } else if (duplicateEmail == true) {
                    contact.contactEmail = "";
                    $location.path('/contacts');
                }
            };
            var editContact = function(contact) {
                for (var i = 0; i < contacts.length; i++) {
                    if (contacts[i].id == contact.id) {
                        contacts[i] = contact;
                        updateContactsInStore();
                    }
                }
            };

            var deleteContact = function(contact) {
                for (var i = 0; i < contacts.length; i++) {
                    if (contacts[i].id == contact.id) {
                        contacts.splice(i, 1);
                        updateContactsInStore();
                    }
                }
            };

            var getContact = function(id) {
                for (var i = 0; i < contacts.length; i++) {
                    if (contacts[i].id == id) {
                        return contacts[i];
                    }
                }
                return null;

            };

            var contacts = localStorageService.get('contacts') || [{
                "id": "0",
                "firstName": "Joe",
                "lastName": "Perry",
                "contactNumber": "444-888-1223",
                "contactEmail": "joe@cordis.us"
            }, {
                "id": "1",
                "firstName": "Kate",
                "lastName": "Will",
                "contactNumber": "244-838-1213",
                "contactEmail": "kate@cordis.us"
            }, {
                "id": "2",
                "firstName": "Harry",
                "lastName": "Robert",
                "contactNumber": "744-138-1292",
                "contactEmail": "harry@cordis.us"
            }, {
                "id": "3",
                "firstName": "Tom",
                "lastName": "Bill",
                "contactNumber": "241-188-1191",
                "contactEmail": "tom@cordis.us"
            }, {
                "id": "4",
                "firstName": "Roger",
                "lastName": "Steel",
                "contactNumber": "111-177-1231",
                "contactEmail": "roger@cordis.us"
            }, {
                "id": "5",
                "firstName": "Kate",
                "lastName": "Will",
                "contactNumber": "242-838-1213",
                "contactEmail": "kate1@cordis.us"
            }, {
                "id": "6",
                "firstName": "Harry",
                "lastName": "Robert",
                "contactNumber": "745-138-1292",
                "contactEmail": "harry1@cordis.us"
            }, {
                "id": "7",
                "firstName": "Tom",
                "lastName": "Bill",
                "contactNumber": "242-188-1191",
                "contactEmail": "tom1@cordis.us"
            },{
                "id": "8",
                "firstName": "Kate",
                "lastName": "Will",
                "contactNumber": "242-738-1213",
                "contactEmail": "kate2@cordis.us"
            }, {
                "id": "9",
                "firstName": "Harry",
                "lastName": "Robert",
                "contactNumber": "745-238-1292",
                "contactEmail": "harry2@cordis.us"
            }, {
                "id": "10",
                "firstName": "Tom",
                "lastName": "Bill",
                "contactNumber": "242-198-1191",
                "contactEmail": "tom5@cordis.us"
            } ];

            return {
                getContacts: getContacts,
                resetContact: resetContact,
                addContact: addContact,
                editContact: editContact,
                getContact: getContact,
                deleteContact: deleteContact
            };

        }
    ]);
