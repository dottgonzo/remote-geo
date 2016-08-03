import * as _ from "lodash";


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

}


interface INation {
continent:string;
subcontinent:string;
country:string;
state:Istate;
}

export default class {
    constructor(state:INation){

    }
}