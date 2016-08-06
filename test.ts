import Localize from "./index";


const loc = new Localize();

const pos=[37.533057, 15.060421]

console.log(loc.getCountryFromPosition({ latitude: pos[0], longitude: pos[1] }))


