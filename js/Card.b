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
        if ((this.rank() == 0) || (this.suit() == 'J')) {
            this.rank(0);
            this.suit('J');
        } // In case one was set by not the other.
        this.isVisible_ = false;
    }
    var proto = Card.prototype;

    proto.suit = function(s) {
        if (!arguments.length) return this.suit_;
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
    };

    proto.rank = function(r) {
        if (!arguments.length) return this.rank_;
        if (r < 1 || r > 13) {
            r = 0;
        }
        this.rank_ = r;
        return this;
    };


    proto.suitToHTML = function() {
        if (this.suit_ == "H") return "&hearts;";
        if (this.suit_ == "S") return "&spades;";
        if (this.suit_ == "D") return "&diams;";
        if (this.suit_ == "C") return "&clubs;";
        if (this.suit_ == "J") {
            this.rank_ = " ";
            return "J";
        }
        console.log("Invalid suit [" + this.suit_ + "] forcing to Joker");
        this.suit_ = "J";
        return suitToString();
    };


    proto.toString = function() {
        if (isVisible_) {
            return "[" + this.suit_ + this.rank_ + "]";
        } else {
            return "[XX]";
        }
    };

    proto.getImage = function() {
        if (isVisible_) {
            return "img/" + this.rank() + this.suit() + ".png";
        } else {
            return "img/b1fv.png";
        }
    };

    proto.show = function() {
        isVisible_ = true;
        return this;
    };

    proto.hide = function() {
        isVisible_ = false;
        return this;
    };

    return Card;
})();