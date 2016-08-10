"use strict";
var index_1 = require('../index');
var superagent = require("superagent");
var expect = require("chai").expect;
var remote = "https://emnetserver.kernel.online/position";
var pos0 = [37.533057, 15.060421];
var pos1 = [37.504192, 15.068489];
var latlng = { latitude: pos0[0], longitude: pos0[1] };
var latlng2 = { latitude: pos1[0], longitude: pos1[1] };
var token = false;
var loc;
before(function () {
    loc = new index_1.default({ remote: remote });
});
describe("test remote server", function () {
    describe("class instantiation with standards", function () {
        it("validate worldDB conf", function () {
            expect(loc.world).to.be.an('Array');
            expect(loc.remote).to.be.a('string');
            expect(loc.remote).to.eq(remote);
            expect(loc.bigWorld).to.not.exist;
            expect(loc.localization).to.not.exist;
            expect(loc.state).to.not.exist;
            expect(loc).to.be.ok;
            expect(loc).to.be.an('Object');
        });
    });
    describe("position is ok?", function () {
        this.timeout(30000);
        it("verificate working of localization", function (done) {
            superagent.get("https://emnetserver.kernel.online/auth/authorize/couchdb/testemnet/testemnet0101").end(function (err, res) {
                if (err) {
                    done(Error(err));
                }
                else if (res && res.body && !res.body.error) {
                    var obj = res.body;
                    token = obj.token;
                    loc.setPosition(latlng, token).then(function (c) {
                        expect(loc.state).to.be.an('Object');
                        expect(c).to.be.an('Array');
                        expect(c[0]).to.be.an('Object');
                        expect(c[0].nativeName).to.be.a('string');
                        done();
                    }).catch(function (c) {
                        done(Error(c));
                    });
                }
                else {
                    done(Error(res.body.error));
                }
            });
        });
        it("verificate working of 2 localization", function (done) {
            superagent.get("https://emnetserver.kernel.online/auth/authorize/couchdb/testemnet/testemnet0101").end(function (err, res) {
                if (err) {
                    done(Error(err));
                }
                else if (res && res.body && !res.body.error) {
                    var obj = res.body;
                    token = obj.token;
                    loc.setPosition(latlng2, token).then(function (c) {
                        expect(loc.state).to.be.an('Object');
                        expect(c).to.be.an('Array');
                        expect(c[0]).to.be.an('Object');
                        expect(c[0].nativeName).to.be.a('string');
                        done();
                    }).catch(function (c) {
                        done(Error(c));
                    });
                }
                else {
                    done(Error(res.body.error));
                }
            });
        });
    });
});

//# sourceMappingURL=data:application/json;base64,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QUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtnQkFDL0IsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFBO1FBSUUsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQyxDQUFBIiwiZmlsZSI6InRlc3QvcmVtb3RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExvY2FsaXplIGZyb20gJy4uL2luZGV4J1xuaW1wb3J0ICogYXMgbW9jaGEgZnJvbSBcIm1vY2hhXCI7XG5pbXBvcnQgKiBhcyBzdXBlcmFnZW50IGZyb20gXCJzdXBlcmFnZW50XCI7XG5cbmNvbnN0IGV4cGVjdCA9IHJlcXVpcmUoXCJjaGFpXCIpLmV4cGVjdDtcblxuY29uc3QgcmVtb3RlID0gXCJodHRwczovL2VtbmV0c2VydmVyLmtlcm5lbC5vbmxpbmUvcG9zaXRpb25cIjtcblxuY29uc3QgcG9zMCA9IFszNy41MzMwNTcsIDE1LjA2MDQyMV1cbmNvbnN0IHBvczEgPSBbMzcuNTA0MTkyLCAxNS4wNjg0ODldXG5cbmNvbnN0IGxhdGxuZyA9IHsgbGF0aXR1ZGU6IHBvczBbMF0sIGxvbmdpdHVkZTogcG9zMFsxXSB9O1xuY29uc3QgbGF0bG5nMiA9IHsgbGF0aXR1ZGU6IHBvczFbMF0sIGxvbmdpdHVkZTogcG9zMVsxXSB9O1xuXG5sZXQgdG9rZW46IGFueSA9IGZhbHNlO1xuXG5sZXQgbG9jOiBMb2NhbGl6ZTtcblxuYmVmb3JlKGZ1bmN0aW9uICgpIHtcblxuICAgIGxvYyA9IG5ldyBMb2NhbGl6ZSh7IHJlbW90ZTogcmVtb3RlIH0pXG59KVxuXG5kZXNjcmliZShcInRlc3QgcmVtb3RlIHNlcnZlclwiLCBmdW5jdGlvbiAoKSB7XG5cbiAgICBkZXNjcmliZShcImNsYXNzIGluc3RhbnRpYXRpb24gd2l0aCBzdGFuZGFyZHNcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBpdChcInZhbGlkYXRlIHdvcmxkREIgY29uZlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBleHBlY3QobG9jLndvcmxkKS50by5iZS5hbignQXJyYXknKTtcbiAgICAgICAgICAgIGV4cGVjdChsb2MucmVtb3RlKS50by5iZS5hKCdzdHJpbmcnKTtcbiAgICAgICAgICAgIGV4cGVjdChsb2MucmVtb3RlKS50by5lcShyZW1vdGUpO1xuICAgICAgICAgICAgZXhwZWN0KGxvYy5iaWdXb3JsZCkudG8ubm90LmV4aXN0O1xuICAgICAgICAgICAgZXhwZWN0KGxvYy5sb2NhbGl6YXRpb24pLnRvLm5vdC5leGlzdDtcbiAgICAgICAgICAgIGV4cGVjdChsb2Muc3RhdGUpLnRvLm5vdC5leGlzdDtcbiAgICAgICAgICAgIGV4cGVjdChsb2MpLnRvLmJlLm9rO1xuICAgICAgICAgICAgZXhwZWN0KGxvYykudG8uYmUuYW4oJ09iamVjdCcpO1xuICAgICAgICB9KVxuICAgIH0pXG5cbiAgICBkZXNjcmliZShcInBvc2l0aW9uIGlzIG9rP1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudGltZW91dCgzMDAwMCk7XG5cbiAgICAgICAgaXQoXCJ2ZXJpZmljYXRlIHdvcmtpbmcgb2YgbG9jYWxpemF0aW9uXCIsIGZ1bmN0aW9uIChkb25lKSB7XG5cbiAgICBzdXBlcmFnZW50LmdldChcImh0dHBzOi8vZW1uZXRzZXJ2ZXIua2VybmVsLm9ubGluZS9hdXRoL2F1dGhvcml6ZS9jb3VjaGRiL3Rlc3RlbW5ldC90ZXN0ZW1uZXQwMTAxXCIpLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgZG9uZShFcnJvcihlcnIpKTtcbiAgICAgICAgfSBlbHNlIGlmIChyZXMgJiYgcmVzLmJvZHkgJiYgIXJlcy5ib2R5LmVycm9yKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IHJlcy5ib2R5O1xuXG4gICAgICAgICAgICB0b2tlbiA9IG9iai50b2tlbjtcblxuICAgICAgICAgICAgbG9jLnNldFBvc2l0aW9uKGxhdGxuZywgdG9rZW4pLnRoZW4oKGMpID0+IHtcblxuICAgICAgICAgICAgICAgIGV4cGVjdChsb2Muc3RhdGUpLnRvLmJlLmFuKCdPYmplY3QnKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoYykudG8uYmUuYW4oJ0FycmF5Jyk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGNbMF0pLnRvLmJlLmFuKCdPYmplY3QnKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY1swXS5uYXRpdmVOYW1lKS50by5iZS5hKCdzdHJpbmcnKTtcbiAgICAgICAgICAgICAgICBkb25lKClcbiAgICAgICAgICAgIH0pLmNhdGNoKChjKSA9PiB7XG4gICAgICAgICAgICAgICAgZG9uZShFcnJvcihjKSlcbiAgICAgICAgICAgIH0pXG5cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9uZShFcnJvcihyZXMuYm9keS5lcnJvcikpXG4gICAgICAgIH1cbiAgICB9KVxuXG5cbiAgICAgICAgfSlcbiAgICAgICAgaXQoXCJ2ZXJpZmljYXRlIHdvcmtpbmcgb2YgMiBsb2NhbGl6YXRpb25cIiwgZnVuY3Rpb24gKGRvbmUpIHtcblxuXG4gICAgc3VwZXJhZ2VudC5nZXQoXCJodHRwczovL2VtbmV0c2VydmVyLmtlcm5lbC5vbmxpbmUvYXV0aC9hdXRob3JpemUvY291Y2hkYi90ZXN0ZW1uZXQvdGVzdGVtbmV0MDEwMVwiKS5lbmQoKGVyciwgcmVzKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIGRvbmUoRXJyb3IoZXJyKSk7XG4gICAgICAgIH0gZWxzZSBpZiAocmVzICYmIHJlcy5ib2R5ICYmICFyZXMuYm9keS5lcnJvcikge1xuXG4gICAgICAgICAgICBjb25zdCBvYmogPSByZXMuYm9keTtcblxuICAgICAgICAgICAgdG9rZW4gPSBvYmoudG9rZW47XG5cbiAgICAgICAgICAgIGxvYy5zZXRQb3NpdGlvbihsYXRsbmcyLCB0b2tlbikudGhlbigoYykgPT4ge1xuXG4gICAgICAgICAgICAgICAgZXhwZWN0KGxvYy5zdGF0ZSkudG8uYmUuYW4oJ09iamVjdCcpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjKS50by5iZS5hbignQXJyYXknKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY1swXSkudG8uYmUuYW4oJ09iamVjdCcpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjWzBdLm5hdGl2ZU5hbWUpLnRvLmJlLmEoJ3N0cmluZycpO1xuICAgICAgICAgICAgICAgIGRvbmUoKVxuICAgICAgICAgICAgfSkuY2F0Y2goKGMpID0+IHtcbiAgICAgICAgICAgICAgICBkb25lKEVycm9yKGMpKVxuICAgICAgICAgICAgfSlcblxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb25lKEVycm9yKHJlcy5ib2R5LmVycm9yKSlcbiAgICAgICAgfVxuICAgIH0pXG5cblxuXG4gICAgICAgIH0pXG4gICAgfSlcbn0pIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
