define(function (require) {

    'use strict';

    var cookieUtil = require('./cookie.amd');

    describe("操作cookie", function () {
        describe('设置cookie成功', function () {
            it('name, value存在', function () {
                cookieUtil.setCookie('cookie1', 100);

                expect(document.cookie).toBe(encodeURIComponent('cookie1=100'));
            });
            it('name, value, expires存在', function () {
                var millisecond = cookieUtil.setCookie('cookie2', 100, 5);

                expect(document.cookie)
                .toBe(encodeURIComponent(
                        'cookie2=100; expires='
                        + new Date(millisecond).toUTCString()
                    )
                );
            });
            it('name, value, expires, domain存在', function () {
                var millisecond = cookieUtil.setCookie('cookie3', 100, 5, 'abc.com');

                expect(document.cookie)
                .toBe(encodeURIComponent(
                        'cookie3=100; expires='
                        + new Date(millisecond).toUTCString()
                        + '; domain=abc.com'
                    )
                );
            });
            it('name, value, expires, domain, path存在', function () {
                var millisecond = cookieUtil.setCookie('cookie4', 100, 5, 'abc.com', '/blog');

                expect(document.cookie)
                .toBe(encodeURIComponent(
                        'cookie4=100; expires='
                        + new Date(millisecond).toUTCString()
                        + '; domain=abc.com'
                        + '; path=/blog'
                    )
                );
            });
            it('name, value, expires, domain, path, secure存在', function () {
                var millisecond = cookieUtil.setCookie('cookie5', 100, 5, 'abc.com', '/blog', true);

                expect(document.cookie)
                .toBe(encodeURIComponent(
                        'cookie5=100; expires='
                        + new Date(millisecond).toUTCString()
                        + '; domain=abc.com'
                        + '; path=/blog'
                        + '; secure'
                    )
                );
            });
        });

        describe('设置cookie失败', function () {
            it('name, value, expires, domain, path, secure, HttpOnly存在', function () {
                var millisecond = cookieUtil.setCookie('cookie6', 100, 5, 'abc.com', '/blog', true, true);

                expect(document.cookie)
                .toBe(encodeURIComponent(
                        'cookie6=100; expires='
                        + new Date(millisecond).toUTCString()
                        + '; domain=abc.com'
                        + '; path=/blog'
                        + '; secure'
                        + '; HttpOnly'
                    )
                );
            });
        });

        describe('获取cookie成功', function () {
            it('key有效，cookie不为空', function () {
                cookieUtil.setCookie('cookie5', 100);
                expect(cookieUtil.getCookie('cookie5')).toBe('100');
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
