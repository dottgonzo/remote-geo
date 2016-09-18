"use strict";
var index_1 = require('../index');
var italy = require("./italy.json");
var expect = require("chai").expect;
var worldDB = "https://couchdb.kernel.online/public/geoworld";
var pos0 = [37.533057, 15.060421];
var pos1 = [37.504192, 15.068489];
var latlng = { latitude: pos0[0], longitude: pos0[1] };
var latlng2 = { latitude: pos1[0], longitude: pos1[1] };
var loc;
before(function () {
    loc = new index_1.default({ state: italy, worldDB: worldDB });
});
describe("test local geo server", function () {
    describe("class instantiation with standards", function () {
        it("validate worldDB conf", function () {
            expect(loc.world).to.be.an('Array');
            expect(loc.state).to.eq(italy);
            expect(loc.bigWorld).to.not.exist;
            expect(loc.localization).to.not.exist;
            expect(loc.state).to.be.an('Object');
            expect(loc).to.be.ok;
            expect(loc).to.be.an('Object');
        });
    });
    describe("position is ok?", function () {
        this.timeout(30000);
        it("verificate working of localization", function (done) {
            loc.setPosition(latlng).then(function (c) {
                expect(loc.state).to.be.an('Object');
                expect(c).to.be.an('Array');
                expect(c[0]).to.be.an('Object');
                expect(c[0].nativeName).to.be.a('string');
                done();
            }).catch(function (c) {
                done(Error(c));
            });
        });
        it("verificate working of 2 localization", function (done) {
            loc.setPosition(latlng2).then(function (c) {
                expect(loc.state).to.be.an('Object');
                expect(c).to.be.an('Array');
                expect(c[0]).to.be.an('Object');
                expect(c[0].nativeName).to.be.a('string');
                done();
            }).catch(function (c) {
                done(Error(c));
            });
        });
        it("verificate working of calc", function () {
            var calc = loc.calc({ latitude: 37.515528, longitude: 15.0849687 }, { latitude: 37.4272443, longitude: 15.0188791 });
            expect(calc).to.be.a('number');
            expect(calc).to.be.gt(0);
        });
    });
});

//# sourceMappingURL=data:application/json;base64,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QUFTLEVBQUMsVUFBVSxFQUFDLEVBQUMsRUFBQyxRQUFRLEVBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxDQUFBO1lBRXRHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUUxQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFHdEMsQ0FBQyxDQUFDLENBQUE7SUFHTixDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQyxDQUFBIiwiZmlsZSI6InRlc3QvbG9jYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTG9jYWxpemUgZnJvbSAnLi4vaW5kZXgnXG5pbXBvcnQgKiBhcyBtb2NoYSBmcm9tIFwibW9jaGFcIjtcblxubGV0IGl0YWx5ID0gcmVxdWlyZShcIi4vaXRhbHkuanNvblwiKVxuXG5cbmNvbnN0IGV4cGVjdCA9IHJlcXVpcmUoXCJjaGFpXCIpLmV4cGVjdDtcblxuY29uc3Qgd29ybGREQiA9IFwiaHR0cHM6Ly9jb3VjaGRiLmtlcm5lbC5vbmxpbmUvcHVibGljL2dlb3dvcmxkXCI7XG5cblxuY29uc3QgcG9zMCA9IFszNy41MzMwNTcsIDE1LjA2MDQyMV1cbmNvbnN0IHBvczEgPSBbMzcuNTA0MTkyLCAxNS4wNjg0ODldXG5cbmNvbnN0IGxhdGxuZyA9IHsgbGF0aXR1ZGU6IHBvczBbMF0sIGxvbmdpdHVkZTogcG9zMFsxXSB9O1xuY29uc3QgbGF0bG5nMiA9IHsgbGF0aXR1ZGU6IHBvczFbMF0sIGxvbmdpdHVkZTogcG9zMVsxXSB9O1xuXG5cbmxldCBsb2M6IExvY2FsaXplO1xuXG5iZWZvcmUoZnVuY3Rpb24gKCkge1xuXG4gICAgbG9jID0gbmV3IExvY2FsaXplKHsgc3RhdGU6IGl0YWx5LCB3b3JsZERCOiB3b3JsZERCIH0pXG5cblxufSlcbmRlc2NyaWJlKFwidGVzdCBsb2NhbCBnZW8gc2VydmVyXCIsIGZ1bmN0aW9uICgpIHtcblxuICAgIGRlc2NyaWJlKFwiY2xhc3MgaW5zdGFudGlhdGlvbiB3aXRoIHN0YW5kYXJkc1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGl0KFwidmFsaWRhdGUgd29ybGREQiBjb25mXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGV4cGVjdChsb2Mud29ybGQpLnRvLmJlLmFuKCdBcnJheScpO1xuICAgICAgICAgICAgZXhwZWN0KGxvYy5zdGF0ZSkudG8uZXEoaXRhbHkpO1xuICAgICAgICAgICAgZXhwZWN0KGxvYy5iaWdXb3JsZCkudG8ubm90LmV4aXN0O1xuICAgICAgICAgICAgZXhwZWN0KGxvYy5sb2NhbGl6YXRpb24pLnRvLm5vdC5leGlzdDtcbiAgICAgICAgICAgIGV4cGVjdChsb2Muc3RhdGUpLnRvLmJlLmFuKCdPYmplY3QnKTtcbiAgICAgICAgICAgIGV4cGVjdChsb2MpLnRvLmJlLm9rO1xuICAgICAgICAgICAgZXhwZWN0KGxvYykudG8uYmUuYW4oJ09iamVjdCcpO1xuXG4gICAgICAgIH0pXG5cblxuICAgIH0pXG5cbiAgICBkZXNjcmliZShcInBvc2l0aW9uIGlzIG9rP1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudGltZW91dCgzMDAwMCk7XG5cbiAgICAgICAgaXQoXCJ2ZXJpZmljYXRlIHdvcmtpbmcgb2YgbG9jYWxpemF0aW9uXCIsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgICBsb2Muc2V0UG9zaXRpb24obGF0bG5nKS50aGVuKChjKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBleHBlY3QobG9jLnN0YXRlKS50by5iZS5hbignT2JqZWN0Jyk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGMpLnRvLmJlLmFuKCdBcnJheScpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjWzBdKS50by5iZS5hbignT2JqZWN0Jyk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGNbMF0ubmF0aXZlTmFtZSkudG8uYmUuYSgnc3RyaW5nJyk7XG4gICAgICAgICAgICAgICAgZG9uZSgpXG4gICAgICAgICAgICB9KS5jYXRjaCgoYykgPT4ge1xuICAgICAgICAgICAgICAgIGRvbmUoRXJyb3IoYykpXG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIGl0KFwidmVyaWZpY2F0ZSB3b3JraW5nIG9mIDIgbG9jYWxpemF0aW9uXCIsIGZ1bmN0aW9uIChkb25lKSB7XG5cbiAgICAgICAgICAgIGxvYy5zZXRQb3NpdGlvbihsYXRsbmcyKS50aGVuKChjKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBleHBlY3QobG9jLnN0YXRlKS50by5iZS5hbignT2JqZWN0Jyk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGMpLnRvLmJlLmFuKCdBcnJheScpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjWzBdKS50by5iZS5hbignT2JqZWN0Jyk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGNbMF0ubmF0aXZlTmFtZSkudG8uYmUuYSgnc3RyaW5nJyk7XG4gICAgICAgICAgICAgICAgZG9uZSgpO1xuXG4gICAgICAgICAgICB9KS5jYXRjaCgoYykgPT4ge1xuXG4gICAgICAgICAgICAgICAgZG9uZShFcnJvcihjKSlcblxuXG4gICAgICAgICAgICB9KVxuXG5cblxuICAgICAgICB9KVxuXG4gICAgICAgIGl0KFwidmVyaWZpY2F0ZSB3b3JraW5nIG9mIGNhbGNcIiwgZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBjb25zdCBjYWxjPSBsb2MuY2FsYyh7bGF0aXR1ZGU6MzcuNTE1NTI4LGxvbmdpdHVkZToxNS4wODQ5Njg3fSx7bGF0aXR1ZGU6MzcuNDI3MjQ0Myxsb25naXR1ZGU6MTUuMDE4ODc5MX0pXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBleHBlY3QoY2FsYykudG8uYmUuYSgnbnVtYmVyJyk7XG4gICAgIFxuICAgICAgICAgICAgICAgICAgICAgZXhwZWN0KGNhbGMpLnRvLmJlLmd0KDApO1xuXG5cbiAgICAgICAgfSlcblxuXG4gICAgfSlcbn0pIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
