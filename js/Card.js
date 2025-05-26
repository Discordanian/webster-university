/***********************************************************************
 * Filenamy: Card.js
 * Author  : Kurt Schwind
 * Email   : KurtSchwind99@webster.edu
 ***********************************************************************/
var Card = Card || (function() {

    // Constructor 
    function Card(suit, rank) {
        this.rank(rank);
        this.suit(suit);
        this.isVisible_ = false;
    }

    Card.prototype.suit = function(s) {
        if (!arguments.length) {
            return this.suit_;
        }
        switch (s) {
            case 'H':
            case 'S':
            case 'D':
            case 'C':
                break;
                // If we get a bad 'suit' then force it to joker
            default:
                s = 'J';
        }
        this.suit_ = s;
        return this;
    };

    Card.prototype.isEqual = function(that_card) {
        return ((that_card.suit() === this.suit()) && (that_card.rank() === this.rank()));
    };

    Card.prototype.rank = function(r) {
        if (!arguments.length) {
            return this.rank_;
        }
        if (r < 1 || r > 14) {
            r = 0;
        }
        this.rank_ = r;
        return this;
    };


    Card.prototype.suitToHTML = function() {
        var retval;
        switch (this.suit) {
            case 'H':
                retval = "&hearts;";
                break;
            case 'S':
                retval = "&spades;";
                break;
            case 'D':
                retval = "&diams;";
                break;
            case 'C':
                retval = "&clubs;";
                break;
            case 'J':
                retval = "J";
                break;
            default:
                console.log("ERROR: Invalid suit [" + this.suit_ + "] forcing to Joker");
                this.rank(0);
                this.suit('J');
                retval = this.suitToHTML();
                break;
        }
        return retval;
    };

    Card.prototype.divName = function() {
        return "" + this.rank() + this.suit();
    };


    Card.prototype.toString = function() {
        if (this.isVisible_) {
            return "[" + this.divName() + "]";
        } else {
            return "[XYZ]";
        }
    };

    Card.prototype.getImage = function() {
        if (this.isVisible_) {
            return "img/" + this.divName() + ".png";
        } else {
            if (window.cardBackImage) {
                return window.cardBackImage;
            } else {
                return "img/b1fv.png";
            }
        }
    };

    Card.prototype.show = function() {
        this.isVisible_ = true;
        return this;
    };

    Card.prototype.hide = function() {
        this.isVisible_ = false;
        return this;
    };

    Card.prototype.constructor = Card;

    return Card;
})();
