import * as _ from "lodash";

let geo = require("geolib");

interface IBoundary {

    latitude: number;
    longitude: number;

}

interface IGeocodes {
    name: string;
    provinces: IGeo[];
    cities: ICity[]
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
    boundaries: IBoundary[];
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




export default class Localize {
    world: IGeobuild[];

    constructor(world?: IGeobuild[]) {
        if (world) this.loadWorld(world)
    }

    loadWorld(world: IGeobuild[]) {
        this.world = world;
    }

    downloadWorld(o: { url: string }) {

    }

    loadState(state: Istate) {

    }


    downloadState(o: { url: string }) {

    }


    getStateFromPosition(o:{state:string,latitude:number,longitude:number}){



    }

    getPosition(o: { latitude: number, longitude: number, state?: string }) {

        if (!(o && o.latitude && o.longitude)) throw Error("Error");

        let pos = { latitude: o.latitude, longitude: o.longitude };

        let _this = this;
        let State: Istate;
        if (o.state && _this.getState(o.state)) {
            State = <Istate>_this.getState(o.state)
            console.log('ss');



        } else {
            console.log('todo');

            throw Error("todo");


        }


        // livello nazionale
        let allprovinces = _this.getProvincesFromState(State.name);


        _.map(allprovinces, function (c) {
            c.distance = geo.getDistance({ latitude: c.latitude, longitude: c.longitude }, pos);

        })


        let reprov = _.take(_.orderBy(allprovinces, ['distance'], ['asc']), 2);

        let provinces = [];
        _.map(reprov, function (c: ICity) {

            _.map(_this.getCitiesFromProvinces(c.nativeName, State.name), function (p) {
                p.distance = geo.getDistance({ latitude: p.latitude, longitude: p.longitude }, pos);

                provinces.push(p)
            })

        })


        let cities: ICity[] = <ICity[]>_.take(_.orderBy(provinces, ['distance'], ['asc']), 2);

        if (cities[0].distance * 1.4 > cities[0].distance) {
            cities = [cities[0]]
        }

        return cities


    }


    getLocation(o: { city: string, state?: string }) {
        return true

    }

    getinfo(o: { city: string, state?: string }) {
        return true
    }

    getState(state: string, o?: { continent?: string }): Istate | boolean {


        let exists = false;

        let answer;

        let _this = this;

        if (!_this.world) {
            console.error("no world");
            return false
        }

        _.map(_this.world, function (continent) {

            _.map(continent.subcontinents, function (subcontinent) {

                _.map(subcontinent.countries, function (country) {

                    _.map(country.states, function (s) {
                        console.log(s.name)
                        if (s.name === state) {
                            exists = true;
                            answer = s
                        }


                    })

                    if (!exists) {
                        answer = false

                    }
                })

            })

        })


        return answer

    }

    getProvincesFromState(state) {

        let _this = this;
        let State: Istate;

        if (state) {
            State = <Istate>_this.getState(state)

        } else {
            throw Error("todo");

        }

        let provinces: ICity[] = [];
        _.map(State.regions, function (r) {
            _.map(r.cities, function (c) {

                provinces.push(c)

            })

        })


        return provinces

    }

    getCitiesFromProvinces(city, state?: string) {

        let _this = this;
        let State: Istate;

        if (state) {
            State = <Istate>_this.getState(state)

        } else {
            throw Error("todo");

        }

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

}