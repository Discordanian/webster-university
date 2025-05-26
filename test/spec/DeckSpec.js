// Card Specification
describe("Deck Specification", function() {
    var deck;

    // Create a Two of Hearts Card
    beforeEach(function() {
        deck = new Deck();
    });

    afterEach(function() {});
    describe("Starting Deck Counts", function() {

        it("Default Deck has 54 Cards", function() {
            expect(deck.numRemaining()).toBe(54);
        });

        it("Removing both jokers leaves 52", function() {
            deck.removeCard('J', 0);
            deck.removeCard('J', 14);
            expect(deck.numRemaining()).toBe(52);
        });

        it("Euchre Deck has 24 cards", function() {
            deck.setEuchre();
            expect(deck.numRemaining()).toBe(24);
        });

        it("After creating a deck without jokers an init() should give 52 card deck again.", function() {
            deck.setStandard();
            expect(deck.numRemaining()).toBe(52);
            deck.pop();
            deck.pop();
            deck.pop();
            deck.pop();
            deck.pop();
            deck.pop();
            deck.pop();
            expect(deck.numRemaining()).not.toBe(52);
            deck.init();
            expect(deck.numRemaining()).toBe(52);

        });

    });

    describe("Deck Shuffling operations", function() {
        it("Shuffle Deck should not change number of cards", function() {
            deck.shuffle();
            expect(deck.numRemaining()).toBe(54);
        });


        it("Top card in unshuffled 52 card deck should be Ace of Clubs", function() {
            deck.setStandard();
            var c = deck.pop();
            expect(c.suit()).toBe('C');
            expect(c.rank()).toBe(1);
        });

        it("Top two cards in unshuffled 54 card deck should be a pair of jokers", function() {
            var c1 = deck.pop();
            var c2 = deck.pop();
            expect(c1.suit()).toBe('J');
            expect(c2.suit()).toBe('J');
        });

        it("After a shuffle the deck should be mixed and top 3 cards should NOT be joker joker ace of clubs", function() {
            deck.shuffle();
            var c1 = deck.pop();
            var c2 = deck.pop();
            var c3 = deck.pop();

            expect(
                (c1.suit() === 'J') &&
                (c2.suit() === 'J') &&
                (c3.suit() === 'C') &&
                (c3.rank() === 1)).toBe(false);

        });
    });

});
