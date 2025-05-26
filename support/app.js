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
var Derived = Derived || (function() {

    // Constructor 
    function Derived() {
    }

    Derived.prototype = new Base();

    Derived.prototype.constructor = Derived;

    return Derived;
})();
$(document).ready(function() {
    console.log("Starting Test");

    // Table is the controller class
    var b  = new Base();
    var d1 = new Derived();
    var d2 = new Derived();

    console.log(d1.foo() === d2.foo());


});
