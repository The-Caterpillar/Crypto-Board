const CoinCard = ({ coin }) => {
  return (
    <>
      <div>
        <div className="coin-card" >
          <div className="coin-header">
            <img src={coin.image} alt={coin.name} className="coin-image" />
            <div>
              <h2>{coin.name}</h2>
              <p className="symbol">{coin.symbol?.toUpperCase()}</p>
              <p>Price: {coin.current_price?.toLocaleString("en-IN")}</p>
              <p className={ coin.price_change_percentage_24h >= 0  ? "positive" : "negative" }>
                Price change %(24h): {coin.price_change_percentage_24h?.toFixed(2)}%
              </p>
              <p>Market Cap: {coin.market_cap?.toLocaleString("en-IN")}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoinCard;
