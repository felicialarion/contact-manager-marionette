ContactManager.module("ContactsApp.Edit", function(Edit, ContactManager, Backbone, Marionette, $, _){
	Edit.Controller = {
		editContact: function(id){
			var loadingView = new ContactManager.Common.Views.Loading();
			ContactManager.mainRegion.show(loadingView);

			var fetchingContact = ContactManager.request("contact:entity",id);
		    $.when(fetchingContact).done(function(contact){
		    	var contactEdit;
		        if(contact === undefined){
		          contactEdit = new ContactManager.ContactsApp.List.NoContact();
		        } 
		        else{
		          contactEdit = new ContactManager.ContactsApp.Edit.Contact({model: contact, asModal: false});
		        }

		        contactEdit.on("form:submit",function(data){
		        	if(contact.save(data)){
		        		ContactManager.trigger("contact:show", contact.get("id"));
		        	}
		        	else{
		        		contactEdit.triggerMethod("form:data:invalid", contact.validationError);
		        	}
		        });

		        ContactManager.mainRegion.show(contactEdit);
		      })
		}
	}
})