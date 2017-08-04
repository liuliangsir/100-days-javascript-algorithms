define(function (require) {

    'use strict';

    var cookieUtil = require('./cookie.amd');

    describe("操作cookie", function () {

        describe('设置cookie成功', function () {

            it('name, value存在', function () {
                expect(cookieUtil.setCookie('cookie1', 100)).toBe(encodeURIComponent('cookie1=100'));
            });
            it('name, value, expires存在', function () {
                expect(cookieUtil.setCookie('cookie2', 100, 5)).toBe(encodeURIComponent('cookie2=100'));
            });
            it('name, value, expires, domain存在', function () {
                expect(cookieUtil.setCookie('cookie3', 100, 5, 'abc.com')).toBe(encodeURIComponent('cookie3=100'));
            });
            it('name, value, expires, domain, path存在', function () {
                expect(cookieUtil.setCookie('cookie4', 100, 5, 'abc.com', '/blog')).toBe(encodeURIComponent('cookie4=100'));
            });
            it('name, value, expires, domain, path, secure存在', function () {
                expect(cookieUtil.setCookie('cookie5', 100, 5, 'abc.com', '/blog', true)).toBe(encodeURIComponent('cookie5=100'));
            });

        });

        describe('设置cookie失败', function () {

            it('name, value, expires, domain, path, secure, HttpOnly存在', function () {
                expect(cookieUtil.setCookie('cookie6', 100, 5, 'abc.com', '/blog', true, true)).toBe(encodeURIComponent('cookie6=100'));
            });

        });

        describe('获取cookie成功', function () {

            it('key有效，cookie不为空', function () {

                cookieUtil.setCookie('cookie1', 100);
                expect(cookieUtil.getCookie('cookie1', cookieUtil.cookie)).toBe('100');

                cookieUtil.setCookie('cookie2', 100);
                expect(cookieUtil.getCookie('cookie2', cookieUtil.cookie)).toBe('100');

                cookieUtil.setCookie('cookie3', 100);
                expect(cookieUtil.getCookie('cookie3', cookieUtil.cookie)).toBe('100');

                cookieUtil.setCookie('cookie4', 100);
                expect(cookieUtil.getCookie('cookie4', cookieUtil.cookie)).toBe('100');

                cookieUtil.setCookie('cookie5', 100);
                expect(cookieUtil.getCookie('cookie5', cookieUtil.cookie)).toBe('100');
            });

        });

        describe('获取cookie失败', function () {

            it('key有效，cookie为空', function () {
                expect(cookieUtil.getCookie('coo', cookieUtil.cookie)).toBeNull();
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

    });
});
