// Card Specification
describe("Table Specification", function() {
    var t;

    // Create a Two of Hearts Card
    beforeEach(function() {
        t = new Table();
    });

    afterEach(function() {});

    it("Get Number of Players", function() {
        expect(t.numPlayers()).toBe(0);
    });

});
