var Derived = Derived || (function() {

    // Constructor 
    function Derived() {
    }

    Derived.prototype = new Base();

    Derived.prototype.constructor = Derived;

    return Derived;
})();
