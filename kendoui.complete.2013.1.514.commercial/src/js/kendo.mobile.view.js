/*
* Kendo UI Complete v2013.1.514 (http://kendoui.com)
* Copyright 2013 Telerik AD. All rights reserved.
*
* Kendo UI Complete commercial licenses may be obtained at
* https://www.kendoui.com/purchase/license-agreement/kendo-ui-complete-commercial.aspx
* If you do not own a commercial license, this file shall be governed by the trial license terms.
*/
kendo_module({
    id: "mobile.view",
    name: "View",
    category: "mobile",
    description: "Mobile View",
    depends: [ "core", "fx", "mobile.scroller" ],
    hidden: true
});

(function($, undefined) {
    var kendo = window.kendo,
        mobile = kendo.mobile,
        ui = mobile.ui,
        attr = kendo.attr,
        Class = kendo.Class,
        Widget = ui.Widget,
        INIT = "init",
        SHOW = "show",
        BEFORE_SHOW = "beforeShow",
        AFTER_SHOW = "afterShow",
        HIDE = "hide",
        Z_INDEX = "z-index",
        attrValue = kendo.attrValue,
        roleSelector = kendo.roleSelector;

    function initPopOvers(element) {
        var popovers = element.find(roleSelector("popover")),
            idx, length,
            roles = ui.roles;

        for (idx = 0, length = popovers.length; idx < length; idx ++) {
            kendo.initWidget(popovers[idx], {}, roles);
        }
    }

    var View = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            element = that.element;

            that.params = {};
            that.lastParams = {};

            $.extend(that, options);

            that._layout();
            that._scroller();
            that._model();
        },

        events: [
            INIT,
            BEFORE_SHOW,
            SHOW,
            AFTER_SHOW,
            HIDE
        ],

        options: {
            name: "View",
            title: "",
            reload: false,
            defaultTransition: "",
            useNativeScrolling: false,
            stretch: false,
            zoom: false,
            model: null
        },

        destroy: function() {
            if (this.layout) {
                this.layout.detach(this);
            }

            Widget.fn.destroy.call(this);

            if (this.scroller) {
                this.scroller.destroy();
            }

            kendo.destroy(this.element);
        },

        purge: function() {
            this.destroy();
            this.element.remove();
        },

        showStart: function() {
            var that = this;
            that.element.css("display", "");

            if (!that.inited) {
                that.inited = true;
                that.trigger(INIT, {view: that});
            }

            if (that.layout) {
                that.layout.attach(that);
            }

            that.trigger(SHOW, {view: that});
        },

        hideStart: function() {
            var that = this;
            if (that.layout) {
                that.layout.detach(that);
            }
        },

        hideComplete: function() {
            var that = this;
            that.element.hide();
            that.trigger(HIDE, {view: that});
        },

        updateParams: function(params) {
            var that = this;

            if (that.trigger(BEFORE_SHOW, {view: that})) {
                return;
            }

            that.lastParams = that.params;
            that.params = params;

            that.trigger(SHOW, {view: that});
        },

        switchWith: function(view, transition, params, callback) {
            var that = this,
                complete = function() {
                    that.trigger(AFTER_SHOW, {view: that});
                    callback();
                };

            if (that.trigger(BEFORE_SHOW, {view: that})) {
                return;
            }

            that.lastParams = that.params;
            that.params = params;

            if (view) {
                // layout needs to be detached first, then reattached
                view.hideStart();
                that.showStart();

                new ViewTransition({
                    current: view,
                    next: that,
                    transition: transition,
                    defaultTransition: view.options.defaultTransition,
                    complete: complete
                });
            } else {
                that.showStart();
                complete();
            }
        },

        parallaxContents: function(other) {
            var that = this,
                contents = that.content;

            if (!other.header[0]) {
                contents = contents.add(that.header);
            }

            if (!other.footer[0]) {
                contents = contents.add(that.footer);
            }

            return contents;
        },

        contentElement: function() {
            var that = this;

            return that.options.stretch ? that.content : that.scrollerContent;
        },

        _scroller: function() {
            var that = this;

            if (that.options.stretch) {
                that.content.addClass("km-stretched-view");
            } else {
                that.content.kendoMobileScroller({ zoom: that.options.zoom, useNative: that.options.useNativeScrolling });

                that.scroller = that.content.data("kendoMobileScroller");
                that.scrollerContent = that.scroller.scrollElement;
            }

            // prevent accidental address bar display when pulling the header
            if (kendo.support.kineticScrollNeeded) {
                $(that.element).on("touchmove", ".km-header, .km-content", function(e) {
                    if (!e.target.tagName.match(/textarea|input/i)) {
                        e.preventDefault();
                    }
                });
            }
        },

        _model: function() {
            var that = this,
                element = that.element,
                model = that.options.model;

            if (typeof model === "string") {
                model = kendo.getter(model)(window);
            }

            that.model = model;

            initPopOvers(element);

            if (model) {
                kendo.bind(element.children(), model, ui, kendo.ui, kendo.dataviz.ui);
            } else {
                mobile.init(element.children());
            }
        },

        _layout: function() {
            var that = this,
                contentSelector = roleSelector("content"),
                element = that.element;

            element.data("kendoView", that).addClass("km-view");
            that.transition = attrValue(element, "transition");

            that.header = element.children(roleSelector("header")).addClass("km-header");
            that.footer = element.children(roleSelector("footer")).addClass("km-footer");

            if (!element.children(contentSelector)[0]) {
              element.wrapInner("<div " + attr("role") + '="content"></div>');
            }

            that.content = element.children(roleSelector("content"))
                                .addClass("km-content");

            that.element.prepend(that.header).append(that.footer);

            that.id = attrValue(element, "url") || "#" + element.attr("id");

            if (that.layout) {
                that.layout.setup(that);
            }
        }
    });

    function fade(source, destination) {
        if (source[0] && destination[0] && source[0] != destination[0]) {
            source.kendoAnimateTo(destination, {effects: "fade"});
        }
    }

    function initWidgets(collection) {
        collection.each(function() {
            kendo.initWidget($(this), {}, ui.roles);
        });
    }

    var ViewTransition = Class.extend({
        init: function (options) {
            $.extend(this, options);

            var that = this,
                current = that.current,
                next = that.next,
                currentContent = current.element,
                nextContent = next.element,
                upper = next,
                lower = current,
                transition = that._transition();

            if (transition.reverse && !transition.parallax) {
                upper = current;
                lower = next;
            }

            upper.element.css(Z_INDEX, 1);
            lower.element.css(Z_INDEX, 0);

            if (transition.parallax) {
                fade(current.footer, next.footer);
                fade(current.header, next.header);
                currentContent = current.parallaxContents(next);
                nextContent = next.parallaxContents(current);
            }

            currentContent.kendoAnimateTo(nextContent, transition);

            if (!that.back()) {
                current.nextViewID = next.id;
                current.backTransition = transition.transition;
            }
        },

        _transition: function() {
            var that = this,
                current = that.current,
                next = that.next,
                back = that.back(),
                complete = function() {
                    current.hideComplete();
                    that.complete();
                },

                viewTransition = back ? next.backTransition : next.transition,
                transition = that.transition || viewTransition || that.defaultTransition,
                animationData = transition.split(' '),
                animationType = animationData[0],
                parallax = /^slide/.test(animationType),
                reverse = animationData[1] === "reverse";

            if (that.back() && !that.transition) {
                reverse = !reverse;
            }

            return {
                effects: animationType,
                reverse: reverse,
                parallax: parallax,
                complete: complete,
                transition: transition
                // ,duration: 1000
            };
        },

        back: function() {
            var next = this.next,
                current = this.current;

            return next.nextViewID && next.nextViewID === current.id && JSON.stringify(next.params) === JSON.stringify(next.lastParams);
        }
    });

    var Layout = Widget.extend({
        init: function(element, options) {
            var that = this;
            Widget.fn.init.call(that, element, options);

            element = that.element;

            that.element = element.detach();
            that.header = element.children(roleSelector("header")).addClass("km-header");
            that.footer = element.children(roleSelector("footer")).addClass("km-footer");
            that.elements = that.header.add(that.footer);

            initPopOvers(element);

            kendo.mobile.init(that.element.children());
            that.trigger(INIT, {layout: that});
        },

        options: {
            name: "Layout"
        },

        events: [
            INIT,
            SHOW,
            HIDE
        ],

        setup: function (view) {
            if (!view.header[0]) { view.header = this.header; }
            if (!view.footer[0]) { view.footer = this.footer; }
        },

        detach: function (view) {
            var that = this;
            if (view.header === that.header && that.header[0]) {
                view.element.prepend(that.header.detach()[0].cloneNode(true));
            }

            if (view.footer === that.footer && that.footer.length) {
                view.element.append(that.footer.detach()[0].cloneNode(true));
            }

            that.trigger(HIDE, {layout: that, view: view});
        },

        attach: function(view) {
            var that = this;
            if (view.header === that.header) {
                that.header.detach();
                view.element.children(roleSelector("header")).remove();
                view.element.prepend(that.header);
            }

            if (view.footer === that.footer) {
                that.footer.detach();
                view.element.children(roleSelector("footer")).remove();
                view.element.append(that.footer);
            }

            that.trigger(SHOW, {layout: that, view: view});
        }
    });

    var Observable = kendo.Observable,
        BODY_REGEX = /<body[^>]*>(([\u000a\u000d\u2028\u2029]|.)*)<\/body>/i,
        LOAD_START = "loadStart",
        LOAD_COMPLETE = "loadComplete",
        SHOW_START = "showStart",
        VIEW_SHOW = "viewShow";

    function urlParams(url) {
        var queryString = url.split('?')[1] || "",
            params = {},
            paramParts = queryString.split(/&|=/),
            length = paramParts.length,
            idx = 0;

        for (; idx < length; idx += 2) {
            params[paramParts[idx]] = paramParts[idx + 1];
        }

        return params;
    }

    var ViewEngine = Observable.extend({
        init: function(options) {
            var that = this,
                views,
                container;

            Observable.fn.init.call(that);

            $.extend(that, options);
            that.sandbox = $("<div />");
            container = that.container;

            views = that._hideViews(container);
            that.rootView = views.first();

            if (!that.rootView[0]) {
                throw new Error('Your kendo mobile application element does not contain any direct child elements with data-role="view" attribute set. Make sure that you instantiate the mobile application using the correct container.');
            }

            that._view = null;

            that.layouts = {};

            that._setupLayouts(container);
            initWidgets(container.children(roleSelector("modalview")));

            if (that.loader) {
                that.bind(SHOW_START, function() { that.loader.transition(); });
                that.bind(LOAD_START, function() { that.loader.show(); });
                that.bind(LOAD_COMPLETE, function() { that.loader.hide(); });
                that.bind(VIEW_SHOW, function() { that.loader.transitionDone(); });
            }
        },

        view: function() {
            return this._view;
        },

        showView: function(url, transition) {
            if (url === this.url) {
                return;
            }

            this.trigger(SHOW_START);

            var that = this,
                showClosure = function(view) {
                    that._show(view, transition, urlParams(url));
                },
                element = that._findViewElement(url),
                view = element.data("kendoView");

            that.url = url;

            if (view && view.reload) {
                view.purge();
                element = [];
            }

            this.trigger("viewTypeDetermined", { remote: element.length === 0, url: url });

            if (element[0]) {
                if (!view) {
                    view = that._createView(element);
                }

                showClosure(view);
            } else {
                that._loadView(url, showClosure);
            }
        },

        _findViewElement: function(url) {
            var element,
                urlPath = url.split("?")[0];

            if (!url || url === "/") {
                return this.rootView;
            }

            element = this.container.children("[" + attr("url") + "='" + urlPath + "']");

            // do not try to search for "#/foo/bar" id, jQuery throws error
            if (!element[0] && urlPath.indexOf("/") === -1) {
                element = this.container.children(urlPath.charAt(0) === "#" ? urlPath : "#" + urlPath);
            }

            return element;
        },

        _createView: function(element) {
            var that = this,
                viewOptions,
                layout = attrValue(element, "layout");

            if (typeof layout === "undefined") {
                layout = that.layout;
            }

            if (layout) {
                layout = that.layouts[layout];
            }

            viewOptions = {
                defaultTransition: that.transition,
                loader: that.loader,
                container: that.container,
                layout: layout,
                reload: attrValue(element, "reload")
            };

            return kendo.initWidget(element, viewOptions, ui.roles);
        },

        _loadView: function(url, callback) {
            var that = this;

            if (this.serverNavigation) {
                location.href = url;
                return;
            }

            if (that._xhr) {
                that._xhr.abort();
            }

            that.trigger(LOAD_START);

            that._xhr = $.get(url, function(html) {
                            that.trigger(LOAD_COMPLETE);
                            callback(that._createRemoteView(url, html));
                        }, 'html')
                        .fail(function(request) {
                            that.trigger(LOAD_COMPLETE);
                            if (request.status === 0 && request.responseText) {
                                callback(that._createRemoteView(url, request.responseText));
                            }
                        });
        },

        _createRemoteView: function(url, html) {
            var that = this,
                sandbox = that.sandbox,
                urlPath = url.split("?")[0],
                container = that.container,
                views,
                modalViews,
                view;

            if (BODY_REGEX.test(html)) {
                html = RegExp.$1;
            }

            sandbox[0].innerHTML = html;

            container.append(sandbox.children("script, style"));

            views = that._hideViews(sandbox);
            view = views.first();

            // Generic HTML content found as remote view - no remote view markers
            if (!view.length) {
                views = view = sandbox.wrapInner("<div data-role=view />").children(); // one element
            }

            view.hide().attr(attr("url"), urlPath);

            that._setupLayouts(sandbox);

            modalViews = sandbox.children(roleSelector("modalview"));

            container.append(sandbox.children(roleSelector("layout modalview")).add(views));

            // Initialize the modalviews after they have been appended to the final container
            initWidgets(modalViews);

            return that._createView(view);
        },

        _show: function(view, transition, params) {
            var that = this;

            if (that._view !== view) {
                view.switchWith(that._view, transition, params, function() {
                    that._view = view;
                    that.trigger(VIEW_SHOW, {view: view});
                });
            } else {
                that._view.updateParams(params);
                that.trigger(VIEW_SHOW, {view: view});
            }
        },

        _hideViews: function(container) {
            return container.children(roleSelector("view splitview")).hide();
        },

        _setupLayouts: function(element) {
            var that = this;

            element.children(roleSelector("layout")).each(function() {
                var layout = $(this),
                    platform = attrValue(layout,  "platform");

                if (platform === undefined || platform === mobile.application.os.name) {
                    that.layouts[kendo.attrValue(layout, "id")] = kendo.initWidget(layout, {}, ui.roles);
                }
            });
        }
    });

    kendo.mobile.ViewEngine = ViewEngine;

    ui.plugin(View);
    ui.plugin(Layout);
})(window.kendo.jQuery);
