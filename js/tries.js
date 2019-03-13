var Food = Backbone.Model.extend({
    /* Set the idAttribute inside the Model and make
     * sure the ids of the Models that populate the same
     * Collection are different from each other.
     * See [Stackoverflow](http://stackoverflow.com/questions/18007118/
     * backbone-collection-length-always-set-to-one-with-nested-views).
     */
    idAttribute: '_id',
    // defaults: {
    //     brandName: '',
    //     itemName: '',
    //     itemCalories: '',
    //     itemWeight: ''
    // }
});

// Create a Backbone Collection.
var FoodList = Backbone.Collection.extend({
    // Model reference
    model: Food,
    // URL to be used in the fetch operation.
    url: 'https://api.myjson.com/bins/2gr36',

    /* The `parse` function is called by Backbone whenever a 
     * collections's models are returned by the server in `fetch`.
     * The default implementation simply passes through the raw
     * JSON response.
     * If this response is not what you were expecting to populate
     * your models, you will need to override it.
     */
    parse: function(response) {
        // Uncomment if you need to see the raw response.
        // console.log(response);

        // Save this scope inside a variable.
        var self = this;

        /* Iterate through the `hits` array of Objects using the `UnderscoreJS`
         * `each` function, create a Model for each array item, set its 
         * attributes taking the values from any object `fields` property and
         * push it into the collection.
         */
        _.each(response, function(item, index) {
            // console.log(item.fields);
            // console.log(item);
            for (key in item) {
                // console.log(item[key]["cruise_line_id"])
                // console.log(item[key]["sailing_cruise_line_id"]);

                var cruise = new self.model();
                cruise.set('_id', "cruise" + key);
                cruise.set(item[key])
                    // Set the defaul attributes.
                    // member.set('brandName', item.fields.brand_name);
                    // member.set('itemName', item.fields.item_name);
                    // member.set('itemCalories', item.fields.nf_calories);
                    // member.set('itemWeight', item.fields.nf_serving_weight_grams);

                self.push(cruise);
            }
        });
        // Check to see that the collection has been populated by models.
        // console.log('length of this collection: ' + this.length);
        // Log the collection to the console to see if it gets populated correctly.
        // console.log(this);
        return this.models;
    }
});

var eat = new FoodList();

// Create a View Collection.
var FoodListView = Backbone.View.extend({
    // Reference to a `foods` id inside an HTML file where the View might be rendered.
    // Change it to the `id` you defined in your file.
    el: '#foods',

    initialize: function() {
            // Bind the relevant events to the collection.
            this.listenTo(this.collection, 'reset change', this.render);
            // Define a new collection.
            this.collection = new FoodList();
            // Cache the reference to this scope.
            var self = this;
            // Fetch request. Request requirements must match the ones requested
            // by the server. Check the API documentation for more informations
            // (https://developer.nutritionix.com/docs/v1_1).
            this.collection.fetch({

                reset: true,
                // As `fetch` is asynchronous, wait for the operation to be completed.
                success: function() {
                        // Just log the collection and see if the models have
                        // been correctly populated.
                        console.log('1', self.collection);
                    }
                    // Add an `error` handling.
            });
        }
        // Now that your collection has been populated, you can render it
        // as you'd like.
});



// for (key in response) {
//     var r = response[key]

//     for (i = 0; i < r.length; i++) {
//         // console.log(r[i], i)
//         var cruise = new self.model();
//         var settings = _.extend(r[i], r[i]);
//         console.log(settings)
//         switch (i) {
//             case 0:


//                 cruise.set('_id', "cruise" + i);
//                 // cruise.set(obj1)
//                 // console.log(r[i]);
//                 // case '1':
//                 //     cruise.set('_id', "cruise" + i);
//                 //     cruise.set(r[i])
//                 //         // console.log(r[i]);
//                 // case '2':
//                 //     cruise.set('_id', "cruise" + i);
//                 //     cruise.set(r[i])
//                 //         // console.log(r[i]);
//                 //     break;
//         }
//         self.push(cruise);
//     }


// }



// switch (i) {
//     case '0':
//         at0.set(r[i], key);
//     case '1':
//         at1.set(r[i], key);
//     case '2':
//         at2.set(r[i], key);
// }
// this.model(r[i], key)
// this.create(r[i], key)

// for (i in response.sailings) {
//     var minN = Infinity;
//     var attr = response.sailings[i]
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

//     this.add([Sailings, { minP }]);

// }

var cruiseObj = new Cruise();
var sailingsBaseCard = new Sailings();

var BaseCardCollection = Backbone.Collection.extend({
    model: Sailings
})

var base1 = new BaseCardCollection()

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

            base1.set([Sailings, { minP }]);

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









// var BaseCard = Backbone.Model.extend({

//     url: "https://api.myjson.com/bins/2gr36",

//     parse: function(response) {
//         console.log(response.sailings)

//         //remodel json object to have each structured by id, 
//         //easier way to use model to render
//         this.set(response)
//             // for (i in response.sailings) {
//             //           var minN = Infinity;
//             //           var attr = response.sailings[i]
//             //           var price = attr["sailing_options"]

//         //           for (key in price) {
//         //               var p = price[key]["sailing_price"]
//         //               if (p < minN) minN = p;
//         //           }

//         //           var minP = {
//         //               img: attr["sailing_main_image"],
//         //               id: attr["sailing_id"],
//         //               min: minN
//         //           }

//         //           sailingsBaseCard.set(minP);

//         //       }
//         return this;

//     },

//     validate: function(attrs, options) {
//         if (attrs.end < attrs.start) {
//             return "Can't end before it starts"
//         }
//     }
// })


// var card1 = new BaseCard();
// card1.fetch({
//     success: function(resp) {
//         console.log('Success')
//     },
//     error: function(errorResp) {
//         console.log(errorResp);
//     }
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