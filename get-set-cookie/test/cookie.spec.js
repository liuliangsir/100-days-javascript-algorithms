define(function (require) {

    'use strict';

    var cookieUtil = require('./cookie.amd');

    describe("操作cookie", function () {

        describe('获取cookie成功', function () {

            it('key有效，cookie不为空', function () {
                expect(cookieUtil.getCookie('cookie1', 'cookie1=testcookie; cookie2=yet another test')).toBe('testcookie');
                expect(cookieUtil.getCookie('cookie2', 'cookie1=testcookie; cookie2=yet another test')).toBe('yet another test');
                expect(cookieUtil.getCookie('cookie2', 'cookie1=testcookie;     cookie2=yet another test')).toBe('yet another test');
            });

        });

        describe('获取cookie失败', function () {

            it('key有效，cookie为空', function () {
                expect(cookieUtil.getCookie('cookie1', '')).toBeNull();
            });
            it('key无效，cookie为空', function () {
                expect(cookieUtil.getCookie(' cookie1=', '')).toBeNull();
            });
            it('key有效，cookie不为空', function () {
                expect(cookieUtil.getCookie('cookie', 'cookie1=testcookie; cookie2=yet another test')).toBeNull();
            });
            it('key无效，cookie不为空', function () {
                expect(cookieUtil.getCookie('; cookie', 'cookie1=testcookie; cookie2=yet another test')).toBeNull();
            });
        });

        describe('设置cookie成功', function () {

            it('name, value存在', function () {
                expect(cookieUtil.setCookie({key: 'cookie', value: 100})).toBe('cookie=100');
            });
            it('name, value, expires存在', function () {
                expect(cookieUtil.setCookie({key: 'cookie', value: 100, expires: 5})).toBe('cookie=100; expires=Fri, 04 Aug 2017 12:54:24 GMT');
            });
            it('name, value, expires, domain存在', function () {
                expect(cookieUtil.setCookie({key: 'cookie', value: 100, expires: 5, domain: 'abc.com'})).toBe('cookie=100; expires=Fri, 04 Aug 2017 12:54:24 GMT; domain=abc.com');
            });
            it('name, value, expires, domain, path存在', function () {
                expect(cookieUtil.setCookie({key: 'cookie', value: 100, expires: 5, domain: 'abc.com', path: '/blog'})).toBe('cookie=100; expires=Fri, 04 Aug 2017 12:54:24 GMT; domain=abc.com; path=/blog');
            });
            it('name, value, expires, domain, path, secure存在', function () {
                expect(cookieUtil.setCookie({key: 'cookie', value: 100, expires: 5, domain: 'abc.com', path: '/blog', secure: true})).toBe('cookie=100; expires=Fri, 04 Aug 2017 12:54:24 GMT; domain=abc.com; path=/blog; secure');
            });

        });

        describe('设置cookie失败', function () {

            it('name, value, expires, domain, path, secure, HttpOnly存在', function () {
                expect(cookieUtil.setCookie({key: 'cookie', value: 100, expires: 5, domain: 'abc.com', path: '/blog', secure: true, httpOnly: true})).toBe('cookie=100; expires=Fri, 04 Aug 2017 12:54:24 GMT; domain=abc.com; path=/blog; secure; HttpOnly');
            });

        });

    });
});
