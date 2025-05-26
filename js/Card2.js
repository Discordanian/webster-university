function Card(suit, rank) {
    var suit_ = suit;
    var rank_ = rank;
    var isVisible_ = false;

    var my = {
        suit: suit_,
        rank: rank_
    };

    my.suit = function(s) {
        if (!arguments.length) return suit_;
        suit_ = s;

        return my;
    };

    my.rank = function(r) {
        if (!arguments.length) return rank_;
        rank_ = r;

        return my;
    };


    my.suitToString = function() {
        if (suit_ == "H") return "&hearts;";
        if (suit_ == "S") return "&spades;";
        if (suit_ == "D") return "&diams;";
        if (suit_ == "C") return "&clubs;";
        if (suit_ == "J") {
            rank_ = " ";
            return "J";
        }
        console.log("Invalid suit [" + suit_ + "] forcing to Joker");
        suit_ = "J";
        return suitToString();
    };


    my.toString = function() {
        if (isVisible_) {
            return "[" + suit_ + rank_ + "]";
        } else {
            return "[XX]";
        }
    };

    my.show = function() {
        isVisible_ = true;
        return my;
    };

    my.hide = function() {
        isVisible_ = false;
        return my;
    };

    return my;
}
