var BaseCard = Backbone.Model.extend({

    url: "https://api.myjson.com/bins/2gr36",

    parse: function(response) {
        console.log(response.sailings)

        //remodel json object to have each structured by id, 
        //easier way to use model to render
        this.set(response)
            // for (i in response.sailings) {
            //           var minN = Infinity;
            //           var attr = response.sailings[i]
            //           var price = attr["sailing_options"]

        //           for (key in price) {
        //               var p = price[key]["sailing_price"]
        //               if (p < minN) minN = p;
        //           }

        //           var minP = {
        //               img: attr["sailing_main_image"],
        //               id: attr["sailing_id"],
        //               min: minN
        //           }

        //           sailingsBaseCard.set(minP);

        //       }
        return this;

    },

    validate: function(attrs, options) {
        if (attrs.end < attrs.start) {
            return "Can't end before it starts"
        }
    }
})


var card1 = new BaseCard();
card1.fetch({
    success: function(resp) {
        console.log('Success')
    },
    error: function(errorResp) {
        console.log(errorResp);
    }
})


var Cruise = Backbone.Model.extend({
    validate: function(attrs, options) {
        if (attrs.end < attrs.start) {
            return "Can't end before it starts"
        }
    }
});
var Sailings = Backbone.Model.extend({

    validate: function(attrs, options) {
        if (attrs.end < attrs.start) {
            return "Can't end before it starts"
        }
    }
});

var cruiseObj = new Cruise();
var sailingsBaseCard = new Sailings();

//have one call to the server, since collection of items that refer to 1 card, send into models to be used in
//views, views listen to collection change and re-render if changes

var CardCollection = Backbone.Collection.extend({

    url: 'https://api.myjson.com/bins/2gr36',

    initialize: function() {

        this.bind("reset", function(model, options) {
            this.parse();
        });
    },
    //Parse the response
    parse: function(response) {
        // console.log(response.sailings)

        for (i in response.sailings) {
            var minN = Infinity;
            var attr = response.sailings[i]
            var price = attr["sailing_options"]

            for (key in price) {
                var p = price[key]["sailing_price"]
                if (p < minN) minN = p;
            }

            var minP = {
                img: attr["sailing_main_image"],
                id: attr["sailing_id"],
                min: minN
            }

            sailingsBaseCard.set(minP);

        }
        // for (i in this.model.attributes) {
        //     var minN = Infinity;
        //     var attr = this.model.attributes[i]
        //     var price = attr["sailing_options"]

        //     for (key in price) {
        //         var p = price[key]["sailing_price"]
        //         if (p < minN) minN = p;
        //     }

        //     var minP = {
        //         img: attr["sailing_main_image"],
        //         id: attr["sailing_id"],
        //         min: minN
        //     }

        //     console.log(minP)
        //     var bannerPrice = JSON.stringify(minP)

        //     // console.log(bannerPrice)
        //     this.$el.append(this.template({ img: bannerPrice }));
        //     // console.log('a', attr)
        // }
        // cruiseObj.set(response.cruise_lines);
        // sailingsBaseCard.set(response.sailings);

        return this;

    },

});

var CardCollectionInstance = new CardCollection();


var BaseCardView = Backbone.View.extend({
    tagName: "div",
    template: Handlebars.compile($("#base-card-attr").html()),
    initialize() {
        this.listenTo(this.model, "change", this.render)
    },
    render: function() {



    }
})


var BaseCardViews = new BaseCardView({
    el: "#container",
    model: sailingsBaseCard,
});


BaseCardViews.render()

// CARD BODY VIEW

var CardBodyViews = Backbone.View.extend({
    tagName: "div",
    initialize: function() {
        this.listenTo(CardCollectionInstance, "change", this.render);
    },

    render: function() {

        for (i in this.model.attributes) {
            var attr = this.model.attributes[i]
            console.log(attr.cruise_line_id)
        }


        this.$el.html(this.model.get('attributes'));
        return this;
    }
});

var CardBodyView = new CardBodyViews({
    el: "#container",
    model: cruiseObj
});


CardBodyView.render()

//FOOTER VIEW
var BaseCardViews = Backbone.View.extend({
    tagName: "div",
    initialize: function() {
        this.listenTo(CardCollectionInstance, "change", this.render);
    },

    render: function() {

        for (i in this.model.attributes) {
            var attr = this.model.attributes[i]
            console.log(attr.cruise_line_id)
        }


        this.$el.html(this.model.get('attributes'));
        return this;
    }
});

var BaseCardView = new BaseCardViews({
    el: "#container",
    model: cruiseObj
});


BaseCardView.render()


var RepoView = Backbone.View.extend({
    tagName: "li",
    className: "repo",

    render: function() {
        // console.log(this.model)
        // just render the repo name and description as the content of this element.
        $(this.el).html(
            '<b>' + this.model.get("cruise_line_id") + "</b> - "
        );

        return this;
    }
});

CardCollectionInstance.fetch({
    success: function(response, xhr) {
        // console.log("Inside success");
        console.log(response);

    },
    error: function(errorResponse) {
        // console.log(errorResponse)
    }
});

var CruiseView = Backbone.View.extend({
    tagName: "div",
    className: "test",
    initialize: function(options) {
        this.collection.bind("add", function(model) {

            var repoView = new RepoView({
                model: model
            });

            this.$el.prepend(repoView.render().el);

        }, this);
    },
    render: function() {
        return this;
    }

})

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
// var assemblyReposView = new CruiseView({
// 	collection: carCollectionInstance,
// 	model: cruiseObj
// });

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