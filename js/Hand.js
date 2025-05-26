/***********************************************************************
 * Filenamy: Hand.js
 * Author  : Kurt Schwind
 * Email   : KurtSchwind99@webster.edu
 ***********************************************************************/
var Hand = Hand || (function() {

    function Hand() {
        this.isHidden_ = true;
        this.cards_ = [];
        this.subscribers_ = [];
    }


    Hand.prototype.onChange = function(obj) {
        this.subscribers_.push(obj);
        return this;
    };

    Hand.prototype.notifySubscribers = function(x) {
        var self = this;
        self.subscribers_.forEach(function(callback) {
            callback.apply(null, [x]);
        });
    };

    Hand.prototype.init = function() {
        this.cards_ = [];
        var self = this;
        this.notifySubscribers(self.size());
        return this;
    };


    Hand.prototype.pop = function() {
        var x = this.cards_.pop();
        var self = this;
        this.notifySubscribers(self.size());
        return x;
    };

    Hand.prototype.shift = function() {
        var x = this.cards_.shift();
        var self = this;
        this.notifySubscribers(self.size());
        return x;
    };

    Hand.prototype.peek = function() {
        var self = this;
        if (self.size()) {
            return self.cards_[self.size() - 1];
        }
    };

    Hand.prototype.push = function(c) {
        if (c instanceof Card) {
            this.cards_.push(c);
            var self = this;
            this.notifySubscribers(self.size());
        }
        return this;
    };

    Hand.prototype.hide = function() {
        this.isHidden_ = true;
        this.cards_.forEach(function(card) {
            card.hide();
        });
        return this;
    };

    Hand.prototype.show = function() {
        this.isHidden_ = false;
        this.cards_.forEach(function(card) {
            card.show();
        });
        return this;
    };

    Hand.prototype.isVisible = function() {
        return !this.isHidden_;
    };


    Hand.prototype.size = function() {
        return this.cards_.length;
    };


    Hand.prototype.spread = function() {
        var imageStack = "";
        var self = this;
        if (self.cards_.length === 0) {
            imageStack = "<img src='img/blank.png' />";
        }
        this.cards_.forEach(function(card) {
            imageStack += "<img src='" + card.getImage() + "' />";
        });
        return imageStack;
    };

    Hand.prototype.clear = function() {
        this.cards_ = [];
    };

    Hand.prototype.constructor = Hand;

    return Hand;
})();
