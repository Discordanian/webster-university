/***********************************************************************
 * ie_fix.js is because it's the only brwoser that does not support
 * console logging.  This is likely to change in IE 11
 ***********************************************************************/
if (typeof console !== 'object') {
    console = {
        log:            function() { },
        debug:          function() { },
        info:           function() { },
        warn:           function() { },
        error:          function() { },
        assert:         function() { },
        clear:          function() { },
        dir:            function() { },
        dirxml:         function() { },
        trace:          function() { },
        group:          function() { },
        groupCollapsed: function() { },
        groupEnd:       function() { },
        time:           function() { },
        timeEnd:        function() { },
        profile:        function() { },
        profileEnd:     function() { },
        count:          function() { },
        exception:      function() { },
        table:          function() { }
    };
}
