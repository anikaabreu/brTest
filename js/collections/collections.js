var ACardCollection = Backbone.Collection.extend({

    url: 'https://api.myjson.com/bins/2gr36',

    modelId: function() {
        return '_id';
    },
    parse: function(response) {
        var self = this;

        for (i = 0; i < response.cruise_lines.length; i++) {
            var cruise = new self.model();
            var attrs = Object.assign(response.sailings[i], response.cruise_lines[i]);

            cruise.set('_id', "cruise" + i);
            cruise.set(attrs)
            self.push(cruise);
        }

        console.log(this);
        return this.models;
    }
});

var c2 = new ACardCollection();