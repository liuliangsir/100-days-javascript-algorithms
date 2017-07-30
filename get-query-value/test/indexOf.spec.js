define(function (require) {

    'use strict';

    var parseUrlByIndexOf = require('./indexOf.amd').indexOf;

    describe("url parse specs", function () {

        const url = 'https://www.baidu.com/';

        describe('the result of parsing url should be empty object', function () {
            it('work for illegal url and no param key', function () {

                expect(parseUrlByIndexOf(url)).toEqual({});

                expect(parseUrlByIndexOf(url + '?')).toEqual({});

            });

            it('work for illegal url and param key', function () {

                expect(parseUrlByIndexOf(url, '')).toEqual({});

                expect(parseUrlByIndexOf(url + '?', '')).toEqual({});

            });

        });

        describe('the result of parsing url should be empty string', function () {
            it('work for illegal url and whether or not param key is legal', function () {

                expect(parseUrlByIndexOf(url, 'name')).toBe('');
                expect(parseUrlByIndexOf(url, ']name')).toBe('');
                expect(parseUrlByIndexOf(url, 'me[')).toBe('');
                expect(parseUrlByIndexOf(url, '[name]')).toBe('');

                expect(parseUrlByIndexOf(url + '?', 'name')).toBe('');
                expect(parseUrlByIndexOf(url + '?', ']name')).toBe('');
                expect(parseUrlByIndexOf(url + '?', 'me[')).toBe('');
                expect(parseUrlByIndexOf(url + '?', '[name]')).toBe('');

                expect(parseUrlByIndexOf(url + '?name', 'name')).toBe('');
                expect(parseUrlByIndexOf(url + '?name', ']name')).toBe('');
                expect(parseUrlByIndexOf(url + '?name', 'me[')).toBe('');
                expect(parseUrlByIndexOf(url + '?name', 'me')).toBe('');
                expect(parseUrlByIndexOf(url + '?name', '[name]')).toBe('');

                expect(parseUrlByIndexOf(url + '?name=', 'name')).toBe('');
                expect(parseUrlByIndexOf(url + '?name=', ']name')).toBe('');
                expect(parseUrlByIndexOf(url + '?name=', 'me[')).toBe('');
                expect(parseUrlByIndexOf(url + '?name=', 'me')).toBe('');
                expect(parseUrlByIndexOf(url + '?name=', '[name]')).toBe('');

                expect(parseUrlByIndexOf(url + '?name=%20&zhangsan', ']name')).toBe('');
                expect(parseUrlByIndexOf(url + '?name=%20&zhangsan', 'me[')).toBe('');
                expect(parseUrlByIndexOf(url + '?name=%20&zhangsan', 'me')).toBe('');
                expect(parseUrlByIndexOf(url + '?name=%20&zhangsan', '[name]')).toBe('');

                expect(parseUrlByIndexOf(url + '?%20name=%20&zhangsan', 'name')).toBe('');
                expect(parseUrlByIndexOf(url + '?%20name=%20&zhangsan', ']name')).toBe('');
                expect(parseUrlByIndexOf(url + '?%20name=%20&zhangsan', 'me[')).toBe('');
                expect(parseUrlByIndexOf(url + '?%20name=%20&zhangsan', 'me')).toBe('');
                expect(parseUrlByIndexOf(url + '?%20name=%20&zhangsan', '[name]')).toBe('');

                expect(parseUrlByIndexOf(url + '?%20name=zhangsan', 'name')).toBe('');
                expect(parseUrlByIndexOf(url + '?%20name=zhangsan', ']name')).toBe('');
                expect(parseUrlByIndexOf(url + '?%20name=zhangsan', 'me[')).toBe('');
                expect(parseUrlByIndexOf(url + '?%20name=zhangsan', 'me')).toBe('');
                expect(parseUrlByIndexOf(url + '?%20name=zhangsan', '[name]')).toBe('');

                expect(parseUrlByIndexOf(url + '?name=[zhangsan]', ']name')).toBe('');
                expect(parseUrlByIndexOf(url + '?name=[zhangsan]', 'me[')).toBe('');
                expect(parseUrlByIndexOf(url + '?name=[zhangsan]', 'me')).toBe('');
                expect(parseUrlByIndexOf(url + '?name=[zhangsan]', '[name]')).toBe('');

                expect(parseUrlByIndexOf(url + '?[name]=[zhangsan]', 'name')).toBe('');
                expect(parseUrlByIndexOf(url + '?[name]=[zhangsan]', ']name')).toBe('');
                expect(parseUrlByIndexOf(url + '?[name]=[zhangsan]', 'me[')).toBe('');
                expect(parseUrlByIndexOf(url + '?[name]=[zhangsan]', 'me')).toBe('');

            });

            it('work for legal url and legal query data key with param key (not strict equal to query data key)', function () {

                expect(parseUrlByIndexOf(url + '?name=zhangsan', 'ame')).toBe('');

            });

            it('work for legal url and legal query data key with illegal param key', function () {

                expect(parseUrlByIndexOf(url + '?name=zhangsan', ']name')).toBe('');

                expect(parseUrlByIndexOf(url + '?name=zhangsan', 'me[')).toBe('');

                expect(parseUrlByIndexOf(url + '?[name]=zhangsan', ']name')).toBe('');

                expect(parseUrlByIndexOf(url + '?[name]=zhangsan', 'me[')).toBe('');

            });

            it('work for legal url (empty query data value and (il)legal param key)', function () {

                expect(parseUrlByIndexOf(url + '?name=', 'name')).toBe('');

                expect(parseUrlByIndexOf(url + '?[name]=', '[name]')).toBe('');

            });
        });

        describe('the result of parsing url should be  non-object', function () {
            it('work for legal url and param key (empty string) or no param key', function () {

                expect(parseUrlByIndexOf(url + '?name=zhangsan', '')).toEqual({
                    name: 'zhangsan'
                });

                expect(parseUrlByIndexOf(url + '?name=[zhangsan]', '')).toEqual({
                    name: '[zhangsan]'
                });

                expect(parseUrlByIndexOf(url + '?%20name=zhangsan', '')).toEqual({
                    ' name': 'zhangsan'
                });

                expect(parseUrlByIndexOf(url + '?name=zhangsan&age=12', '')).toEqual({
                    name: 'zhangsan',
                    age: '12'
                });

                expect(parseUrlByIndexOf(url + '?%20name=%20&zhangsan', '')).toEqual({
                    ' name': ' ',
                    zhangsan: ''
                });

                expect(parseUrlByIndexOf(url + '?%20name=%20&zhangsan=%20&age', '')).toEqual({
                    ' name': ' ',
                    zhangsan: ' ',
                    age: ''
                });

                expect(parseUrlByIndexOf(url + '?%20name=%20&zhangsan=%20&age=', '')).toEqual({
                    ' name': ' ',
                    zhangsan: ' ',
                    age: ''
                });

                expect(parseUrlByIndexOf(url + '?name', '')).toEqual({
                    name: ''
                });

                expect(parseUrlByIndexOf(url + '?name=', '')).toEqual({
                    name: ''
                });

                expect(parseUrlByIndexOf(url + '?[name]=zhangsan', '')).toEqual({
                    '[name]': 'zhangsan'
                });

                expect(parseUrlByIndexOf(url + '?[name]=[zhangsan]', '')).toEqual({
                    '[name]': '[zhangsan]'
                });


                expect(parseUrlByIndexOf(url + '?name=zhangsan')).toEqual({
                    name: 'zhangsan'
                });

                expect(parseUrlByIndexOf(url + '?name=[zhangsan]')).toEqual({
                    name: '[zhangsan]'
                });

                expect(parseUrlByIndexOf(url + '?%20name=zhangsan')).toEqual({
                    ' name': 'zhangsan'
                });

                expect(parseUrlByIndexOf(url + '?name=zhangsan&age=12')).toEqual({
                    name: 'zhangsan',
                    age: '12'
                });

                expect(parseUrlByIndexOf(url + '?%20name=%20&zhangsan')).toEqual({
                    ' name': ' ',
                    zhangsan: ''
                });

                expect(parseUrlByIndexOf(url + '?%20name=%20&zhangsan=%20&age')).toEqual({
                    ' name': ' ',
                    zhangsan: ' ',
                    age: ''
                });

                expect(parseUrlByIndexOf(url + '?%20name=%20&zhangsan=%20&age=')).toEqual({
                    ' name': ' ',
                    zhangsan: ' ',
                    age: ''
                });

                expect(parseUrlByIndexOf(url + '?name')).toEqual({
                    name: ''
                });

                expect(parseUrlByIndexOf(url + '?name=')).toEqual({
                    name: ''
                });

                expect(parseUrlByIndexOf(url + '?[name]=zhangsan')).toEqual({
                    '[name]': 'zhangsan'
                });

                expect(parseUrlByIndexOf(url + '?[name]=[zhangsan]')).toEqual({
                    '[name]': '[zhangsan]'
                });

            });

        });

        describe('the result of parsing url should be non-string', function () {
            it('work for (il)legal url and (il)legal param key', function () {

                expect(parseUrlByIndexOf(url + '?name=zhangsan', 'name')).toBe('zhangsan');

                expect(parseUrlByIndexOf(url + '?[name]=zhangsan', '[name]')).toBe('zhangsan');

                expect(parseUrlByIndexOf(url + '?%20name=zhangsan', ' name')).toBe('zhangsan');

                expect(parseUrlByIndexOf(url + '?name=[zhangsan]', 'name')).toBe('[zhangsan]');

                expect(parseUrlByIndexOf(url + '?[name]=[zhangsan]', '[name]')).toBe('[zhangsan]');

                expect(parseUrlByIndexOf(url + '?name=%20&zhangsan', 'name')).toBe(' ');

                expect(parseUrlByIndexOf(url + '?%20name=%20&zhangsan', ' name')).toBe(' ');

            });
        });

    });
});
