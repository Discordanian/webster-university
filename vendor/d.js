var Deck = Deck || (function() {
    var suits = ['Spades','Hearts','Diamonds','Clubs'],
        ranks = ['A','K','Q','J','10','9','8','7','6','5','4','3','2'],
        jokers = [{ 'suit': 'J', rank: 'J'}]
        // build the deck of cards
        cards = [].concat.apply([], suits.map(function(suit) {
            var rs = [],
                abbrev = suit.split('')[0];
            ranks.map(function(rank) {
                rs.push({ 'suit': abbrev, 'rank': rank });
            });
            return rs;
        })).concat(jokers),
        cards_per_hand = 5;
    
    function Deck(){
        this.shuffle(cards);
    }
 
    Deck.prototype.shuffle = function(times) {
        for(var j, x, i = cards.length; i; j = Math.floor(Math.random() * i), x = cards[--i], cards[i] = cards[j], cards[j] = x);
    };
 
    Deck.prototype.deal = function(cnt){
        var hands = [];
        for (var i=0; i < cnt; i++) {
            hands[i] = [];
            for (var j=0; j < cards_per_hand; j++) {
                hands[i].push(cards.shift());
            }
        }
        return hands;
    };
 
    Deck.prototype.spread = function() {
        cards.forEach(function(card) {
            console.log("[" + card.suit + card.rank + "]");
        });
    };
 
    return new Deck();
})();
