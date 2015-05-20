browser.ignoreSynchronization = true;
browser.get(browser.baseUrl+'/test/htdocs/yubinbango-core.html');

describe('yubinbango-core', function() {
    it('7桁の数字を与えると住所を返す', function() {
      browser.executeAsyncScript(function() {
        var callback = arguments[arguments.length - 1];
        var yubin7 = '1008950';
        var a = new YubinBango.Core(yubin7, function(addr){callback(addr)});
      }).then(function(addr) {
        expect(addr.region_id).toEqual(13);
        expect(addr.region).toEqual('東京都');
        expect(addr.locality).toEqual('千代田区');
        expect(addr.street).toEqual('霞が関');
        expect(addr.extended).toEqual('１丁目２－１');
      });
    });
});
