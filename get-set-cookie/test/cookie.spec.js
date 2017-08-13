define(function (require) {

    'use strict';

    var cookieUtil = require('../../src/cookie.amd');

    describe("操作cookie", function () {
        describe('设置cookie成功', function () {
            it('name, value存在', function () {
                cookieUtil.setCookie({
                    key: 'cookie1',
                    value: 100
                });

                expect(document.cookie).toBe('cookie1=100');
            });
            it('name, value, expires存在', function () {
                var millisecond = cookieUtil.setCookie({
                    key: 'cookie2',
                    value: 100,
                    expires: 5
                });

                expect(document.cookie)
                .toBe('cookie1=100; cookie2=100');
            });
            it('name, value, expires, domain存在', function () {
                var millisecond = cookieUtil.setCookie({
                    key: 'cookie3',
                    value: 100,
                    expires: 5,
                    domain: '192.168.1.102'
                });

                expect(document.cookie)
                .toBe('cookie1=100; cookie2=100; cookie3=100');
            });
            it('name, value, expires, domain, path存在', function () {
                var millisecond = cookieUtil.setCookie({
                    key: 'cookie4',
                    value: 100,
                    expires: 5,
                    domain: '192.168.1.102',
                    path: '/'
                });

                expect(document.cookie)
                .toBe('cookie1=100; cookie2=100; cookie3=100; cookie4=100');
            });
            it('name, value, expires, domain, path, secure存在', function () {
                var millisecond = cookieUtil.setCookie({
                    key: 'cookie5',
                    value: 100,
                    expires: 5,
                    domain: '192.168.1.102',
                    path: '/',
                    secure: true
                });

                expect(document.cookie)
                .toBe('cookie1=100; cookie2=100; cookie3=100; cookie4=100');
            });
        });

        describe('设置cookie失败', function () {
            it('name, value, expires, domain, path, secure, HttpOnly存在', function () {
                var millisecond = cookieUtil.setCookie({
                    key: 'cookie6',
                    value: 100,
                    expires: 5,
                    domain: '192.168.1.102',
                    path: '/',
                    secure: true,
                    httpOnly: true
                });

                expect(document.cookie)
                .toBe('cookie1=100; cookie2=100; cookie3=100; cookie4=100');
            });
        });

        describe('获取cookie成功', function () {
            it('key有效，cookie不为空', function () {
                cookieUtil.setCookie({
                    key: 'cookie7',
                    value: 100
                });
                expect(cookieUtil.getCookie('cookie7')).toBe('100');
            });
        });

        describe('获取多个cookie成功', function () {
            it('key有效，cookie不为空', function () {
                cookieUtil.setCookie({
                    key: 'cookie8',
                    value: 100,
                    expires: 5
                });
                cookieUtil.setCookie({
                    key: 'cookie9',
                    value: 200,
                    expires: 5
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
                    cookie1: '100',
                    cookie2: '100',
                    cookie3: '100',
                    cookie4: '100',
                    cookie7: '100',
                    cookie8: '100',
                    cookie9: '200'
                });
            });
        });

        describe('获取cookie失败', function () {
            it('key有效，cookie为空', function () {
                expect(cookieUtil.getCookie('coo')).toBeNull();
            });
            it('key无效，cookie为空', function () {
                expect(cookieUtil.getCookie(' cookie1=')).toBeNull();
            });
            it('key有效，cookie不为空', function () {
                expect(cookieUtil.getCookie('cookie')).toBeNull();
            });
            it('key无效，cookie不为空', function () {
                expect(cookieUtil.getCookie('; cookie')).toBeNull();
            });
        });
    });
});
