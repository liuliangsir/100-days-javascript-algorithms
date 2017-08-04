define(function () {

    'use strict';

    return {

        cookie: document.cookies,

        getCookie(key, cookie) {

            var cookies = decodeURIComponent(this.cookie);
            var legalKey = key ? key.replace(/[\-\[\]\{\}\(\)\*\+\?\.\,\\\^\$\|\#\s]/g, '\\$&') : '' + key;
            var regexp = new RegExp(legalKey + '\=([^;]+)');
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
                pre[cur] = self.getCookie(cur, cookie);
                return pre;
            }, {});

        },

        setCookie(key, value, ...params) {

            var keys = ['expires', 'domain', 'path', 'secure', 'httpOnly'];

            var suffix = Object.keys(params).filter(function (v) {
                return keys.indexOf(v) > -1;
            }).map(function (v) {

                if (v === 'expires') {
                    return [v, new Date(Date.now() +  (cookie[v] * 24 * 60 * 60 * 1000)).toUTCString()];
                }
                else if (v === 'secure') {
                    return [v];
                }
                else if (v === 'httpOnly') {
                    return [v.replace(/\b\w/, function (firstChar) {
                        return firstChar.toUpperCase();
                    })]
                }

                return [v, cookie[v]];

            }).map(function (v) {
                return v.join('=');
            }).join('; ');

            return this.cookie = key + '=' + value + '; ' + suffix;
        }
    };
});