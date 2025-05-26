// GameManager Specification
describe("GameManager Specification", function() {
    var gm;

    // Create a Two of Hearts Card
    beforeEach(function() {
        gm = new GameManager();
        gm.addPlayer(new Community());
        gm.addPlayer(new Player(1));
        gm.addPlayer(new Player(2));
    });

    afterEach(function() {});

    /*
        GameManager.prototype.init = function() {
        GameManager.prototype.addPlayer = function(p) {
        GameManager.prototype.reDraw = function() {
        GameManager.prototype.active = function(p) {
        GameManager.prototype.score = function(p, s) {
        GameManager.prototype.clear = function() {
        GameManager.prototype.constructor = GameManager;
    */



    describe("GameManager Active Player", function() {
        it("Default Active Player is undefined", function() {
            expect(gm.active()).toBe(undefined);
        });
        it("Default Active Player is set to P3 and matches that", function() {
            var p3 = new Player(3);
            gm.addPlayer(p3);
            gm.active(p3);
            expect(gm.active()).toBe(p3);
        });
    });

    describe("GameManager Active Player", function() {
        it("Default Score for Player is 0", function() {
            expect(gm.score(1)).toBe(0);
        });
        it("Set score for Player 2 to 23", function() {
            gm.score(2, 23);
            expect(gm.score(2)).toBe(23);
        });
    });

});
