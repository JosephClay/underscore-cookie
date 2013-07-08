(function(_, window, document, undefined) {

    var _cookie = function(key, value, options) {

        // Write =====================================
        if (value !== undefined) {
            options = _.extend({}, _cookie.defaults, options);

            if (value === null) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = (_cookie.json) ? JSON.stringify(value) : String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', _cookie.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // Read =====================================
        var decode = (_cookie.raw) ? _raw : _decoded,
            cookies = document.cookie.split('; '),
            idx = 0, length = cookies.length;
        for (; idx < length; idx++) {
            var parts = cookies[idx].split('=');

            if (decode(parts.shift()) === key) {
                var cookie = decode(parts.join('='));
                return (_cookie.json) ? JSON.parse(cookie) : cookie;
            }
        }

        return null;
    };

    _cookie.defaults = {};

    var _removeCookie = function(key, options) {
        if (_cookie(key) !== null) {
            _cookie(key, null, options);
            return true;
        }
        return false;
    };

    /* Utility Methods ******************************************************/
    var _raw = function(s) {
        return s;
    };

    var _pluses = /\+/g;
    var _decoded = function(s) {
        return decodeURIComponent(s.replace(_pluses, ' '));
    };

    _.mixin({
        cookie: _cookie,
        removeCookie: _removeCookie
    });

}(_, window, document));