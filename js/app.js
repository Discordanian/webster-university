/***********************************************************************
 * Filename: app.js
 * Author  : Kurt Schwind
 * Email   : KurtSchwind99@webster.edu
 *
 * "document.ready" fires as soon as all the css/js/html has been loaded
 * and parsed by the client.  It is equivalent to 'main'
 ***********************************************************************/
$(document).ready(function() {
    console.log("Starting Application");

    // Table is the controller class
    var table = new Table();

    table.title(); // Give the page a title

    table.initMenu(); // Draw the Menu

    // set Deck


    // set players
    table.numPlayers(0);
    // set score

    console.log("End of onReady");
});
