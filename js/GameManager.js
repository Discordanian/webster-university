/***********************************************************************
 * Filenamy: GameManager.js
 * Author  : Kurt Schwind
 * Email   : KurtSchwind99@webster.edu
 ***********************************************************************/
var GameManager = GameManager || (function() {

    // Should I use an associative array?

    // Constructor 
    function GameManager() {
        this.players_ = [];
        this.scores_ = [];
        this.active_player_ = undefined;
    }

    GameManager.prototype.init = function() {
        var self = this;
        var x = $("#player1gm").length;
        if (x) {
            $("#player1gm").hide();
            $("#player2gm").hide();
            $("#player3gm").hide();
            $("#player4gm").hide();


            var iterator = 0;

            var scoreChange = function(n) {
                return function(e) {
                    var nameDiv = "#player" + n + "gmName";
                    var scoreDiv = "#player" + n + "gmScore";
                    var x = $(nameDiv).val();
                    var s = $(scoreDiv).val();
                    self.setScoreCookie(x, s);
                    self.reDraw();
                };
            };


            var divPrefix = '#player';
            var scoreDivSuffix = "gmScore";
            var nameDivSuffix = "gmName";
            for (iterator = 1; iterator < 5; iterator++) {
                $(divPrefix + iterator + scoreDivSuffix).change(scoreChange(iterator));
            }


        } else {
            console.log("DIV [#player1gm] not found.  OK in TEST");
        }
    };

    GameManager.prototype.addPlayer = function(p) {
        this.players_.push(p);
        this.scores_.push(0);
        console.log("Adding Player ID " + p.id());
        return this;
    };

    GameManager.prototype.reDraw = function() {
        var self = this;
        var highscore = 0;
        var scoreDiv;
        for (var i = 1; i < self.players_.length; i++) {
            scoreDiv = "#player" + i + "gmScore";
            var d = $("#score");
            if (d.length) {
                var divName = "#player" + i + "gm";
                $(divName).show();
                divName = "#player" + self.players_[i].id() + "gmName";
                // console.log("Set div [" + divName + "] to [" + self.players_[i].displayName() + "]");
                $(divName).val(self.players_[i].displayName());
                $(scoreDiv).val(self.getScoreCookie($(divName).val()));
                if (highscore < parseInt($(scoreDiv).val())) {
                    highscore = parseInt($(scoreDiv).val());
                }
            }
        }
        for (i = 1; i < self.players_.length; i++) {
            scoreDiv = "#player" + i + "gmScore";
            $(scoreDiv).css('backgroundColor', 'white');
            if (highscore === parseInt($(scoreDiv).val())) {
                $(scoreDiv).css('backgroundColor', 'yellow');
            }
        }

        return this;
    };

    GameManager.prototype.active = function(p) {

        if (!arguments.length) {
            return this.active_player_;
        }

        this.active_player_ = p;
        return this;
    };

    GameManager.prototype.score = function(p, s) {
        if (arguments.length === 2) {
            this.scores_[p] = s;
            return this;
        }
        return this.scores_[p];
    };

    GameManager.prototype.clear = function() {
        var self = this;
        for (var i = 1; i < self.players_.length; i++) {
            self.scores_[i] = 0;
        }
        return this;
    };

    GameManager.prototype.getScoreCookie = function(pname) {
        var cname = pname + "SCORE=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(cname) === 0) {
                // console.log("Score Cookie Found for [" + cname + "] -> [" + c.substring(cname.length, c.length) + "]");
                return c.substring(cname.length, c.length);
            }
        }
        return "0";
    };

    GameManager.prototype.setScoreCookie = function(pname, val) {
        var cname = pname + "SCORE";
        var d = new Date();
        d.setTime(d.getTime() + (23 * 23 * 60 * 60 * 1000)); // 23 days for the cookie
        var expires = "expires=" + d.toUTCString();
        // console.log("Set Cookie for [" + pname + "] -> [" + val + "]");
        document.cookie = cname + "=" + val + "; " + expires;

    };



    GameManager.prototype.constructor = GameManager;

    return GameManager;
})();
