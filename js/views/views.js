//Main View///////////////////////////////////////////////////////////////////////////
var BaseCardView = Backbone.View.extend({
    tagName: "div",
    template: Handlebars.compile($("#base-card-attr").html()),
    initialize: function() {
        this.listenTo(this.collection, 'reset change', this.render);
        var self = this;
        this.collection.fetch({
            reset: true
        });
    },
    render: function() {
        var self = this;

        self.collection.each(function(mod) {
            var ImgView = new ImageBannerView({
                model: mod
            });
            var NameView = new NameTitleView({
                model: mod
            });
            var BtnView = new RadioBtnView({
                model: mod
            });
            $(this.el).prepend(ImgView.render().el);
            $(this.el).prepend(NameView.render().el);
            $(this.el).prepend(BtnView.render().el);

            // this.$el.append(this.template({ img: repoView.toJSON() }));
        }, this);

        return this;
    }
})


//View 1- Sailings Img + minP Banner////////////////////////////////////////////////////////////////////////////
var ImageBannerView = Backbone.View.extend({
    tagName: "li",
    className: "repo",

    render: function() {

        $(this.el).html(
            '<b>' + this.model.get("sailing_main_image") + "</b> - " + this.model.get("sailing_options")
            //minP
        );

        return this;
    }
});


//View 2- Cruise_line_name + ship_name + sailing_title////////////////////////////////////////////////////////////////////////////
var NameTitleView = Backbone.View.extend({
    tagName: "li",
    className: "repo",

    render: function() {

        $(this.el).html(
            '<b>' + this.model.get("cruise_line_name") + "</b> - " + this.model.get("cruise_ship_name") + this.model.get("sailing_name")

        );

        return this;
    }
});


//View 3- radio buttons + sailing date + price////////////////////////////////////////////////////////////////////////////
var RadioBtnView = Backbone.View.extend({
    tagName: "li",
    className: "repo",

    render: function() {

        $(this.el).html(
            '<b>' + this.model.get("sailing_options")
        );

        return this;
    }
});

//View 4 - Footer + total sum////////////////////////////////////////////////////////////////////////////
var FooterView = Backbone.View.extend({
    tagName: "li",
    className: "repo",

    render: function() {

        $(this.el).html(
            // '<b>' + this.model.get("sailing_name") + "</b> - " + this.model.get("cruise_line_name")

        );

        return this;
    }
});

//Render View////////////////////////////////////////////////////////////////////////////
var BaseCardViews = new BaseCardView({
    el: "#container",
    collection: c2
});