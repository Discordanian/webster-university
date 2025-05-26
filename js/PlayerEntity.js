/***********************************************************************
 * Filenamy: PlayerEntity.js
 * Author  : Kurt Schwind
 * Email   : KurtSchwind99@webster.edu
 ***********************************************************************/
var PlayerEntity = PlayerEntity || (function() {

    // Constructor 
    function PlayerEntity(id) {
        this.id_ = id;
        this.hand_ = new Hand();
    }


    PlayerEntity.prototype.hand = function() {
        return this.hand_;
    };

    PlayerEntity.prototype.id = function(i) {
        if (!arguments.length) {
            return this.id_;
        }
        this.id_ = i;
        return this;
    };

    PlayerEntity.prototype.constructor = PlayerEntity;

    return PlayerEntity;
})();
