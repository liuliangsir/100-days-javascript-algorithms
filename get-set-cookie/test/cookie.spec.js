define(function (require) {

    'use strict';

    var cookieUtil = require('../../src/cookie.amd');

    describe("操作cookie", function () {
        describe('获取cookie成功', function () {
            it('key有效，cookie不为空', function () {
                cookieUtil.setCookie({
                    key: 'cookie7',
                    value: 100,
                    expires: 1
                });

                expect(cookieUtil.getCookie('cookie7')).toBe('100');

                cookieUtil.removeCookie('cookie7');
            });

            it('key有效，cookie不为空，expires为0', function () {
                cookieUtil.setCookie({
                    key: 'cookie7',
                    value: 100,
                    expires: 0
                });

                expect(cookieUtil.getCookie('cookie7')).toBeNull();
            });
        });

        describe('获取多个cookie成功', function () {
            it('key有效，cookie不为空', function () {
                cookieUtil.setCookie({
                    key: 'cookie8',
                    value: 100,
                    expires: 1
                });
                cookieUtil.setCookie({
                    key: 'cookie9',
                    value: 200,
                    expires: 1
                });

                expect(cookieUtil.getCookies('cookie8', 'cookie9')).toEqual({
                    cookie8: '100',
                    cookie9: '200'
                });
                expect(cookieUtil.getCookies(['cookie8', 'cookie9'])).toEqual({
                    cookie8: '100',
                    cookie9: '200'
                });
                expect(cookieUtil.getCookies()).toEqual({
                    cookie8: '100',
                    cookie9: '200'
                });

                cookieUtil.removeCookie('cookie8');
                cookieUtil.removeCookie('cookie9');
            });
        });

        describe('获取cookie失败', function () {
            it('key有效，cookie为空', function () {
                expect(cookieUtil.getCookie(0)).toBeNull();
            });
            it('key无效，cookie为空', function () {
                expect(cookieUtil.getCookie(' cookie1-')).toBeNull();
            });
            it('key有效，cookie不为空', function () {
                expect(cookieUtil.getCookie('cookie')).toBeNull();
            });
            it('key无效，cookie不为空', function () {
                expect(cookieUtil.getCookie('; cookie')).toBeNull();
            });
        });

        describe('设置cookie成功', function () {
            it('name, value存在', function () {
                cookieUtil.setCookie({
                    key: 'cookie1',
                    value: 100,
                    expires: 5
                });

                expect(cookieUtil.getCookie('cookie1'))
                .toBe('100');

                cookieUtil.removeCookie('cookie1');
            });
            it('name, value, expires存在', function () {
                cookieUtil.setCookie({
                    key: 'cookie2',
                    value: 100,
                    expires: 1
                });

                expect(cookieUtil.getCookie('cookie2'))
                .toBe('100');

                cookieUtil.removeCookie('cookie2');
            });
            it('name, value, expires, domain存在', function () {
                cookieUtil.setCookie({
                    key: 'cookie3',
                    value: 100,
                    expires: 1,
                    domain: '192.168.1.102'
                });

                expect(cookieUtil.getCookie('cookie3'))
                .toBe('100');

                cookieUtil.removeCookie('cookie3');
            });
            it('name, value, expires, domain, path存在', function () {
                cookieUtil.setCookie({
                    key: 'cookie4',
                    value: 100,
                    expires: 1,
                    domain: '192.168.1.102',
                    path: '/'
                });

                expect(cookieUtil.getCookie('cookie4'))
                .toBe('100');

                cookieUtil.removeCookie('cookie4');
            });
        });

        describe('设置cookie失败', function () {
            it('name, value, expires, domain, path, secure, HttpOnly存在', function () {
                cookieUtil.setCookie({
                    key: 'cookie6',
                    value: 100,
                    expires: 5,
                    domain: '192.168.1.102',
                    path: '/',
                    secure: true,
                    httpOnly: true
                });

                expect(cookieUtil.getCookie('cookie6'))
                .toBeNull();
            });

            it('name, value, expires, domain, path, secure存在', function () {
                cookieUtil.setCookie({
                    key: 'cookie5',
                    value: 100,
                    expires: 5,
                    domain: '192.168.1.102',
                    path: '/',
                    secure: true
                });

                expect(cookieUtil.getCookie('cookie5'))
                .toBeNull();
            });
        });

        describe('删除cookie', function () {
            it('删除cookie成功', function () {
                cookieUtil.setCookie({
                    key: 'cookie1',
                    value: 100,
                    expires: 5
                });

                expect(cookieUtil.removeCookie('cookie1'))
                .toBeTruthy();
            });

            it('删除cookie失败', function () {
                expect(cookieUtil.removeCookie('cookie10'))
                .toBeFalsy();
            });
        });
    });
});
