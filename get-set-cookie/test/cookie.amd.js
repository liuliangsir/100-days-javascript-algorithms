define(function () {

    'use strict';

    return {

        getCookie(key, cookie) {

            var cookies = decodeURIComponent(cookie);
            var legalKey = key ? key.replace(/[\-\[\]\{\}\(\)\*\+\?\.\,\\\^\$\|\#\s]/g, '\\$&') : '' + key;
            var regexp = new RegExp('(;\s+)?' + legalKey + '\=([^;]+)(?=;\s+)?');
            var result = cookies.match(regexp);

            if (!result) {
                return null;
            }
            return result[2];
        },

        getCookies(cookie, ...keys) {

            var self = this;

            return keys.reduce(function (pre, cur) {
                pre[cur] = self.getCookie(cur, cookie);
                return pre;
            }, {});

        },

        setCookie(cookie = {}) {

            var keys = ['key', 'expires', 'domain', 'path', 'secure', 'httpOnly'];
            var values = [];
            return Object.keys(cookie).filter(function (v) {
                return keys.indexOf(v) > -1;
            }).map(function (v) {
                switch (v) {
                    case 'key': {
                        return [cookie[v], cookie.value];
                    }
                    case 'expires': {
                        return [v, new Date(Date.now() +  (cookie[v] * 24 * 60 * 60 * 1000)).toUTCString()];
                    }
                    case 'secure': {
                        return [v];
                    }
                    case 'httpOnly': {
                        return [v.replace(/\b\w/, function (firstChar) {
                            return firstChar.toUpperCase();
                        })]
                    }
                    default: {
                        return [v, cookie[v]];
                    }
                }
            }).map(function (v) {
                return v.join('=');
            }).join('; ');
        }
    };
});