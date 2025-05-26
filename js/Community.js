/***********************************************************************
 * Filenamy: Community.js
 * Author  : Kurt Schwind
 * Email   : KurtSchwind99@webster.edu
 ***********************************************************************/
var Community = Community || (function() {

    // Constructor 
    function Community() {
        this.id_ = 0;
        this.name_ = "Community";
        this.discard_ = new Hand();
        this.discard_.hide();
    }

    // Community is a kind of 'player'
    Community.prototype = new PlayerEntity(0);

    Community.prototype.reDraw = function() {
        var self = this;
        var handDiv = "#communityHand";
        console.log("Community reDraw() called");
        $(handDiv).html(self.hand().spread());
    };


    Community.prototype.discard = function() {
        return this.discard_;
    };

    Community.prototype.id = function(i) {
        return this.id_;
    };

    Community.prototype.divName = function() {
        return "#community";
    };

    Community.prototype.constructor = Community;

    return Community;
})();
