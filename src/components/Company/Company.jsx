import React, { useState, useEffect,useRef } from "react";
import CompanyForm from "./CompanyForm";
import CompanyCard from "./CompanyCard";


const Company = () => {
    const [details, setDetails] = useState([]);
    const formRef = useRef();

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
    const handleAddCompanyClick = () => {
        formRef.current.scrollIntoView({ behavior: "smooth" });
    };
    return (
        <div className="bg-sky-900 pt-[7rem] pb-[4rem] text-center text-3xl text-white">
            
            <p className="uppercase px-20 pb-5">Company
            <div className="flex justify-center items-center mt-4">
                <hr className="w-[8rem]" />
            </div></p>
            <div className="text-right mr-10 md:mr-64">
            <button className="border p-2 rounded-2xl bg-white text-sky-800 font-bold uppercase text-sm align-end justify-end items-end justify-end" onClick={handleAddCompanyClick}>Add Company</button>
          </div>
            {renderCompanyCards()}
            <div ref={formRef}>
                <CompanyForm addCompany={addCompany} />
            </div>
        </div>
    );
};

export default Company;
