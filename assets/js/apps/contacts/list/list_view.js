ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _){
  List.Contact = Marionette.ItemView.extend({
    tagName: "tr",
    template: "#contact-list-item",
    events:  {
    	"click" :"highlightName",
    	"click button.js-delete": "deleteItem",
      "click a.js-edit":"editClicked",
    	"click a.js-show": "showItem"
    },
    flash: function(cssClass){
      var $view = this.$el;
      $view.hide().toggleClass(cssClass).fadeIn(800, function(){
        setTimeout(function(){
        $view.toggleClass(cssClass)
        }, 500);
     });

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
    },
    editClicked:function(e){
      e.preventDefault();
      e.stopPropagation();
      this.trigger("contact:edit", this.model);
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
  	template: "#contact-view",
  	events: {
  		"click a.js-contact-list" : "backToList",
      "click a.js-edit-contact" : "editContact"
  	},
  	backToList: function(e){
  		e.preventDefault();
  		ContactManager.trigger("contacts:list");
  	},
    editContact: function(e){
      e.preventDefault();
      this.trigger("contact:edit", this.model);
    }
  })
  List.NoContact = Marionette.ItemView.extend({
    template: "#no-contact"
  })
});
