
// var BaseCard = Backbone.Model.extend({

// 	url: "https://api.myjson.com/bins/2gr36",
	
// 	parse: function (response) {
	
// 		this.sailings = response.sailings;
// 		this.cruises = response.cruise_lines;
// 		return this;

// 	},
// 	sailings: {},
// 	cruises: {},
// 	validate: function (attrs, options) {
// 		if (attrs.end < attrs.start) {
// 			return "Can't end before it starts"
// 		}
// 	}
// })


// var CardView = Backbone.View.extend({
// 	tagName: "div",
// 	initialize: function(){
// 		this.model.fetch();
// 		this.listenTo(this.model, "change", this.render);
// 	},
	
// 	render: function(){
// 		$(this.el).html(
// 			'<b>' + this.model.get("cruises")["cruise_line_id"] + "</b> - " 
		
// 		);
// 		console.log(this.model.get('cruises') )
// 		// this.$el.html(this.model.get('cruises')[0]);
// 		return this;
// 	}

// })

// var card1 = new BaseCard();
// card1.fetch({
// 	success: function(resp){
// 		console.log('Success')
// 	},
// 	error: function(errorResp){
// 		console.log(errorResp);
// 	}
// })
// var myView = new CardView({
// 	el: "#container",
// 	model: card1
// })
//  myView.render();

var Cruise = Backbone.Model.extend({
	validate: function (attrs, options) {
		if (attrs.end < attrs.start) {
			return "Can't end before it starts"
		}
	}
});
var Sailings = Backbone.Model.extend({
	validate: function (attrs, options) {
		if (attrs.end < attrs.start) {
			return "Can't end before it starts"
		}
	}
});

var cruiseObj = new Cruise();
var sailingsObj = new Sailings();

var CardCollection = Backbone.Collection.extend({

	url: 'https://api.myjson.com/bins/2gr36',

	initialize: function () {
		
		this.bind("reset", function (model, options) {
			
		});
	},
	//Parse the response
	parse: function (response) {

		cruiseObj.set(response.cruise_lines);
		sailingsObj.set(response.sailings);

		return this;

	},

});



var SongView = Backbone.View.extend({
	tagName: "div",
	initialize: function(){
		this.listenTo(this.model, "change", this.render);
	},

	render: function () {
		
		for(i in this.model.attributes){
			var attr = this.model.attributes[i]
			console.log(attr.cruise_line_id)
		}

		
		this.$el.html(this.model.get('attributes'));
		return this;
	}});

var songView = new SongView({
	el: "#container",
	model: cruiseObj
});


 songView.render()



var carCollectionInstance = new CardCollection();

var RepoView = Backbone.View.extend({
	tagName: "li",
	className: "repo",

	render: function () {
		// console.log(this.model)
		// just render the repo name and description as the content of this element.
		$(this.el).html(
			'<b>' + this.model.get("cruise_line_id") + "</b> - " 
		);

		return this;
	}
});

carCollectionInstance.fetch({
	success: function (response, xhr) {
		// console.log("Inside success");
	  console.log(response);

	},
	error: function (errorResponse) {
		// console.log(errorResponse)
	}
});
 
var CruiseView = Backbone.View.extend({
	tagName: "div",
	className: "test",
	initialize: function(options){
		this.collection.bind("add", function(model){

			var repoView = new RepoView({
				model: model
			});

			this.$el.prepend(repoView.render().el);

		}, this);
	},
	render: function(){
	return this;
	}

})

var assemblyReposView = new CruiseView({
	collection: carCollectionInstance,
	model: cruiseObj
});

// var Vehicle = Backbone.Model.extend({

// 	idAttribute: "registrationNumber",

// 	urlRoot: "/api/vehicles",

// 	validate: function(attrs){
// 		if (!attrs.registrationNumber)
// 			return "Vehicle is not valid.";
// 	},

// 	start: function(){
// 		console.log("Vehicle started.");
// 	}
// });

// var Car = Vehicle.extend({
// 	start: function(){
// 		console.log("Car with registration number " + this.get("registrationNumber") + " started.");
// 	}
// });

// var car = new Car({
// 	registrationNumber: "XLI887",
// 	color: "Blue"
// });

// car.unset("registrationNumber");

// if (!car.isValid())
// 	console.log(car.validationError);

// car.set("registrationNumber", "XLI887");

// if (!car.isValid())
// 	console.log(car.validationError);

// car.start();
