/*
* Kendo UI Complete v2013.1.514 (http://kendoui.com)
* Copyright 2013 Telerik AD. All rights reserved.
*
* Kendo UI Complete commercial licenses may be obtained at
* https://www.kendoui.com/purchase/license-agreement/kendo-ui-complete-commercial.aspx
* If you do not own a commercial license, this file shall be governed by the trial license terms.
*/
kendo_module({
    id: "mobile.scrollview",
    name: "ScrollView",
    category: "mobile",
    description: "The Kendo Mobile ScrollView widget is used to scroll content wider than the device screen.",
    depends: [ "mobile.application" ]
});

(function($, undefined) {
    var kendo = window.kendo,
        mobile = kendo.mobile,
        ui = mobile.ui,
        proxy = $.proxy,
        Transition = kendo.effects.Transition,
        Pane = kendo.ui.Pane,
        PaneDimensions = kendo.ui.PaneDimensions,
        Widget = ui.Widget,

        // Math
        math = Math,
        abs  = math.abs,
        ceil = math.ceil,
        round = math.round,
        max = math.max,
        min = math.min,
        floor = math.floor,
        CHANGE = "change",
        CHANGING = "changing",
        CURRENT_PAGE_CLASS = "km-current-page";

    var ScrollView = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            element = that.element;

            element
                .wrapInner("<div/>")
                .addClass("km-scrollview")
                .append('<ol class="km-pages"/>');

            that.inner = element.children().first();
            that.pager = element.children().last();
            that.page = 0;

            that.inner.css("height", that.options.contentHeight);
            that.container().bind("show", $.proxy(this, "viewShow")).bind("init", $.proxy(this, "viewInit"));

            var movable,
                transition,
                userEvents,
                dimensions,
                dimension,
                pane;

            movable = new kendo.ui.Movable(that.inner);

            transition = new Transition({
                axis: "x",
                movable: movable,
                onEnd: proxy(that._transitionEnd, that)
            });

            userEvents = new kendo.UserEvents(element, {
                start: function(e) {
                    if (abs(e.x.velocity) * 2 >= abs(e.y.velocity)) {
                        userEvents.capture();
                    } else {
                        userEvents.cancel();
                    }

                    transition.cancel();
                },
                allowSelection: true,
                end: proxy(that._dragEnd, that)
            });

            dimensions = new PaneDimensions({
                element: that.inner,
                container: that.element
            });

            dimension = dimensions.x;
            dimension.bind(CHANGE, proxy(that.refresh, that));

            pane = new Pane({
                dimensions: dimensions,
                userEvents: userEvents,
                movable: movable,
                elastic: true
            });

            $.extend(that, {
                movable: movable,
                transition: transition,
                userEvents: userEvents,
                dimensions: dimensions,
                dimension: dimension,
                pane: pane
            });

            that.page = that.options.page;
        },

        options: {
            name: "ScrollView",
            page: 0,
            duration: 300,
            velocityThreshold: 0.8,
            contentHeight: "auto",
            pageSize: 1,
            bounceVelocityThreshold: 1.6
        },

        events: [
            CHANGING,
            CHANGE
        ],

        destroy: function() {
            Widget.fn.destroy.call(this);

            this.userEvents.destroy();

            kendo.destroy(this.element);
        },

        viewInit: function() {
            this.movable.moveAxis("x", -this.page * this.dimension.getSize());
        },

        viewShow: function() {
            this.dimensions.refresh();
        },

        refresh: function() {
            var that = this,
                pageHTML = "",
                dimension = that.dimension,
                width = dimension.getSize(),
                pages,
                pageElements = that.element.find("[data-role=page]");

                pageElements.width(width);
                dimension.update(true);

                // if no pages present, try to retain the current position
                if (!pageElements[0]) {
                    that.page = Math.floor((-that.movable.x) / width);
                }

                that.scrollTo(that.page, true);

                pages = that.pages = ceil(dimension.getTotal() / width);

                that.minSnap = - (pages - 1) * width;
                that.maxSnap = 0;

                for (var idx = 0; idx < pages; idx ++) {
                    pageHTML += "<li/>";
                }

                that.pager.html(pageHTML);
                that._updatePager();
        },

        content: function(html) {
           this.element.children().first().html(html);
           this.dimensions.refresh();
        },

        scrollTo: function(page, instant) {
            this.page = page;
            this._moveTo(- page * this.dimension.getSize(), Transition.easeOutExpo, instant);
        },

        _moveTo: function(location, ease, instant) {
            this.transition.moveTo({ location: location, duration: (instant ? 1 : this.options.duration), ease: ease });
        },

        _dragEnd: function(e) {
            var that = this,
                velocity = e.x.velocity,
                width = that.dimension.size * that.options.pageSize,
                options = that.options,
                velocityThreshold = options.velocityThreshold,
                snap,
                approx = round,
                ease = Transition.easeOutExpo;

            if (velocity > velocityThreshold) {
                approx = ceil;
            } else if(velocity < -velocityThreshold) {
                approx = floor;
            }

            if (abs(velocity) > options.bounceVelocityThreshold) {
                ease = Transition.easeOutBack;
            }

            snap = max(that.minSnap, min(approx(that.movable.x / width) * width, that.maxSnap));

            if (this.trigger(CHANGING, { currentPage: that.page })) {
                snap = - that.page * that.dimension.getSize();
            }

            this._moveTo(snap, ease);
        },

        _transitionEnd:  function() {
            var that = this,
                page = Math.round(- that.movable.x / that.dimension.size);

            if (page != that.page) {
                that.page = page;
                that.trigger(CHANGE, {page: page});
                that._updatePager();
            }
        },

        _updatePager: function() {
            this.pager.children().removeClass(CURRENT_PAGE_CLASS).eq(this.page).addClass(CURRENT_PAGE_CLASS);
        }
    });

    ui.plugin(ScrollView);
})(window.kendo.jQuery);
