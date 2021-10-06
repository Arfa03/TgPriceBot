const { Telegraf } = require("telegraf");
const {MenuTemplate, MenuMiddleware} = require('telegraf-inline-menu');
const rp = require('request-promise');

const botprice = new Telegraf(process.env.BOTPRICE_TOKEN);
const chatprice_id = process.env.CHATPRICE_ID;
const apikey = process.env.APICMC_KEY;
const app = new Telegraf(process.env.BOTPRICE_TOKEN);


/////////////////////////////////////////////////////////////////////////////////////////////////
botprice.start(ctx => {})

setInterval(() => {getdata()}, 600000)

function getdata(){
const requestOptions = {
  method: 'GET',
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
  qs: {
    'symbol': 'CIV',
    'convert': 'USD'
  },
  headers: {
    'X-CMC_PRO_API_KEY': apikey
  },
  json: false,
  gzip: false
};

rp(requestOptions).then(response => {
  var cmc = JSON.parse(response);
  var price = cmc.data.CIV.quote.USD.price;
  var volume = cmc.data.CIV.quote.USD.volume_24h;
  var percent = cmc.data.CIV.quote.USD.percent_change_7d;
  var marketcap = cmc.data.CIV.quote.USD.market_cap;
  const pricetrim = price.toString();
  const priceresult = Number(pricetrim.slice(0, 5));
  var volumetrim = parseInt(volume)
  var resultvolumetrim = (volumetrim).toLocaleString()              // for numeric input
  const percenttrim = percent.toString();
  const percentresult = Number(percenttrim.slice(0, 4));
  var marketcaptrim = parseInt(marketcap)
  var resultmarketcaptrim = (marketcaptrim).toLocaleString()              // for numeric input

  var message = ('Civilization stats:\n\r'
                 + 'Price: ' + '$' + priceresult 
                 + '\n\rVolume: ' + '$' + resultvolumetrim 
                 + '\n\rPercent7d: ' + percentresult + '%' 
                 + '\n\rMarketcap: ' + '$' + resultmarketcaptrim);
  
    app.telegram.sendMessage(chatprice_id, message)
  
})
}

////////////////////////////////////////////////////////////////////////////////////////////////
botprice.launch() 