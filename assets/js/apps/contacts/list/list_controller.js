ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _){
  List.Controller = {
    listContacts: function(){
      var loadingView = new ContactManager.Common.Views.Loading();
      ContactManager.mainRegion.show(loadingView);
      var _thisController = this;
      var fetchingContacts = ContactManager.request("contact:entities");
      $.when(fetchingContacts).done(function(contacts){
          var contactsListView = new List.Contacts({collection: contacts});
          ContactManager.mainRegion.show(contactsListView);

          contactsListView.on("itemview:contact:delete", function(childView, model){
            model.destroy();  
          });

        contactsListView.on("itemview:contact:show", function(childView, model){
          ContactManager.trigger("contact:show", model.get("id"));
        });
      })
      
    },
    showContact: function(id){
      var loadingView = new ContactManager.Common.Views.Loading();
      ContactManager.mainRegion.show(loadingView);

    	var fetchingContact = ContactManager.request("contact:entity",id);
      $.when(fetchingContact).done(function(contact){
        var contactShow;
        if(contact === undefined){
          contactShow = new List.NoContact();
        } 
        else{
          contactShow = new List.ContactShow({model: contact});

        }

        ContactManager.mainRegion.show(contactShow);

        contactShow.on("contact:edit", function(model){
          ContactManager.trigger("contact:edit", model.get("id"));
        })
      })
     
    }
  }
});
