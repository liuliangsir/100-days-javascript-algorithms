define(function (require) {

    'use strict';

    var cookieUtil = require('./cookie.amd');

    describe("操作cookie", function () {

        describe('获取cookie成功', function () {

            it('key有效，cookie不为空', function () {
                expect(cookieUtil.getCookie('cookie1', cookieUtil.cookie)).toBe('testcookie');
                expect(cookieUtil.getCookie('cookie2', cookieUtil.cookie)).toBe('yet another test');
                expect(cookieUtil.getCookie('cookie2', cookieUtil.cookie)).toBe('yet another test');
            });

        });

        describe('获取cookie失败', function () {

            it('key有效，cookie为空', function () {
                expect(cookieUtil.getCookie('cookie1', cookieUtil.cookie)).toBeNull();
            });
            it('key无效，cookie为空', function () {
                expect(cookieUtil.getCookie(' cookie1=', cookieUtil.cookie)).toBeNull();
            });
            it('key有效，cookie不为空', function () {
                expect(cookieUtil.getCookie('cookie', cookieUtil.cookie)).toBeNull();
            });
            it('key无效，cookie不为空', function () {
                expect(cookieUtil.getCookie('; cookie', cookieUtil.cookie)).toBeNull();
            });
        });

        describe('设置cookie成功', function () {

            it('name, value存在', function () {
                expect(cookieUtil.setCookie('cookie1', 100)).toBe('cookie=100');
            });
            it('name, value, expires存在', function () {
                expect(cookieUtil.setCookie('cookie2', 100, 5)).toBe('cookie=100; expires=Fri, 04 Aug 2017 12:54:24 GMT');
            });
            it('name, value, expires, domain存在', function () {
                expect(cookieUtil.setCookie('cookie3', 100, 5, 'abc.com')).toBe('cookie=100; expires=Fri, 04 Aug 2017 12:54:24 GMT; domain=abc.com');
            });
            it('name, value, expires, domain, path存在', function () {
                expect(cookieUtil.setCookie('cookie4', 100, 5, 'abc.com', '/blog')).toBe('cookie=100; expires=Fri, 04 Aug 2017 12:54:24 GMT; domain=abc.com; path=/blog');
            });
            it('name, value, expires, domain, path, secure存在', function () {
                expect(cookieUtil.setCookie('cookie5', 100, 5, 'abc.com', '/blog', true)).toBe('cookie=100; expires=Fri, 04 Aug 2017 12:54:24 GMT; domain=abc.com; path=/blog; secure');
            });

        });

        describe('设置cookie失败', function () {

            it('name, value, expires, domain, path, secure, HttpOnly存在', function () {
                expect(cookieUtil.setCookie('cookie6', 100, 5, 'abc.com', '/blog', true, true)).toBe('cookie=100; expires=Fri, 04 Aug 2017 12:54:24 GMT; domain=abc.com; path=/blog; secure; HttpOnly');
            });

        });

    });
});
