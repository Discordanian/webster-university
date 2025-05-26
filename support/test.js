$(document).ready(function() {
    console.log("Starting Test");

    // Table is the controller class
    var b  = new Base();
    var d1 = new Derived();
    var d2 = new Derived();

    console.log(d1.foo() === d2.foo());


});
