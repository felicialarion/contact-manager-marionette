ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _){
  List.Contact = Marionette.ItemView.extend({
    tagName: "tr",
    template: "#contact-list-item",
    events:  {
    	"click" :"highlightName",
    	"click button.js-delete": "deleteItem",
    	"click a.js-show": "showItem"
    },
    highlightName: function(){
		this.$el.toggleClass('warning');
    },
    deleteItem: function(e){
    	e.stopPropagation();
    	//this.model.collection.remove(this.model);
    	//using trigger and controller
    	this.trigger("contact:delete", this.model);
    },
    remove: function(){
    	var self = this;
    	this.$el.fadeOut(function(){
    		Marionette.ItemView.prototype.remove.call(self);
    	});
    	
    },
    showItem: function(e){
    	e.preventDefault();
    	e.stopPropagation();
    	this.trigger("contact:show", this.model);
    }
  });

  List.Contacts = Marionette.CompositeView.extend({
  	tagName: "table",
  	className: "table table-hover",
  	template: "#contact-list",
  	itemView: List.Contact,
  	itemViewContainer: "tbody",
  	onItemviewContactDelete: function(){
  		//get called when trigger("contact:delete") is invoked
  		// console.log('flash')
  		// this.$el.fadeOut(1000,function(){
  		// 	$(this).fadeIn(1000);
  		// })
  	}
  })

  List.ContactShow = Marionette.ItemView.extend({
  	template: "#contact-view"
  })
});
