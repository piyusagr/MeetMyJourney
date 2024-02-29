import React from "react";
import { Link } from "react-router-dom";

const CompanyCard = ({ id, name, description, logo }) => {
    return (
        <Link to={`/company/${encodeURIComponent(name)}`} className="text-lg text-blue-500 hover:text-blue-700" >
            <div className="bg-white text-indigo-800 rounded-2xl p-7 mb-11 shadow-md w-[20rem] mr-6 h-80">
                <img src={logo} alt={`${name} Logo`} className="w-20 h-20 object-cover rounded-full mx-auto mb-4 bg-sky-900 text-white" />
                <h2 className="text-2xl font-bold mb-2 uppercase">{name}</h2>
                <p className="text-gray-600 text-xl">{description.slice(0, 60) + (description.length > 60 ? " ..." : "")}</p>

            </div>
        </Link>
    );
};

export default CompanyCard;
