/***********************************************************************
 * Filenamy: Deck.js
 * Author  : Kurt Schwind
 * Email   : KurtSchwind99@webster.edu
 ***********************************************************************/
var Deck = Deck || (function() {
    var suits_ = ['S', 'H', 'D', 'C'];


    function Deck() {
        this.reset_count_ = 0;
        this.subscribers_ = [];
        this.cards_ = [];
        this.removed_cards = [];
        this.init();
    }

    Deck.prototype.onChange = function(obj) {
        this.subscribers_.push(obj);
        return this;
    };

    Deck.prototype.backImage = function() {
        if (this.reset_count_ % 2) {
            window.cardBackImage = "img/b1fv.png";
            return window.cardBackImage;
        } else {
            window.cardBackImage = "img/b2fv.png";
            return window.cardBackImage;
        }
    };

    Deck.prototype.notifySubscribers = function(x) {
        var self = this;
        self.subscribers_.forEach(function(callback) {
            callback.apply(null, [x]);
        });
    };

    Deck.prototype.init = function() {
        var r; // Rank
        var x = [];
        suits_.forEach(function(s) {
            r = 14;
            while (--r) {
                x.push(new Card(s, r));
            }
        });
        x.push(new Card('J', 0));
        x.push(new Card('J', 14));
        this.cards_ = x;
        var self = this;
        this.reset_count_++;
        console.log("Deck has been reset " + self.reset_count_ + " times");
        this.removed_cards.forEach(function(card) {
            self.removeCard(card.suit(), card.rank());
        });
        this.notifySubscribers(this.numRemaining());

    };

    // A Euchre deck has cards 9 through Ace inclusive
    Deck.prototype.setEuchre = function() {
        var self = this;
        self.removeCard('J', 0); // Remove Jokers
        self.removeCard('J', 14); // Remove Jokers
        suits_.forEach(function(s) {
            for (var r = 2; r < 9; r++) {
                self.removeCard(s, r);
            }
        });
        return this;
    };

    Deck.prototype.setStandard = function() {
        this.removeCard('J', 0); // Remove Joker
        this.removeCard('J', 14); // Remove Joker
    };

    Deck.prototype.pop = function() {
        var x = this.cards_.pop();
        this.notifySubscribers(this.numRemaining());
        return x;
    };

    Deck.prototype.removeCard = function(suit, rank) {

        var bCard = new Card(suit, rank);

        // Add card to set taht were removed for this deck
        this.removed_cards.push(bCard);
        var temp_cards = this.cards_;

        // Since I'm altering the size of the array as I go
        // start from the end and work 'backwards'
        for (var i = temp_cards.length; --i;) {
            if (bCard.isEqual(temp_cards[i])) {
                temp_cards.splice(i, 1); // remove this one card
            }
        }
        this.cards_ = temp_cards;
        this.notifySubscribers(this.numRemaining());
        return this;
    };

    Deck.prototype.shuffle = function() {
        var j;
        var tmpCard;
        var n = 3;
        while (n--) {
            // j and i are indexes
            j = 0;
            for (var i = this.cards_.length; i;) {
                j = Math.floor(Math.random() * i);
                tmpCard = this.cards_[--i];
                this.cards_[i] = this.cards_[j];
                this.cards_[j] = tmpCard;
            }
        }
        console.log("Deck Shuffled");
        return this;
    };

    Deck.prototype.numRemaining = function() {
        return this.cards_.length;
    };


    Deck.prototype.spread = function() {
        this.cards_.forEach(function(card) {
            console.log("[" + card.suit_ + card.rank_ + "]");
        });
        return this;
    };

    Deck.prototype.constructor = Deck;

    return Deck;
})();
