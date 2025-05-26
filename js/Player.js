/***********************************************************************
 * Filenamy: Player.js
 * Author  : Kurt Schwind
 * Email   : KurtSchwind99@webster.edu
 ***********************************************************************/
var Player = Player || (function() {
    // Constructor 
    function Player(id) {
        PlayerEntity.call(this);
        this.name_ = "";
        this.isVisible_ = true;
        this.prefer_email_ = false;
        this.name("Player " + id);
        this.email_ = "Email " + id;
        this.id(id);
    }

    // Player is a kind of 'PlayerEntity'
    Player.prototype = new PlayerEntity();


    Player.prototype.reDraw = function() {
        var self = this;
        if (self.isVisible()) {
            var handDiv = self.divName() + "Hand";
            console.log("I am going to play around with " + handDiv);
            $(handDiv).html(self.hand().spread());
        }
    };

    Player.prototype.getEmailCookie = function(e) {
        var cname = this.name() + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(cname) === 0) {
                console.log("Cookie Found for [" + cname + "] -> [" + c.substring(cname.length, c.length) + "]");
                return c.substring(cname.length, c.length);
            }
        }
        return "";
    };

    Player.prototype.setEmailCookie = function(e) {
        var d = new Date();
        d.setTime(d.getTime() + (23 * 23 * 60 * 60 * 1000)); // 23 days for the cookie
        var expires = "expires=" + d.toUTCString();
        document.cookie = this.name() + "=" + this.email() + "; " + expires;

    };


    Player.prototype.name = function(n) {
        if (!arguments.length) {
            return this.name_;
        }
        console.log("Player " + this.id_ + " has name " + n);
        this.name_ = n;
        return this;
    };

    Player.prototype.email = function(n) {
        if (!arguments.length) {
            return this.email_;
        }
        console.log("Player " + this.id_ + " has email " + n);
        this.email_ = n;
        return this;
    };

    Player.prototype.displayName = function() {
        var self = this;
        if (self.prefer_email_) {
            return self.email_;
        } else {
            return self.name();
        }
    };

    Player.prototype.divName = function() {
        return "#player" + this.id_;
    };

    Player.prototype.isVisible = function() {
        return this.isVisible_;
    };

    Player.prototype.show = function() {
        var self = this;
        var i = 0;
        this.isVisible_ = true;
        console.log("Show player " + this.name());
        var d = $(this.divName());
        if (d.length) {
            d.show(100);
            for (i = 1; i < 5; i++) {
                $("#send" + i + self.id_).show();
            }
        } else {
            console.log("Div [" + this.divName() + "] does not exist to set to show.  Ok in TESTing");
        }
        return this;
    };

    Player.prototype.hide = function() {
        var self = this;
        var i = 0;
        this.isVisible_ = false;
        console.log("Hide player " + this.name());
        var d = $(this.divName());
        if (d.length) {
            d.hide(100);
            for (i = 1; i < 5; i++) {
                $("#send" + i + self.id_).hide();
            }
        } else {
            console.log("Div [" + this.divName() + "] does not exist to set to hide.  Ok in TESTing");
        }
        return this;
    };

    Player.prototype.preferEmail = function(x) {
        if (!arguments.length) {
            return this.prefer_email_;
        }
        this.prefer_email_ = !!x;
        return this;
    };

    Player.prototype.constructor = Player;

    return Player;
})();
