import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner/Spinner";
import CoinChart from "../components/CoinChart/CoinChart";

const COIN_API_URL = import.meta.env.VITE_COIN_API_URL;

const CoinDetailsPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const res = await fetch(`${COIN_API_URL}${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch Coin data.");
        }
        const data = await res.json(); // ✅ await
        setCoin(data);
      } catch (e) {
        setError(e.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
  }, [id]);

  return (
    <>
      <div className="coin-details-container">
        <Link to="/">🏠 Home</Link>

        <h1 className="coin-details-title">
          {coin ? `${coin.name} (${coin.symbol.toUpperCase()})` : "Coin Details"}
        </h1>

        {loading && <Spinner/>}
        {error && <div className="error">❌{error}</div>}

        {!loading && !error && coin && (
          <>
            <img
              src={coin.image.large}
              alt={coin.name}
              className="coin-details-image"
            />

            <p>{coin?.description?.en?.split(". ")[0] + "."}</p>

            <div className="coin-details-info">
              <h3>Rank: #{coin?.market_cap_rank ?? "—"}</h3>

              <h3>
                Current Price: ₹
                {coin?.market_data?.current_price?.inr?.toLocaleString(
                  "en-IN"
                ) ?? "—"}{" "}
                | 💲
                {coin?.market_data?.current_price?.usd?.toLocaleString(
                  "en-US"
                ) ?? "—"}
              </h3>

              <h4>
                Market Cap: ₹
                {coin?.market_data?.market_cap?.inr?.toLocaleString("en-IN") ??
                  "—"}
              </h4>

              <h4>
                24h High: ₹
                {coin?.market_data?.high_24h?.inr?.toLocaleString("en-IN") ??
                  "—"}
              </h4>

              <h4>
                24h Low: ₹
                {coin?.market_data?.low_24h?.inr?.toLocaleString("en-IN") ??
                  "—"}
              </h4>

              <h4>
                24h Price Change: ₹
                {coin?.market_data?.price_change_24h?.toFixed(2) ?? "—"} (
                {coin?.market_data?.price_change_percentage_24h?.toFixed(2) ??
                  "—"}
                %)
              </h4>

              <h4>
                Circulating Supply:{" "}
                {coin?.market_data?.circulating_supply?.toLocaleString(
                  "en-IN"
                ) ?? "—"}
              </h4>

              <h4>
                Total Supply:{" "}
                {coin?.market_data?.total_supply?.toLocaleString("en-IN") ??
                  "—"}
              </h4>

              <h4>
                All-Time High: ₹
                {coin?.market_data?.ath?.inr?.toLocaleString("en-IN") ?? "—"}
              </h4>

              <h4>
                All-Time Low: ₹
                {coin?.market_data?.atl?.inr?.toLocaleString("en-IN") ?? "—"}
              </h4>
              <h4>
                Last Updated: {new Date(coin?.last_updated)?.toLocaleDateString()}
              </h4>
            </div>

            <CoinChart coinID={coin.id}/>

            <div className="coin-details-links">
                {coin?.links?.homepage[0] && (
                    <p>🌐{' '}
                    <a href={coin?.links?.homepage[0]} target="_blank" rel="noopener noreferrer">
                        {coin.name}
                    </a>
                    </p>
                )}
                {coin?.links?.blockchain_site[0] && (
                    <p>🧩{' '}
                    <a href={coin?.links?.blockchain_site[0]} target="_blank" rel="noopener noreferrer">
                        Blockchain Explorer
                    </a>
                    </p>
                )}
                {coin.categories.length > 0 && (
                    <p> Categories: {coin.categories.join(', ')}</p>
                )}
            </div>
          </>
        )}
        {!loading && !error && !coin && <p> No Data Found</p>}
      </div>
    </>
  );
};

export default CoinDetailsPage;
