define(function (require) {

    'use strict';

    var parseUrlByIndexOf = require('./indexOf.amd').indexOf;

    describe("url parse specs", function () {

        var url;

        beforeEach(function () {
            url = 'https://www.baidu.com/';
        });

        afterEach(function () {
            url = '';
        });

        describe('return empty object', function () {
            it('work for illegal url and no param key', function () {

                expect(parseUrlByIndexOf(url)).toEqual({});

                expect(parseUrlByIndexOf(url + '?')).toEqual({});

                expect(parseUrlByIndexOf(url + '?name')).toEqual({});

                expect(parseUrlByIndexOf(url + '?name=')).toEqual({});

                expect(parseUrlByIndexOf(url + '?name=+&zhangsan')).toEqual({});

                expect(parseUrlByIndexOf(url + '?+name=zhangsan')).toEqual({});

                expect(parseUrlByIndexOf(url + '?[name]=zhangsan')).toEqual({});

                expect(parseUrlByIndexOf(url + '?[name]=[zhangsan]')).toEqual({});

                expect(parseUrlByIndexOf(url + '?name=[zhangsan]')).toEqual({});

            });
        });

        describe('return empty string', function () {
            it('work for illegal url and whether or not param key is legal', function () {

                expect(parseUrlByIndexOf(url, 'name')).toBe('');
                expect(parseUrlByIndexOf(url, ']name')).toBe('');
                expect(parseUrlByIndexOf(url, 'me[')).toBe('');
                expect(parseUrlByIndexOf(url, 'me')).toBe('');
                expect(parseUrlByIndexOf(url, '[name]')).toBe('');

                expect(parseUrlByIndexOf(url + '?', 'name')).toBe('');
                expect(parseUrlByIndexOf(url + '?', ']name')).toBe('');
                expect(parseUrlByIndexOf(url + '?', 'me[')).toBe('');
                expect(parseUrlByIndexOf(url + '?', 'me')).toBe('');
                expect(parseUrlByIndexOf(url + '?', '[name]')).toBe('');

                expect(parseUrlByIndexOf(url + '?name', 'name')).toBe('');
                expect(parseUrlByIndexOf(url + '?name', ']name')).toBe('');
                expect(parseUrlByIndexOf(url + '?name', 'me[')).toBe('');
                expect(parseUrlByIndexOf(url + '?name', 'me')).toBe('');
                expect(parseUrlByIndexOf(url + '?name', '[name]')).toBe('');

                expect(parseUrlByIndexOf(url + '?name=', ']name')).toBe('');
                expect(parseUrlByIndexOf(url + '?name=', 'me[')).toBe('');
                expect(parseUrlByIndexOf(url + '?name=', 'me')).toBe('');
                expect(parseUrlByIndexOf(url + '?name=', '[name]')).toBe('');

                expect(parseUrlByIndexOf(url + '?name=+&zhangsan', 'name')).toBe('');
                expect(parseUrlByIndexOf(url + '?name=+&zhangsan', ']name')).toBe('');
                expect(parseUrlByIndexOf(url + '?name=+&zhangsan', 'me[')).toBe('');
                expect(parseUrlByIndexOf(url + '?name=+&zhangsan', 'me')).toBe('');
                expect(parseUrlByIndexOf(url + '?name=+&zhangsan', '[name]')).toBe('');

                expect(parseUrlByIndexOf(url + '?+name=+&zhangsan', 'name')).toBe('');
                expect(parseUrlByIndexOf(url + '?+name=+&zhangsan', ']name')).toBe('');
                expect(parseUrlByIndexOf(url + '?+name=+&zhangsan', 'me[')).toBe('');
                expect(parseUrlByIndexOf(url + '?+name=+&zhangsan', 'me')).toBe('');
                expect(parseUrlByIndexOf(url + '?+name=+&zhangsan', '[name]')).toBe('');

                expect(parseUrlByIndexOf(url + '?+name=zhangsan', 'name')).toBe('');
                expect(parseUrlByIndexOf(url + '?+name=zhangsan', ']name')).toBe('');
                expect(parseUrlByIndexOf(url + '?+name=zhangsan', 'me[')).toBe('');
                expect(parseUrlByIndexOf(url + '?+name=zhangsan', 'me')).toBe('');
                expect(parseUrlByIndexOf(url + '?+name=zhangsan', '[name]')).toBe('');

                expect(parseUrlByIndexOf(url + '?name=[zhangsan]', 'name')).toBe('');
                expect(parseUrlByIndexOf(url + '?name=[zhangsan]', ']name')).toBe('');
                expect(parseUrlByIndexOf(url + '?name=[zhangsan]', 'me[')).toBe('');
                expect(parseUrlByIndexOf(url + '?name=[zhangsan]', 'me')).toBe('');
                expect(parseUrlByIndexOf(url + '?name=[zhangsan]', '[name]')).toBe('');

                expect(parseUrlByIndexOf(url + '?[name]=[zhangsan]', 'name')).toBe('');
                expect(parseUrlByIndexOf(url + '?[name]=[zhangsan]', ']name')).toBe('');
                expect(parseUrlByIndexOf(url + '?[name]=[zhangsan]', 'me[')).toBe('');
                expect(parseUrlByIndexOf(url + '?[name]=[zhangsan]', 'me')).toBe('');
                expect(parseUrlByIndexOf(url + '?[name]=[zhangsan]', '[name]')).toBe('');

            });

            it('work for legal url and legal query data key with param key (not strict equal to query data key)', function () {

                expect(parseUrlByIndexOf(url + '?name=zhangsan', 'ame')).toBe('');

            });

            it('work for legal url and legal query data key with illegal param key', function () {

                expect(parseUrlByIndexOf(url + '?name=zhangsan', ']name')).toBe('');

                expect(parseUrlByIndexOf(url + '?name=zhangsan', ']me')).toBe('');

                expect(parseUrlByIndexOf(url + '?[name]=zhangsan', ']name')).toBe('');

                expect(parseUrlByIndexOf(url + '?[name]=zhangsan', 'me[')).toBe('');

            });

            it('work for legal url (empty query data value and (il)legal param key)', function () {

                expect(parseUrlByIndexOf(url + '?name='), 'name').toBe('');

                expect(parseUrlByIndexOf(url + '?[name]='), '[name]').toBe('');

            });
        });

        describe('return not empty object', function () {
            it('work for legal url and param key (empty string) or no param key', function () {

                expect(parseUrlByIndexOf(url + '?name=zhangsan', '')).toEqual({
                    name: 'zhangsan'
                });

                expect(parseUrlByIndexOf(url + '?+name=+&zhangsan', '')).toEqual({
                    name: 'zhangsan'
                });

                expect(parseUrlByIndexOf(url + '?name=zhangsan')).toEqual({
                    name: 'zhangsan'
                });

                expect(parseUrlByIndexOf(url + '?+name=+&zhangsan')).toEqual({
                    name: 'zhangsan'
                });

            });
        });

        describe('return not empty string', function () {
            it('work for (il)legal url and (il)legal param key', function () {

                expect(parseUrlByIndexOf(url + '?name=zhangsan', 'name')).toBe('zhangsan');

                expect(parseUrlByIndexOf(url + '?[name]=zhangsan', '[name]')).toBe('zhangsan');

            });
        });

    });
});