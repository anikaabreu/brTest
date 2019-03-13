// /*global define*/
// define([
//     'jquery',
//     'underscore',
//     'backbone',
//     'collections/todos',
//     'views/todos',
//     'text!templates/stats.html',
//     'common'
// ], function($, _, Backbone, Todos, TodoView, statsTemplate, Common) {
//     'use strict';

//     // Our overall **AppView** is the top-level piece of UI.
//     var AppView = Backbone.View.extend({




//         // // Instead of generating a new element, bind to the existing skeleton of
//         // // the App already present in the HTML.
//         // el: '#todoapp',

//         // // Compile our stats template
//         // template: _.template(statsTemplate),

//         // // Delegated events for creating new items, and clearing completed ones.
//         // events: {
//         // 	'keypress #new-todo':		'createOnEnter',
//         // 	'click #clear-completed':	'clearCompleted',
//         // 	'click #toggle-all':		'toggleAllComplete'
//         // },

//         // // At initialization we bind to the relevant events on the `Todos`
//         // // collection, when items are added or changed. Kick things off by
//         // // loading any preexisting todos that might be saved in *localStorage*.
//         // initialize: function () {
//         // 	this.allCheckbox = this.$('#toggle-all')[0];
//         // 	this.$input = this.$('#new-todo');
//         // 	this.$footer = this.$('#footer');
//         // 	this.$main = this.$('#main');
//         // 	this.$todoList = this.$('#todo-list');

//         // 	this.listenTo(Todos, 'add', this.addOne);
//         // 	this.listenTo(Todos, 'reset', this.addAll);
//         // 	this.listenTo(Todos, 'change:completed', this.filterOne);
//         // 	this.listenTo(Todos, 'filter', this.filterAll);
//         // 	this.listenTo(Todos, 'all', this.render);

//         // 	Todos.fetch({reset:true});
//         // },

//         // // Re-rendering the App just means refreshing the statistics -- the rest
//         // // of the app doesn't change.
//         // render: function () {
//         // 	var completed = Todos.completed().length;
//         // 	var remaining = Todos.remaining().length;

//         // 	if (Todos.length) {
//         // 		this.$main.show();
//         // 		this.$footer.show();

//         // 		this.$footer.html(this.template({
//         // 			completed: completed,
//         // 			remaining: remaining
//         // 		}));

//         // 		this.$('#filters li a')
//         // 			.removeClass('selected')
//         // 			.filter('[href="#/' + (Common.TodoFilter || '') + '"]')
//         // 			.addClass('selected');
//         // 	} else {
//         // 		this.$main.hide();
//         // 		this.$footer.hide();
//         // 	}

//         // 	this.allCheckbox.checked = !remaining;
//         // },


//     });

//     return AppView;
// });