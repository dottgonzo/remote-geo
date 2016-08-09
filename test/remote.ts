import Localize from '../index'
import * as mocha from "mocha";

const expect = require("chai").expect;

const remote = "https://emnetserver.kernel.online/position";

const pos0 = [37.533057, 15.060421]
const pos1 = [37.504192, 15.068489]

const latlng = { latitude: pos0[0], longitude: pos0[1] };
const latlng2 = { latitude: pos1[0], longitude: pos1[1] };


let loc: Localize;

before(function () {
    loc = new Localize({ remote: remote })
})
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

        })


    })

    describe("position is ok?", function () {
        this.timeout(30000);

        it("verificate working of localization", function (done) {
            loc.setPosition(latlng).then((c) => {

                expect(loc.state).to.be.an('Object');
                expect(c).to.be.an('Array');
                expect(c[0]).to.be.an('Object');
                expect(c[0].nativeName).to.be.a('string');
                done()
            }).catch((c) => {
                done(Error(c))

            })
        })
        it("verificate working of 2 localization", function (done) {

            loc.setPosition(latlng2).then((c) => {

                expect(loc.state).to.be.an('Object');
                expect(c).to.be.an('Array');
                expect(c[0]).to.be.an('Object');
                expect(c[0].nativeName).to.be.a('string');
                done();

            }).catch((c) => {

                done(Error(c))

            })



        })
    })
})