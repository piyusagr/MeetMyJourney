import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function TechUpdate() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=e05783cf47d541f8b29a3ed6ef00d092");
                setData(response.data.articles);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="mt-10 py-10 px-4 text-center bg-sky-900 items-center align-middle">
            <h1 className="text-yellow-400 text-3xl font-bold mb-6">Tech Update</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((newsItem, index) => (
                    <Link key={index} to={newsItem.url} className="text-lg text-blue-500 hover:text-blue-700">
                        <div className="bg-white text-indigo-800 rounded-2xl p-7 shadow-md hover:shadow-lg h-[30rem] ">
                            <img src={newsItem.urlToImage} alt="News Thumbnail" className="w-[50vh] h-[40vh] object-cover mb-4 rounded-lg mx-auto" />
                            <h2 className="text-xl font-bold mb-2">{newsItem.title}</h2>
                            <p className="text-gray-600">
                                {newsItem.description?.length > 0 ? (
                                    newsItem.description.length > 60 ? (newsItem.description.slice(0, 60) + " ...") : newsItem.description
                                ) : (
                                    "No description available"
                                )}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
