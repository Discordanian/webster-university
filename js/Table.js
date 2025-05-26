/***********************************************************************
 * Filename: Table.js
 * Author  : Kurt Schwind
 * Email   : KurtSchwind99@webster.edu
 ***********************************************************************/
var Table = (function() {

    // Constructor
    function Table() {
        this.player_count_ = 0;
        this.deck_ = new Deck();
        this.players_ = [];
        this.players_.push(new Community(0));
        var self = this;
        for (var i = 1; i < 5; i++) {
            self.players_.push(new Player(i));
        }
        this.community_ = this.players_[0];
        this.game_manager_ = new GameManager();
        this.game_manager_.addPlayer(self.community_);
    }

    // Title the application
    Table.prototype.title = function() {
        var self = this;
        var header = $(document.createElement("h1"));
        header.attr({
            'font-size': '20px',
            'id': 'header'
        });
        header.text("Gorlok Card Table");
        header.appendTo("#title");
    };

    Table.prototype.playerNavSetup = function() {
        var self = this;
        var iterator = 0;
        var iterator2 = 0;

        var dealClickFunc = function(n) {
            return function(e) {
                var x = self.deck_.pop();
                if (x) {
                    self.players_[n].hand().push(x);
                } else {
                    console.log("No more cards to take");
                }
                self.players_[n].reDraw();
            };
        };

        var sendClickFunc = function(from, to) {
            return function() {
                var c = self.players_[from].hand().shift();
                if (c) {
                    self.players_[to].hand().push(c);
                    self.players_[from].reDraw();
                    self.players_[to].reDraw();
                } else {
                    console.log("No card to transfer");
                }
            };
        };

        var showAndSpread = function(n) {
            return function() {
                self.players_[n].hand().show();
                self.players_[n].reDraw();
            };
        };
        var hideAndSpread = function(n) {
            return function() {
                self.players_[n].hand().hide();
                self.players_[n].reDraw();
            };
        };

        var dealDivBase = '#deal2';
        var showDivBase = '#show';
        var hideDivBase = '#hide';
        var sendDivBase = '#send';
        for (iterator = 1; iterator < 5; iterator++) {
            $(dealDivBase + iterator).click(dealClickFunc(iterator));
            $(dealDivBase + iterator).button();
            $(showDivBase + iterator).click(showAndSpread(iterator));
            $(showDivBase + iterator).button();
            $(hideDivBase + iterator).click(hideAndSpread(iterator));
            $(hideDivBase + iterator).button();
            for (iterator2 = 1; iterator2 < 5; iterator2++) {
                $(sendDivBase + iterator + iterator2).click(sendClickFunc(iterator, iterator2));
                $(sendDivBase + iterator + iterator2).button();
            }

        }

    };

    Table.prototype.initMenu = function() {
        // Create the Menu
        var self = this;

        // Function to update display with number of cards remaining
        var numCardsDeck = function(p) {
            var dcl = $('#deckCountLabel');
            if (dcl.length) {
                dcl.html("Cards Remaining:  " + p);
                if (p < 1) {
                    $('#deckStack').attr("src", "img/blank.png");
                }
            } else {
                console.log("No div '#deckCountLabel' found");
            }
        };
        this.deck_.onChange(numCardsDeck); // Subscribe to change in card count

        // Function to update display with number of cards in Discard
        var numCardsDiscard = function(p) {
            var cdl = $('#communityDiscardLabel');
            if (cdl.length) {
                cdl.html("Community Discard:  " + p);
                if (p > 0) {
                    $('#communityDiscardImage').attr("src", self.deck_.backImage());
                } else {
                    $('#communityDiscardImage').attr("src", 'img/blank.png');
                }
            } else {
                console.log("No div '#communityDiscardLabel' found");
            }
        };
        this.community_.discard().onChange(numCardsDiscard); // Subscribe to change in card count

        // Function to update display with number of cards in Community Hand
        var numCardsCHand = function(p) {
            var chl = $('#communityHandLabel');
            if (chl.length) {
                chl.html("Community Hand:  " + p);
                self.community_.reDraw();
            } else {
                console.log("No div '#communityHandLabel' found");
            }
        };
        this.community_.hand().onChange(numCardsCHand); // Subscribe to change in card count


        // Reset Table
        var resetTableButton = $('#resetTable');
        resetTableButton.button();
        resetTableButton.on("click", function(event, ui) {
            window.location = "index.html";
        });


        $('#manageDeck').buttonset();

        // Manage the Deck
        var removeJokerButton = $('#removeJokers');
        var euchreDeckButton = $('#euchreDeck');
        var deckWithJokersButton = $('#deckWithJokers');

        removeJokerButton.on("click", function(event, ui) {
            self.deck_.removeCard('J', 0);
            self.deck_.removeCard('J', 14);
            $('#manageDeck').buttonset("option", "disabled", true);
        });

        // Manage the Deck
        euchreDeckButton.click(function(event) {
            self.deck_.setEuchre();
            $('#manageDeck').buttonset("option", "disabled", true);
        });

        deckWithJokersButton.click(function(event) {
            console.log("No change to the deck since it had Jokers to start");
            $('#manageDeck').buttonset("option", "disabled", true);
        });

        var resetDeckButton = $('#resetDeck');

        resetDeckButton.click(function(event) {
            self.deck_.init();
            self.community_.discard().init();
            var n = self.player_count_;
            // Community is player 0
            for (i = 0; i <= n; i++) {
                self.players_[i].hand().init();
                if (i) {
                    self.players_[i].reDraw();
                }
            }

            var deckStack = $('#deckStack');
            if (deckStack.length) {
                deckStack.attr("src", self.deck_.backImage());
            } else {
                console.log("No div '#deckStack' but reset deck called");
            }
        });
        resetDeckButton.button();

        var shuffleDeckButton = $('#shuffleDeck');
        shuffleDeckButton.click(function(event) {
            self.deck_.shuffle();
        });
        shuffleDeckButton.button();

        var discardCardButton = $('#discardCard');
        discardCardButton.click(function(event) {
            var x = self.deck_.pop();
            if (x) {
                self.community_.discard().push(x);
            }
        });
        discardCardButton.button();


        // Configure Players
        var setPlayersSelector = $('#managePlayers');
        setPlayersSelector.buttonset();

        $('#1player').click(function(event) {
            self.numPlayers(1);
            setPlayersSelector.buttonset("option", "disabled", true);
        });
        $('#2player').click(function(event) {
            self.numPlayers(2);
            setPlayersSelector.buttonset("option", "disabled", true);
        });
        $('#3player').click(function(event) {
            self.numPlayers(3);
            setPlayersSelector.buttonset("option", "disabled", true);
        });
        $('#4player').click(function(event) {
            self.numPlayers(4);
            setPlayersSelector.buttonset("option", "disabled", true);
        });


        var deckStack = $('#deckStack');
        deckStack.click(function(event) {
            if (self.deck_.numRemaining() > 0) {
                var c = self.deck_.pop();
                self.community_.hand().push(c);
            } else {
                console.log("No more cards to pop");
            }
        });

        // When the name changes, capture it.
        var p1NameCapture = function(e) {
            self.players_[1].name(e.target.value);
            var ec = self.players_[1].getEmailCookie();
            if (ec !== "") {
                self.players_[1].email(ec);
                $('#player1Email').val(ec);
            }
            self.game_manager_.reDraw();
        };
        $('#player1Name').change(p1NameCapture);

        var p2NameCapture = function(e) {
            self.players_[2].name(e.target.value);
            var ec = self.players_[2].getEmailCookie();
            if (ec !== "") {
                self.players_[2].email(ec);
                $('#player2Email').val(ec);
            }
            self.game_manager_.reDraw();
        };
        $('#player2Name').change(p2NameCapture);

        var p3NameCapture = function(e) {
            self.players_[3].name(e.target.value);
            var ec = self.players_[3].getEmailCookie();
            if (ec !== "") {
                self.players_[3].email(ec);
                $('#player3Email').val(ec);
            }
            self.game_manager_.reDraw();
        };
        $('#player3Name').change(p3NameCapture);

        var p4NameCapture = function(e) {
            self.players_[4].name(e.target.value);
            var ec = self.players_[4].getEmailCookie();
            if (ec !== "") {
                self.players_[4].email(ec);
                $('#player4Email').val(ec);
            }
            self.game_manager_.reDraw();
        };
        $('#player4Name').change(p4NameCapture);

        // When the email changes, capture it.
        var p1EmailCapture = function(e) {
            self.players_[1].email(e.target.value);
            self.players_[1].setEmailCookie();
            self.game_manager_.reDraw();
        };
        $('#player1Email').change(p1EmailCapture);

        var p2EmailCapture = function(e) {
            self.players_[2].email(e.target.value);
            self.players_[2].setEmailCookie();
            self.game_manager_.reDraw();
        };
        $('#player2Email').change(p2EmailCapture);

        var p3EmailCapture = function(e) {
            self.players_[3].email(e.target.value);
            self.players_[3].setEmailCookie();
            self.game_manager_.reDraw();
        };
        $('#player3Email').change(p3EmailCapture);

        var p4EmailCapture = function(e) {
            self.players_[4].email(e.target.value);
            self.players_[4].setEmailCookie();
            self.game_manager_.reDraw();
        };
        $('#player4Email').change(p4EmailCapture);

        // When the preferEmail changes, capture it.
        var p1EmailPreferedCapture = function(e) {
            self.players_[1].preferEmail(e.target.checked);
            self.game_manager_.reDraw();
        };
        $('#player1EmailPrefered').change(p1EmailPreferedCapture);

        var p2EmailPreferedCapture = function(e) {
            self.players_[2].preferEmail(e.target.checked);
            self.game_manager_.reDraw();
        };
        $('#player2EmailPrefered').change(p2EmailPreferedCapture);

        var p3EmailPreferedCapture = function(e) {
            self.players_[3].preferEmail(e.target.checked);
            self.game_manager_.reDraw();
        };
        $('#player3EmailPrefered').change(p3EmailPreferedCapture);

        var p4EmailPreferedCapture = function(e) {
            self.players_[4].preferEmail(e.target.checked);
            self.game_manager_.reDraw();
        };
        $('#player4EmailPrefered').change(p4EmailPreferedCapture);


        self.playerNavSetup();





    }; // end initMenu



    Table.prototype.numPlayers = function(n) {
        var self = this;
        if (!arguments.length) return self.player_count_;
        self.player_count_ = n;
        var i;

        for (i = 4; i > n; i--) {
            self.players_[i].hide();
        }
        for (i = 1; i <= n; i++) {
            self.players_[i].show();
            self.players_[i].reDraw();
            self.game_manager_.addPlayer(self.players_[i]);
        }
        if (n === 0) {
            self.game_manager_.init();
        } else {
            self.game_manager_.reDraw();
        }
        return this;
    };

    Table.prototype.constructor = Table;

    return Table;
})();
