browser.ignoreSynchronization = true;
browser.get(browser.baseUrl+'/test/htdocs/yubinbango-core.html');

describe('yubinbango-core', () => {
    it('7桁の数字を与えると住所を返す', () => {
      browser.executeAsyncScript(() => {
        const callback = arguments[arguments.length - 1];
        const yubin7 = '1008950';
        new YubinBango.Core(yubin7, addr => {callback(addr)});
      }).then(addr => {
        expect(addr.region_id).toEqual(13);
        expect(addr.region).toEqual('東京都');
        expect(addr.locality).toEqual('千代田区');
        expect(addr.street).toEqual('霞が関');
        expect(addr.extended).toEqual('１丁目２－１');
      });
    });
    it('間違った7桁の数字を与えるとエラーメッセージを返す', () => {
      browser.executeAsyncScript(() => {
        const callback = arguments[arguments.length - 1];
        const yubin7 = '9999999';
        new YubinBango.Core(yubin7, addr => {callback(addr)});
      }).catch(e => {
        expect(e.message).toEqual("無効な郵便番号です");
      });
    });
});
