define(function () {

    'use strict';

    return {
        getCookie(key) {
            var cookies = decodeURIComponent(document.cookie);
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

            if (!keys.length) {
                keys = document.cookie.match(/[^;\s]+?(?=\=)/g);
            }
            return keys.reduce(function (pre, cur) {
                pre[cur] = self.getCookie(cur);
                return pre;
            }, {});
        },

        setCookie(param = {expires: 0, domain: '.com', path: '/', secure: true, httpOnly: true}) {
            var millisecond = 0;
            var cookie = Object.keys(param).filter(function (v) {
                return v !== 'value';
            }).map(function (v) {
                if (v === 'key') {
                    return [param[v], encodeURIComponent(param.value)];
                }
                else if (v === 'expires') {
                    millisecond = param[v]
                        ? Date.now() +  (param[v] * 24 * 60 * 60 * 1000)
                        : Date.now();

                    return [
                        v,
                        new Date(millisecond).toUTCString()
                    ];
                }
                else if (v === 'secure') {
                    return [v];
                }
                else if (v === 'httpOnly') {
                    return ['HttpOnly'];
                }
                return [v, encodeURIComponent(param[v])];
            }).map(function (v) {
                return v.join('=');
            }).join('; ');

            document.cookie = cookie;
        }
    };
});
