export default {

    getCookie(key, cookie) {

        var cookies = decodeURIComponent(cookie);
        var legalKey = key ? key.replace(/[\-\[\]\{\}\(\)\*\+\?\.\,\\\^\$\|\#\s]/g, '\\$&') : key;

    },

    setCookie(key, value, expires, domain, path, secure) {

    }
};