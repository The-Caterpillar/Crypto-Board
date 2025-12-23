import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";

// Page imports :
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import NotFoundPage from "./pages/NotFound";
import CoinDetailsPage from "./pages/CoinDetails";

// Component imports
import Header from "./components/Header/Header";

// APIs and URLs imports
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState('market_cap_desc');

  useEffect(() => {
    // fetch(API_URL)
    // .then((res) => {
    //   if(!res.ok)
    //   {
    //     throw new Error('failed to fetch data');
    //   }
    //   return res.json();
    // })
    // .then((data)=>{
    //   console.log(data);
    //   setCoins(data);
    //   setLoading(false);
    // })
    // .catch((e) => {
    //   setError(e.message);
    //   setLoading(false);
    // })
    const fetchCoins = async () => {
      try {
        const res = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
        );
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        // console.log(data);
        setCoins(data);
        return data;
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCoins();
  }, [limit]);


  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<HomePage
        coins={coins}
        filter={filter}
        setFilter={setFilter}
        limit={limit}
        setLimit={setLimit}
        sortBy={sortBy}
        setSortBy={setSortBy}
        loading={loading}
        error={error}
      />}/>

      <Route path="/about" element={<AboutPage/>} />
      <Route path="*" element={<NotFoundPage/>}/>
      <Route path="/coin/:id" element={<CoinDetailsPage/>}/>
    </Routes>
    </>
  );
}

export default App;
