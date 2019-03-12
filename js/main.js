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


var Cruise = Backbone.Model.extend({
    idAttribute: '_id',
    validate: function(attrs, options) {
        if (attrs.end < attrs.start) {
            return "Can't end before it starts"
        }
    }
});


var ACardCollection = Backbone.Collection.extend({

    url: 'https://api.myjson.com/bins/2gr36',

    initialize: function() {
        this.bind("reset", function(model, options) {
            this.parse();
        });
    },
    parse: function(response) {
        var y = 0;
        var self = this;

        for (key in response) {
            var r = response[key];
            // console.log(r)
            for (i in r) {
                y++;
                var cruise = new self.model();
                cruise.set('_id', "cruise" + y);
                cruise.set(r[i])
                self.push(cruise);

            }
        }
        // console.log(this);
        return this.models;
    }
});

var BaseCardView = Backbone.View.extend({
    tagName: "div",
    template: Handlebars.compile($("#base-card-attr").html()),
    initialize: function() {
        this.collection = new ACardCollection();
        this.listenTo(this.collection, 'reset change', this.render);
        var self = this;
        this.collection.fetch({
            reset: true,
            success: function() {
                console.log(self.collection.where({ _id: 'cruise0' }))
            }
        });
    },
    render: function() {
        var self = this;
        console.log(self.get(1))
            // this.$el.append(this.template({ img: bannerPrice }));
    }
})

var c2 = new ACardCollection();

var BaseCardViews = new BaseCardView({
    el: "#container",

});