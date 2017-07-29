define(function (require) {

  'use strict';

  var parseUrlByIndexOf = require('./indexOf.amd').indexOf;

  describe("url parse specs", function () {

    var url;

    beforeEach(function () {
      url = 'http://www.baidu.com/';
    });

    afterEach(function () {
      url = '';
    });

    describe('return empty string', function () {

      it('work for no param key and illegal url ( such as not contain ? or (legal) query data key or ((legal)) query data value )', function () {

        expect(parseUrlByIndexOf(url)).toBe('');

        expect(parseUrlByIndexOf(url + '?')).toBe('');

        expect(parseUrlByIndexOf(url + '?name')).toBe('');

        expect(parseUrlByIndexOf(url + '?name=')).toBe('');

        expect(parseUrlByIndexOf(url + '?name=+&zhangsan')).toBe('');

        expect(parseUrlByIndexOf(url + '?+name=+&zhangsan')).toBe('');

        expect(parseUrlByIndexOf(url + '?+name=zhangsan')).toBe('');

      });

      it('work for illegal url and param key', function () {

        expect(parseUrlByIndexOf(url, 'name')).toBe('');
        expect(parseUrlByIndexOf(url, ']name')).toBe('');
        expect(parseUrlByIndexOf(url, ']me')).toBe('');
        expect(parseUrlByIndexOf(url, 'me')).toBe('');

        expect(parseUrlByIndexOf(url + '?', 'name')).toBe('');
        expect(parseUrlByIndexOf(url + '?', ']name')).toBe('');
        expect(parseUrlByIndexOf(url + '?', ']me')).toBe('');
        expect(parseUrlByIndexOf(url + '?', 'me')).toBe('');

        expect(parseUrlByIndexOf(url + '?name', 'name')).toBe('');
        expect(parseUrlByIndexOf(url + '?name', ']name')).toBe('');
        expect(parseUrlByIndexOf(url + '?name', ']me')).toBe('');
        expect(parseUrlByIndexOf(url + '?name', 'me')).toBe('');

        expect(parseUrlByIndexOf(url + '?name=', 'name')).toBe('');
        expect(parseUrlByIndexOf(url + '?name=', ']name')).toBe('');
        expect(parseUrlByIndexOf(url + '?name=', ']me')).toBe('');
        expect(parseUrlByIndexOf(url + '?name=', 'me')).toBe('');

        expect(parseUrlByIndexOf(url + '?name=+&zhangsan', 'name')).toBe('');
        expect(parseUrlByIndexOf(url + '?name=+&zhangsan', ']name')).toBe('');
        expect(parseUrlByIndexOf(url + '?name=+&zhangsan', ']me')).toBe('');
        expect(parseUrlByIndexOf(url + '?name=+&zhangsan', 'me')).toBe('');

        expect(parseUrlByIndexOf(url + '?+name=+&zhangsan', 'name')).toBe('');
        expect(parseUrlByIndexOf(url + '?+name=+&zhangsan', ']name')).toBe('');
        expect(parseUrlByIndexOf(url + '?+name=+&zhangsan', ']me')).toBe('');
        expect(parseUrlByIndexOf(url + '?+name=+&zhangsan', 'me')).toBe('');

        expect(parseUrlByIndexOf(url + '?+name=zhangsan', 'name')).toBe('');
        expect(parseUrlByIndexOf(url + '?+name=zhangsan', ']name')).toBe('');
        expect(parseUrlByIndexOf(url + '?+name=zhangsan', ']me')).toBe('');
        expect(parseUrlByIndexOf(url + '?+name=zhangsan', 'me')).toBe('');

      });

      it('work for legal url and legal query data key with param key (not strict equal to query data key)', function () {
        expect(parseUrlByIndexOf(url + '?name=zhangsan', 'ame')).toBe('');
      });

      it('work for legal url and legal query data key with illegal param key', function () {
        expect(parseUrlByIndexOf(url + '?name=zhangsan', ']name')).toBe('');
        expect(parseUrlByIndexOf(url + '?name=zhangsan', ']me')).toBe('');
      });

    });

    describe('return not empty object', function () {

      it('work for legal url and param key (empty string) or no param key', function () {
        expect(parseUrlByIndexOf(url + '?name=zhangsan', '')).toEqual({
          name: 'zhangsan'
        });
        expect(parseUrlByIndexOf(url + '?name=zhangsan')).toEqual({
          name: 'zhangsan'
        });
      });

    });

    describe('return not empty string', function () {

      it('work for legal url and legal param key', function () {
        expect(parseUrlByIndexOf(url + '?name=zhangsan', 'name')).toBe('zhangsan');
      });

    });

  });
});