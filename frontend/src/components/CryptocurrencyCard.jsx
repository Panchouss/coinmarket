import {Card} from "antd";
import numberWithCommas from "../utils.js";


function CryptocurrencyCard(props) {
  const { currency } = props

  const priceChangeColor = currency.quote.USD.percent_change_24h > 0 ? 'text-green-400' : 'text-red-400'
  const formattedPrice = numberWithCommas(Math.round(currency.quote.USD.price))
  const formattedMarketCap = numberWithCommas(Math.round(currency.quote.USD.market_cap/1_000_000_000))
  const priceChange = Math.round(100 * currency.quote.USD.percent_change_24h) / 100

  const price = Math.round(currency.quote.USD.price)

  return (
    <div>
      <Card
        title={
          <div className="flex items-center gap-3">
            <img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${currency.id}.png`} alt='logo' className="w-10 h-10"/>
            <p className="text-lg md:text-2xl">{currency.name}</p>
          </div>
        }
        variant="borderless"
        // style={{
        //   width: 700,
        //   height: 340,
        //   'box-shadow': '0 3px 10px rgb(0,0,0,0.2)',
        // }}
        className="w-full max-w-md mx-auto text-sm md:text-xl shadow-lg rounded-2xl"
      >
        <p>Текущая цена: {formattedPrice}$</p>
        <span>Изменение цены за 24 часа: </span>
        <span className={priceChangeColor}>
        {priceChange}%
      </span>
        <p>Текущая капитализация: ${formattedMarketCap}B</p>
      </Card>
    </div>
  )
}

export default CryptocurrencyCard