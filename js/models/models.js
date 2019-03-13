var Cruise = Backbone.Model.extend({
    idAttribute: '_id',
    validate: function(attrs, options) {
        if (attrs.end < attrs.start) {
            return "Can't end before it starts"
        }
    }
});