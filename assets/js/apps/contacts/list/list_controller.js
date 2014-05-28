ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _){
  List.Controller = {
    listContacts: function(){
      var _thisController = this;
      var contacts = ContactManager.request("contact:entities");

      var contactsListView = new List.Contacts({
        collection: contacts
      });

      contactsListView.on("itemview:contact:delete", function(childView, model){
      	this.collection.remove(model);	
      });

      contactsListView.on("itemview:contact:show", function(childView, model){
      	ContactManager.trigger("contact:show", model.get("id"));
      });

      ContactManager.mainRegion.show(contactsListView);
    },
    showContact: function(id){
    	var contacts = ContactManager.request("contact:entities");
        var model = contacts.get(id);
    	var contactShow = new List.ContactShow({model: model});
    	ContactManager.mainRegion.show(contactShow);
    }
  }
});
