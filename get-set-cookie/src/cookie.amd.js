define(function () {

    'use strict';

    return {
        cookie: {},

        getCookie(key, isGlobalSearch = false) {
            var template = decodeURIComponent(document.cookie);
            var legalKey = key ? key.replace(/[\-\[\]\{\}\(\)\*\+\?\.\,\\\^\$\|\#\s]/g, '\\$&') : '' + key;
            var regexp = new RegExp('(?:;\s+)?' + legalKey + '=([^;]*)');
            var result = template.match(regexp);

            if (!result) {
                return null;
            }

            if (!isGlobalSearch) {
                return result[1];
            }

            template = this.cookie[key + '=' + result[1]];
            regexp = /[^;]+(?=;\s+)?/g;

            return template.match(regexp).map(function (v) {
                return v.trim();
            }).reduce(function (pre, cur) {
                const [k, v] = cur.split('=');
                pre[k] = v;
                return pre;
            }, {});
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

        setCookie(param = {}) {
            var millisecond = 0;
            var newParam = Object.assign({}, {
                key: '',
                expires: 0,
                domain: '192.168.1.102',
                path: '/',
                secure: false,
                httpOnly: false
            }, param);

            var cookie = Object.keys(newParam).filter(function (v) {
                return v !== 'value';
            }).map(function (v) {
                if (v === 'key') {
                    return [newParam.key, encodeURIComponent(newParam.value)];
                }
                else if (v === 'expires') {
                    millisecond = newParam.expires
                        ? (newParam.expires > 0
                            ? Date.now() +  (newParam.expires * 24 * 60 * 60 * 1000)
                            : Date.now() - 1000
                        )
                        : Date.now();
                    return [
                        v,
                        new Date(millisecond).toUTCString()
                    ];
                }
                else if (v === 'secure') {
                    return newParam[v] ? [v] : '';
                }
                else if (v === 'httpOnly') {
                    return newParam[v] ? ['HttpOnly'] : '';
                }
                return [v, newParam[v]];
            }).filter(function (v) {
                return v !== '';
            }).map(function (v) {
                return v.join('=');
            }).join('; ');

            if (newParam.expires && !newParam.secure && !newParam.httpOnly) {
                this.cookie[newParam.key + '=' + newParam.value] = cookie;
            }

            document.cookie = cookie;
        },

        removeCookie(key) {
            var cookie = this.getCookie(key, true);

            if (!cookie) {
                return !!cookie;
            }

            this.setCookie({
                key,
                value: cookie[key],
                path: cookie.path,
                domain: cookie.domain,
                expires: -1,
                httpOnly: cookie.httpOnly,
                secure: cookie.secure
            });
            return !this.getCookie(key);
        }
    };
});
