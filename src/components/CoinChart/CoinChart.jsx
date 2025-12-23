import {Line} from "react-chartjs-2";
import { useState, useEffect } from "react";
import Spinner from "../Spinner/Spinner";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale,
    Ticks,
    Filler
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale,
    Filler
);

const COIN_API_URL = import.meta.env.VITE_COIN_API_URL;

const CoinChart = ({coinID}) => {
    const [chartData,setChartData] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);


    useEffect(()=>{
        const fetchPrices = async () => {
            try{
                const res = await fetch(`${COIN_API_URL}/${coinID}/market_chart?vs_currency=inr&days=7`);
                if(!res.ok) throw new Error("failed to fetch data");
                const data = await res.json(); 
                console.log(data);

                const prices = data.prices.map((price) => ({
                    x:price[0],
                    y:price[1]
                }));

                setChartData({
                    datasets: [
                        {
                            label: 'Price (INR)',
                            data: prices,
                            fill: true,
                            borderColor: '#007bff',
                            backgroundColor: 'rgba(0,123,255,0.1)',
                            pointRadius: 0,
                            tension: 0.3,
                        },
                    ]
                });
            }
            catch(e){
                setError(e.message);
            }
            finally{
                setLoading(false)
            }
        }
    fetchPrices();
    },[])

    return (<>
    {loading && <Spinner/>}
    {error && <p>{error}</p>}
     {!error && !loading && <div style={{marginTop: '30px'}}>
        <Line data={chartData} options={{
            responsive: true,
            plugins: {
                legend: {display: false},
                tooltip: {mode: 'index', intersect: false}
            },
            scales: {
                x:{
                    type: 'time',
                    time: {
                        unit: 'day'
                    },
                    ticks:{
                        autoSkip: true,
                        maxTicksLimit: 7
                    }
                },
                y: {
                    ticks: {
                        callback: (value) => `$${value.toLocaleString()}`
                    }
                }
            }
        }}/>
    </div>}
    </>)
}

export default CoinChart