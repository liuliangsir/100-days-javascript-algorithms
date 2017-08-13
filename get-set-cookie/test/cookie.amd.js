define(function () {

    'use strict';

    return {

        cookie: document.cookie,

        getCookie(key) {
            var cookies = decodeURIComponent(this.cookie);
            var legalKey = key ? key.replace(/[\-\[\]\{\}\(\)\*\+\?\.\,\\\^\$\|\#\s]/g, '\\$&') : '' + key;
            var regexp = new RegExp('(?:;\s+)?' + legalKey + '=([^;]*)');
            var result = cookies.match(regexp);

            if (!result) {
                return null;
            }

            return result[1];
        },

        getCookies(...keys) {
            var self = this;

            if (Array.isArray(keys[0])) {
                keys = keys[0];
            }

            return keys.reduce(function (pre, cur) {
                pre[cur] = self.getCookie(cur);
                return pre;
            }, {});
        },

        setCookie(key, value, ...params) {
            var keys = ['expires', 'domain', 'path', 'secure', 'httpOnly'];
            var millisecond = 0;

            var suffix = keys.filter(function (v, k) {
                return params[k] !== void 0;
            }).map(function (v, k) {
                if (v === 'expires') {
                    millisecond = Date.now() +  (params[k] * 24 * 60 * 60 * 1000);
                    return [v, new Date(millisecond).toUTCString()];
                }
                else if (v === 'secure') {
                    return [v];
                }
                else if (v === 'httpOnly') {
                    return ['HttpOnly'];
                }
                return [v, params[k]];
            }).map(function (v) {
                return v.join('=');
            }).join('; ');

            return [this.cookie = encodeURIComponent(key + '=' + value + (suffix ? '; ' + suffix : '')), millisecond];
        }
    };
});
