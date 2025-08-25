import { useEffect, useState } from "react";

export default function StockTable() {
    const [stockData, setStockData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/stock")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch stock data");
                return res.json();
            })
            .then((data) => {
                setStockData(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="text-white">Loading stocks...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-700 text-left">
                <thead className="bg-gray-800 text-white">
                <tr>
                    <th className="px-4 py-2 border-b">Ticker</th>
                    <th className="px-4 py-2 border-b">Name</th>
                    <th className="px-4 py-2 border-b">Price ($)</th>
                </tr>
                </thead>
                <tbody className="bg-gray-900 text-white">
                {stockData.map((stock, index) => (
                    <tr
                        key={index}
                        className="hover:bg-gray-700 transition-colors"
                    >
                        <td className="px-4 py-2 border-b">{stock.ticker}</td>
                        <td className="px-4 py-2 border-b">{stock.name}</td>
                        <td className="px-4 py-2 border-b">{stock.price.toFixed(2)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
