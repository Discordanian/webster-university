// Player Specification
describe("Player Specification", function() {
    var player;

    // Create a Two of Hearts Player
    beforeEach(function() {
        player = new Player(1);
        player.show();
    });

    afterEach(function() {
        player.hide();
    });

    it("Player is visible", function() {
        expect(player.isVisible()).toBe(true);
    });

    it("Player is hidden", function() {
        player.hide();
        expect(player.isVisible()).toBe(false);
    });

    it("Player Name setting", function() {
        expect(player.name()).toBe("Player 1");
        player.name("Peter");
        expect(player.name()).toBe("Peter");
    });


});
