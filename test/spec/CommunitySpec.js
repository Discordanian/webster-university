// Community Specification
describe("Community Specification", function() {
    var community;

    // Create a Two of Hearts Community
    beforeEach(function() {
        community = new Community(0);
    });

    afterEach(function() {});

    describe("Community Immutability", function() {
        it("Community cannot hide", function() {
            expect(community.hide).toBeUndefined();
        });
        it("Community cannot show", function() {
            expect(community.show).toBeUndefined();
        });
        it("Community has no email", function() {
            expect(community.email).toBeUndefined();
        });

        it("Community has no name", function() {
            expect(community.name).toBeUndefined();
        });
    });

    describe("Community Generalization", function() {
        it("Community is a type of Community", function() {
            expect(community instanceof Community).toBe(true);
        });
        it("Community is a type of PlayerEntity", function() {
            expect(community instanceof PlayerEntity).toBe(true);
        });
    });


});
