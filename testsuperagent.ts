
import * as superagent from "superagent";




superagent.get("https://couchdb.kernel.online/public/geoworld").end(function (err, res) {
    if (err || !res.ok) {

        console.error("err", err)

    } else {
        console.log("oki", res.body)

    }
})