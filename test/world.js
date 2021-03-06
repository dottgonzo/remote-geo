"use strict";
var index_1 = require('../index');
var expect = require("chai").expect;
var bigWorld = require("./bigWorld");
var pos0 = [37.533057, 15.060421];
var pos1 = [37.504192, 15.068489];
var latlng = { latitude: pos0[0], longitude: pos0[1] };
var latlng2 = { latitude: pos1[0], longitude: pos1[1] };
var loc;
before(function () {
    loc = new index_1.default({ bigWorld: bigWorld });
});
describe("test big World", function () {
    describe("class instantiation with standards", function () {
        it("validate worldDB conf", function () {
            expect(loc.worldDB).to.not.exist;
            expect(loc.bigWorld).to.eq(bigWorld);
            expect(loc.world).to.be.an('Array');
            expect(loc.localization).to.not.exist;
            expect(loc.state).to.not.exist;
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
    });
});

//# sourceMappingURL=data:application/json;base64,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LENBQUE7WUFDVixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxDQUFDO2dCQUNQLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUVsQixDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFBO1FBQ0YsRUFBRSxDQUFDLHNDQUFzQyxFQUFFLFVBQVUsSUFBSTtZQUVyRCxHQUFHLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLENBQUM7Z0JBRTVCLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3JDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDNUIsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNoQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUMxQyxJQUFJLEVBQUUsQ0FBQztZQUVYLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFDLENBQUM7Z0JBRVAsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBRWxCLENBQUMsQ0FBQyxDQUFBO1FBSU4sQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQyxDQUFBIiwiZmlsZSI6InRlc3Qvd29ybGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTG9jYWxpemUgZnJvbSAnLi4vaW5kZXgnXG5pbXBvcnQgKiBhcyBtb2NoYSBmcm9tIFwibW9jaGFcIjtcblxuY29uc3QgZXhwZWN0ID0gcmVxdWlyZShcImNoYWlcIikuZXhwZWN0O1xuXG5jb25zdCBiaWdXb3JsZCA9IHJlcXVpcmUoXCIuL2JpZ1dvcmxkXCIpO1xuXG5jb25zdCBwb3MwID0gWzM3LjUzMzA1NywgMTUuMDYwNDIxXVxuY29uc3QgcG9zMSA9IFszNy41MDQxOTIsIDE1LjA2ODQ4OV1cblxuY29uc3QgbGF0bG5nID0geyBsYXRpdHVkZTogcG9zMFswXSwgbG9uZ2l0dWRlOiBwb3MwWzFdIH07XG5jb25zdCBsYXRsbmcyID0geyBsYXRpdHVkZTogcG9zMVswXSwgbG9uZ2l0dWRlOiBwb3MxWzFdIH07XG5cblxubGV0IGxvYzogTG9jYWxpemU7XG5cbmJlZm9yZShmdW5jdGlvbiAoKSB7XG5cbiAgICBsb2MgPSBuZXcgTG9jYWxpemUoeyBiaWdXb3JsZDogYmlnV29ybGQgfSlcblxuXG59KVxuXG5kZXNjcmliZShcInRlc3QgYmlnIFdvcmxkXCIsIGZ1bmN0aW9uICgpIHtcblxuICAgIGRlc2NyaWJlKFwiY2xhc3MgaW5zdGFudGlhdGlvbiB3aXRoIHN0YW5kYXJkc1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGl0KFwidmFsaWRhdGUgd29ybGREQiBjb25mXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGV4cGVjdChsb2Mud29ybGREQikudG8ubm90LmV4aXN0O1xuICAgICAgICAgICAgZXhwZWN0KGxvYy5iaWdXb3JsZCkudG8uZXEoYmlnV29ybGQpO1xuICAgICAgICAgICAgZXhwZWN0KGxvYy53b3JsZCkudG8uYmUuYW4oJ0FycmF5Jyk7XG4gICAgICAgICAgICBleHBlY3QobG9jLmxvY2FsaXphdGlvbikudG8ubm90LmV4aXN0O1xuICAgICAgICAgICAgZXhwZWN0KGxvYy5zdGF0ZSkudG8ubm90LmV4aXN0O1xuICAgICAgICAgICAgZXhwZWN0KGxvYykudG8uYmUub2s7XG4gICAgICAgICAgICBleHBlY3QobG9jKS50by5iZS5hbignT2JqZWN0Jyk7XG5cbiAgICAgICAgfSlcblxuXG4gICAgfSlcblxuICAgIGRlc2NyaWJlKFwicG9zaXRpb24gaXMgb2s/XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy50aW1lb3V0KDMwMDAwKTtcblxuICAgICAgICBpdChcInZlcmlmaWNhdGUgd29ya2luZyBvZiBsb2NhbGl6YXRpb25cIiwgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgICAgIGxvYy5zZXRQb3NpdGlvbihsYXRsbmcpLnRoZW4oKGMpID0+IHtcblxuICAgICAgICAgICAgICAgIGV4cGVjdChsb2Muc3RhdGUpLnRvLmJlLmFuKCdPYmplY3QnKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoYykudG8uYmUuYW4oJ0FycmF5Jyk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGNbMF0pLnRvLmJlLmFuKCdPYmplY3QnKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY1swXS5uYXRpdmVOYW1lKS50by5iZS5hKCdzdHJpbmcnKTtcbiAgICAgICAgICAgICAgICBkb25lKClcbiAgICAgICAgICAgIH0pLmNhdGNoKChjKSA9PiB7XG4gICAgICAgICAgICAgICAgZG9uZShFcnJvcihjKSlcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgaXQoXCJ2ZXJpZmljYXRlIHdvcmtpbmcgb2YgMiBsb2NhbGl6YXRpb25cIiwgZnVuY3Rpb24gKGRvbmUpIHtcblxuICAgICAgICAgICAgbG9jLnNldFBvc2l0aW9uKGxhdGxuZzIpLnRoZW4oKGMpID0+IHtcblxuICAgICAgICAgICAgICAgIGV4cGVjdChsb2Muc3RhdGUpLnRvLmJlLmFuKCdPYmplY3QnKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoYykudG8uYmUuYW4oJ0FycmF5Jyk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGNbMF0pLnRvLmJlLmFuKCdPYmplY3QnKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY1swXS5uYXRpdmVOYW1lKS50by5iZS5hKCdzdHJpbmcnKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG5cbiAgICAgICAgICAgIH0pLmNhdGNoKChjKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBkb25lKEVycm9yKGMpKVxuXG4gICAgICAgICAgICB9KVxuXG5cblxuICAgICAgICB9KVxuICAgIH0pXG59KSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
