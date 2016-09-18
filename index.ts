import * as _ from "lodash";

const geo = require("geolib");

import * as Promise from "bluebird";


import * as superagent from "superagent";


interface IBoundary { //wrong
    latitude: number;
    longitude: number;
}

interface IGeocodes {
    name: string;
    provinces: IGeo[];
    cities: ICity[];
}



interface ICity {
    nativeName: string;
    latitude: number;
    longitude: number;
    zipcode: number;
    cityCode: string;
    state: string;
    country: string;
    isoLang: string;
    tz: string;
    currency: string;
    currencySymbol: string;
    distance?: number;
    subcontinent: string;
    continent: string;
    region: string;
}

interface IGeo {
    nativeName: string;
    zipcode: string;
    cities: ICity[];
    main: ICity;
    latitude: number;
    longitude: number;
}


interface Istate {
    regions: IGeocodes[];
    boundaries: IBoundary[];
    capital: ICity;
    nativeName: string;
    latlng: number[];
    isoLang: string[];
    name: string;
    tz: string;
    country: string;
    subcontinent: string;
    continent: string;
}

interface ICountry {
    states: Istate[];
    name: string;
    boundaries: IBoundary[][];
    nativeName: string;
    capital: ICity;
    currencies: string[];
    isoLang: string[];
    latlng: number[];
    tz: string;
    subcontinent: string;
    continent: string;
}

interface ISubcontinent {
    name: string;
    countries: ICountry[];
    boundaries: IBoundary[];
    continent: string;
}

interface IGeobuild {
    name: string;
    subcontinents: ISubcontinent[];
    boundaries: IBoundary[];
}


interface ILocalization {
    latitude: number;
    longitude: number;
}

const w: IGeobuild[] = require("./onlyworld.json");


function loadbBigWorldfromremotedb(url): Promise<IGeobuild[]> {
    return new Promise<IGeobuild[]>((resolve, reject) => {

        let bigWorld: IGeobuild[];

        superagent.get(url).end(function (err, res) {
            if (err || !res.ok) {

                reject(err)

            } else {
                bigWorld = res.body.continents;
                resolve(bigWorld)
            }
        })
    })

}

function loadcountryremotely(url: string, countryName: string, token?: string): Promise<ICountry> {
    return new Promise<ICountry>((resolve, reject) => {

        let country: ICountry;
        if (token) {
            function bearer(request) {
                request.set('Authorization', 'Bearer ' + token);
            }
            superagent.get(url + "/country/" + countryName).use(bearer).end(function (err, res) {
                if (err || !res.ok) {
                    reject(err)
                } else {
                    country = res.body;
                    resolve(country)
                }
            })
        } else {
            superagent.get(url + "/country/" + countryName).end(function (err, res) {
                if (err || !res.ok) {
                    reject(err)
                } else {
                    country = res.body;
                    resolve(country)
                }
            })
        }

    })
}




export default class Localize {
    bigWorld: IGeobuild[];
    state: Istate;
    world: IGeobuild[];
    remote: string;
    worldDB: string;
    localization: ILocalization;

    constructor(o: { world?: IGeobuild[], bigWorld?: IGeobuild[], remote?: string, worldDB?: string, state?: Istate }) {
        if (!o) throw Error("no conf");


        if (o.bigWorld) {
            this.bigWorld = o.bigWorld;
            this.world = w;

        } else {

            if (o.state) this.state = o.state;

            if (o && o.world) {
                this.world = o.world
            } else {
                this.world = w
            }

            if (o && o.remote) {
                this.remote = o.remote
            } else if (o && o.worldDB) {
                this.worldDB = o.worldDB
            }


        }

    }

    getCountryFromPosition(o: ILocalization): ICountry {

        let pos: ILocalization = { latitude: o.latitude, longitude: o.longitude };

        let _this = this;
        let exists = false;
        let c: ICountry;
        let centers = [];

        _.map(_this.world, function (continent) {
            _.map(continent.subcontinents, function (subcontinent) {

                _.map(subcontinent.countries, function (country) {

                    _.map(country.boundaries, function (area) {
                        if (!c) {

                            if (typeof area[0][0] !== "object") {



                                if (geo.isPointInside(pos, area)) {
                                    exists = true;
                                    c = country;

                                } else {
                                    centers.push({ nation: country.name, distance: geo.getDistance(geo.getCenterOfBounds(area), pos) })
                                }


                            } else {


                                _.map(area, function (a) {

                                    if (geo.isPointInside(pos, a)) {
                                        exists = true;
                                        c = country;

                                    } else {
                                        centers.push({ nation: country.name, distance: geo.getDistance(geo.getCenterOfBounds(a), pos) })
                                    }

                                })
                            }
                        }
                    })


                })

            })

        })

        if (!exists) {
            let dist: any = false;
            _.map(centers, function (co) {
                if (!dist || co.distance < dist.distance) {
                    dist = co
                }

            })

            _.map(_this.world, function (continent) {
                _.map(continent.subcontinents, function (subcontinent) {
                    _.map(subcontinent.countries, function (country) {
                        if (dist.nation == country.name) {
                            c = country
                        }
                    })
                })
            })

        }
        return c
    }


    checkifInsideState(pos: ILocalization): ICity[] | boolean {
        let _this = this;
        if (!this.state) throw Error("no state set");

        let position = this.getPositionFromState(pos, _this.state);

        if (position[0].distance < 20000) {
            return position
        } else {
            return false
        }
    }


    reloadCurrentState(pos: ILocalization, token?: string) { //todo
        let _this = this;
        return new Promise<ICity[]>((resolve, reject) => {

            _this.getStates(pos, token).then((s) => {
                _this.localization = pos;
                _this.state = s;
                resolve(_this.getPositionFromState(pos));
            }).catch((err) => {
                reject(err);
            })



        })
    }

    setPosition(pos: ILocalization, token?: string): Promise<ICity[]> {
        let _this = this;
        return new Promise<ICity[]>((resolve, reject) => {
            if (!(pos && pos.latitude && pos.longitude)) {
                reject("No coords provided");
            } else {

                if (_this.state) {
                    const checkifInsideState = _this.checkifInsideState(pos)
                    if (checkifInsideState) {
                        _this.localization = pos;
                        resolve(<ICity[]>checkifInsideState);
                    } else {
                        _this.reloadCurrentState(pos, token).then((s) => {
                            resolve(s);
                        }).catch((err) => {
                            reject(err);
                        })
                    }
                } else {
                    _this.reloadCurrentState(pos, token).then((s) => {
                        resolve(s);
                    }).catch((err) => {
                        reject(err);
                    })
                }
            }
        })
    }



    getPositionFromState(pos: ILocalization, State?: Istate): ICity[] {
        let _this = this;

        // livello nazionale
        let allprovinces: ICity[] = _this.getProvincesFromState(State);

        _.map(allprovinces, function (c) {
            c.distance = geo.getDistance({ latitude: c.latitude, longitude: c.longitude }, pos);
        })


        let reprov = _.take(_.orderBy(allprovinces, ['distance'], ['asc']), 2);

        let provinces = [];
        _.map(reprov, function (c: ICity) {

            _.map(_this.getCitiesFromProvinces(c.nativeName, State), function (p) {
                p.distance = geo.getDistance({ latitude: p.latitude, longitude: p.longitude }, pos);
                provinces.push(p)
            })

        })


        let cities: ICity[] = <ICity[]>_.take(_.orderBy(provinces, ['distance'], ['asc']), 10);


        return cities

    }


    getLocation(o: { city: string, state?: string }) {
        return true

    }

    getinfo(o: { city: string, state?: string }) {
        return true
    }


    getStateFromCountry(pos: ILocalization, country: ICountry): Istate {

        let state: Istate;


        if (country.states.length === 1) {
            state = country.states[0]
        } else {
            console.log("todo")

        }


        return state
    }


    getFullCountry(countryName: string, token?: string) {
        let _this = this;

        return new Promise<ICountry>((resolve, reject) => {

            let exists: any = false;


            if (_this.bigWorld) {
                _.map(_this.bigWorld, function (continent) {

                    _.map(continent.subcontinents, function (subcontinent) {

                        _.map(subcontinent.countries, function (c) {
                            if (c.name === countryName) {
                                exists = c;
                            }
                        })
                    })
                })
                if (!exists) {
                    reject("no country")
                } else {
                    resolve(exists)

                }
            } else if (_this.remote) {

                loadcountryremotely(_this.remote, countryName, token).then((co) => {
                    resolve(co)
                }).catch((err) => {
                    reject(err)
                })

            } else if (_this.worldDB) {
                loadbBigWorldfromremotedb(_this.worldDB).then((world) => {
                    _.map(world, function (continent) {
                        _.map(continent.subcontinents, function (subcontinent) {
                            _.map(subcontinent.countries, function (c) {
                                if (c.name === countryName) {
                                    exists = c;
                                }
                            })
                        })
                    })
                    if (!exists) {
                        reject("no country")
                    } else {
                        resolve(exists)

                    }

                }).catch((err) => {
                    reject(err)
                })
            }

        })
    }


    getStates(pos: ILocalization, token?: string): Promise<Istate> {
        let _this = this;

        return new Promise<Istate>((resolve, reject) => {
            const country = _this.getCountryFromPosition(pos);

            _this.getFullCountry(country.name, token).then((c) => {
                resolve(_this.getStateFromCountry(pos, c))
            }).catch((err) => {
                reject(err)
            })
        })
    }

    getProvincesFromState(state?: Istate): ICity[] {
        let _this = this;
        let State: Istate = _this.state;

        if (state) State = state


        let provinces: ICity[] = [];

        _.map(State.regions, function (r) {
            _.map(r.cities, function (c) {
                provinces.push(c)
            })
        })


        return provinces

    }

    getCitiesFromProvinces(city: string, state?: Istate): ICity[] {
        let _this = this;
        let State: Istate = this.state;

        if (state) State = state

        let provinces: ICity[] = [];
        _.map(State.regions, function (r) {
            _.map(r.provinces, function (p) {
                if (p.main.nativeName === city) {
                    _.map(p.cities, function (c) {

                        provinces.push(c)


                    })
                }


            })

        })


        return provinces

    }


    calc(pos0: IBoundary, pos1: IBoundary): number {
        return geo.getDistance(pos0, pos1)
    }

}