// Card Specification
describe("Hand Specification", function() {
    var hand;

    // Create a Two of Hearts Card
    beforeEach(function() {
        hand = new Hand();
    });

    afterEach(function() {});

    it("Default Hand has 0 Cards", function() {
        expect(hand.size()).toBe(0);
    });

    it("If you deal 3 cards into a hand it should have 3 cards", function() {
        var deck = new Deck();
        hand.push(deck.pop());
        hand.push(deck.pop());
        hand.push(deck.pop());
        expect(hand.size()).toBe(3);
    });

    it("If you deal 3 cards into a hand, then init it should have 0 cards", function() {
        var deck = new Deck();
        hand.push(deck.pop());
        hand.push(deck.pop());
        hand.push(deck.pop());
        hand.init();
        expect(hand.size()).toBe(0);
    });

    it("You can shift as well as pop cards out of a hand", function() {
        var deck = new Deck();
        hand.push(deck.pop());
        hand.push(deck.pop());
        hand.push(deck.pop());
        hand.shift();
        hand.shift();
        hand.shift();
        expect(hand.size()).toBe(0);
    });



    it("Hand should default to not Visible", function() {
        expect(hand.isVisible()).toBe(false);
    });

    it("Hand.show should make hand visible ", function() {
        hand.show();
        expect(hand.isVisible()).toBe(true);
    });


});
