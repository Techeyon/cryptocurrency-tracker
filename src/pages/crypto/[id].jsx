import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '@/Components/Navbar';
 
const CryptoDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const [cryptoData, setCryptoData] = useState(null);
 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
                setCryptoData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        if (id) {
            fetchData();
        }
    }, [id]);
 
    if (!cryptoData) {
        return <div className="container">Loading...</div>;
    }
 
    // Extract description up to the first period (.)
    const description = cryptoData.description.en.split('.')[0];
 
    return (
        <>
            <Navbar />
            <div className="container mt-5 d-flex justify-content-center">
                <div className="card">
                    <img src={cryptoData.image.small}
                        className="card-img-top img-fluid" alt=""
                        style={{ maxWidth: '200px' }} />
                    <div className="card-body">
                        <h1 className="card-title">{cryptoData.name}</h1>
                        <h5 className="card-text">{description}</h5>
                        <p className="card-text">
                            <b>Symbol:</b>
                            {cryptoData.symbol.toUpperCase()}
                        </p>
                        <p className="card-text">
                            <b>Rank:</b>
                            {cryptoData.market_cap_rank}
                        </p>
                        <p className="card-text">
                            <b>Market Cap:</b>
                            {cryptoData.market_data.market_cap.usd}
                        </p>
                        <p className="card-text">
                            <b>Current Price:</b>
                            {cryptoData.market_data.current_price.inr}
                        </p>
                        <p className="card-text">
                            <b>Total Supply:</b>
                            {cryptoData.market_data.total_supply}
                        </p>
                        <p className="card-text">
                            <b>Market Cap Change (24h):</b>
                            {cryptoData.market_data.market_cap_change_percentage_24h}%
                        </p>
                        <p className="card-text">
                            <b>High (24h):</b>
                            {cryptoData.market_data.high_24h.inr}
                        </p>
                        <p className="card-text">
                            <b>Low (24h):</b>
                            {cryptoData.market_data.low_24h.inr}
                        </p>
                        <p className="card-text">
                            <b>Total Volume (24h):</b>
                            {cryptoData.market_data.total_volume.inr}
                        </p>
                        <p className="card-text">
                            <b>Circulating Supply:</b>
                            {cryptoData.market_data.circulating_supply}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
 
};
 
export default CryptoDetails;