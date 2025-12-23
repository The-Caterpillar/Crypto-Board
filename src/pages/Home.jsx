
import CoinCard from '../components/CoinCard/CoinCard'
import LimitSelector from "../components/LimitSelector/LimitSelector";
import Filter from "../components/Filter/Filter";
import SortBy from "../components/SortBy/SortBy";
import Loader from "../components/Loader/Loader";


const HomePage = ({
    filter, limit, sortBy, setFilter, setSortBy, setLimit,
    coins, error, loading
}) => {

const filteredCoins = coins.filter((coin) => {
    return (
      coin.name?.toLowerCase().includes(filter.toLowerCase()) ||
        coin.symbol?.toLowerCase().includes(filter.toLowerCase())
  )})
  .slice()
  .sort((a,b) => {
    switch (sortBy) {
      case 'market_cap_desc':
        return b.market_cap - a.market_cap;
      case 'market_cap_asc' :
        return a.market_cap - b.market_cap;
      case 'price_desc' :
        return b.current_price - a.current_price;
      case 'price_asc' :
        return a.current_price - b.current_price;
      case 'change_desc' :
        return b.price_change_percentage_24h - a.price_change_percentage_24h;
      case 'change_asc' :
        return a.price_change_percentage_24h - b.price_change_percentage_24h;
    }
  });

    return ( <>
    
      <div>
        <h1>🚀 Crypto Dashboard </h1>
        {loading && <Loader />}
        {error && <div className="error">{error}</div>}

        <div className="top-controls">
          <Filter value={filter} onFilterChange={setFilter} />
          <LimitSelector limit={limit} onLimitChange={setLimit} />
          <SortBy sortBy={sortBy} onSortChange={setSortBy} />
        </div>

        {!loading && !error && (
          <main className="grid">
            {filteredCoins.map((coin) => (
                <CoinCard coin={coin} key={coin.id} />
              ))}
          </main>
        )}
      </div>
    </> );
}

export default HomePage;