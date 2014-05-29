ContactManager.module("ContactsApp.Edit", function(Edit, ContactManager, Backbone, Marionette, $, _){
	Edit.Contact = Marionette.ItemView.extend({
		template: "#edit-contact",

		events: {
			"click button.js-submit": "submit"
		},
		submit: function(e){
			e.preventDefault();
			console.log("saving...");
		}
	})
})