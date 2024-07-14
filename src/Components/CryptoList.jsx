'use client';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Link from 'next/link';
import Navbar from '@/Components/NavBar'
 
const CryptoList = () => {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
 
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
 
    const filteredData = data.filter((crypto) => {
        return crypto.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
 
    return (
        <>
            <Navbar />
            <div className="container">
                <h1 className="my-4 text-success"></h1>
                <input
                    type="text"
                    placeholder="Search crypto name"
                    className="form-control mb-4"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th scope='col'>Name</th>
                            <th scope='col'>Symbol</th>
                            <th scope='col'>Price</th>
                            <th scope='col'>Market Cap</th>
                            <th scope='col'>1h change</th>
                            <th scope='col'>24h change</th>
                            <th scope='col'>7D Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((crypto) => (
                            <tr key={crypto.id}>
                                <td className='flex justify-start'>
                                    <img src={crypto.image} alt={crypto.name} className="rounded-circle mr-2" style={{ width: '30px', height: '30px' }}/>
                                    <Link href={`/crypto/${crypto.id}`}
                                        style={{
                                            textDecoration: 'none',
                                            color: 'inherit'
                                        }}>
                                        {crypto.name}
                                    </Link>
                                </td>
                                <td>{crypto.symbol.toUpperCase()}</td>
                                <td>${crypto.current_price.toFixed(2)}</td>
                                <td>${crypto.market_cap.toLocaleString('en-US')}</td>
                                <td style={{
                                    color: crypto.price_change_percentage_1h_in_currency < 0 ? 'red' : 'green'
                                }}>
                                    {Number(
                                        crypto.price_change_percentage_1h_in_currency
                                    ).toFixed(2)}%</td>
                                <td style={{
                                    color: crypto.price_change_percentage_24h_in_currency < 0 ? 'red' : 'green'
                                }}>
                                    {Number(
                                        crypto.price_change_percentage_24h_in_currency
                                    ).toFixed(2)}%</td>
                                <td style={{
                                    color: crypto.price_change_percentage_7d_in_currency < 0 ? 'red' : 'green'
                                }}>
                                    {Number(
                                        crypto.price_change_percentage_7d_in_currency
                                    ).toFixed(2)}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};
 
export default CryptoList;