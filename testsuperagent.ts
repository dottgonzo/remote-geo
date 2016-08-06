
import * as superagent from "superagent";




        superagent.get(path + "/portfolio").auth(auth.user,auth.password).end(function (err,res) {
            if (err || !res.ok) {

            console.error(err)
  
   } else{
            let portfolio = res.body.stocks;
            that.addStocks(portfolio)
     }