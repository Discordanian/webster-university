/***********************************************************************
 * Filenamy: Base.js
 * Author  : Kurt Schwind
 * Email   : KurtSchwind99@webster.edu
 ***********************************************************************/
var Base = Base || (function() {

    // Constructor 
    function Base() {
        this.foo_ = [1,2,3];
    }

    Base.prototype.foo = function() {
        return this.foo_;
    };

    Base.prototype.constructor = Base;

    return Base;
})();
