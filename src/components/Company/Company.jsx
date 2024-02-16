import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CompanyForm from "./CompanyForm";


const CompanyCard = ({ id, name, description, logo }) => {
    return (
        <div className="bg-white text-indigo-800 rounded-2xl p-7 mb-11 shadow-md w-[20rem] mr-6 h-80">
            <img src={logo} alt={`${name} Logo`} className="w-20 h-20 object-cover rounded-full mx-auto mb-4 bg-sky-900 text-white" />
            <h2 className="text-2xl font-bold mb-2 uppercase">{name}</h2>
            <p className="text-gray-600 text-xl">{description.slice(0, 60) + (description.length > 60 ? " ..." : "")}</p>
            <Link to={`/company/${name}`} className="text-lg text-blue-500 hover:text-blue-700">
                View More
            </Link>
        </div>
    );
};

const Company = () => {
    const [details, setDetails] = useState([]);
    // const [showForm, setShowForm] = useState(false);

    // const navigate = useNavigate();
    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/api/companies/");
            if (response.ok) {
                const data = await response.json();
                setDetails(data);
            } else {
                console.error("Failed to fetch companies");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const addCompany = (company) => {
        setDetails([...details, company]);
        // setShowForm(false);
    };

    const renderCompanyCards = () => {
        const rows = [];
        for (let i = 0; i < details.length; i += 3) {
            const row = details.slice(i, i + 3);
            rows.push(
                <div key={i} className="flex flex-col md:flex-row justify-center items-center mt-11">
                    {row.map((company, index) => (
                        <CompanyCard key={index} {...company} />
                    ))}
                </div>
            );
        }
        return rows;
    };

    return (
        <div className="bg-sky-900 pt-[7rem] pb-[4rem] text-center text-3xl text-white">
            <p className="uppercase">Company</p>
            <div className="flex justify-center items-center mt-4">
                <hr className="w-[8rem]" />
            </div>
            {renderCompanyCards()}
            <CompanyForm addCompany={addCompany} />
        </div>
    );
};

export default Company;
