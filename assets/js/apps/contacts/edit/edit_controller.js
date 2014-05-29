ContactManager.module("ContactsApp.Edit", function(Edit, ContactManager, Backbone, Marionette, $, _){
	Edit.Controller = {
		editContact: function(id){
			var loadingView = new ContactManager.Common.Views.Loading();
			ContactManager.mainRegion.show(loadingView);

			var fetchingContact = ContactManager.request("contact:entity",id);
		    $.when(fetchingContact).done(function(contact){
		        if(contact === undefined){
		          var contactEdit = new ContactManager.ContactsApp.List.NoContact();
		        } 
		        else{
		          var contactEdit = new Edit.Contact({model: contact});
		        }

		        ContactManager.mainRegion.show(contactEdit);
		      })
		}
	}
})