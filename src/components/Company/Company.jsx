import React from "react";
import { Link } from "react-router-dom";
import { PlusCircleOutlined } from '@ant-design/icons';
import acer from '/public/logo/acer.png';
import amazon from '/public/logo/amazon.png';
import { useNavigate } from "react-router-dom";

const CompanyCard = ({ id, name, description, logo }) => {
    return (
        <div className="bg-white text-indigo-800 rounded-2xl p-7 mb-11 shadow-md w-[20rem] mr-6 h-80">
            <img src={logo} alt={`${name} Logo`} className="w-40 h-16 object-cover rounded-full mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">{name}</h2>
            <p className="text-gray-600 text-xl">{description.slice(0, 60) + (description.length > 60 ? " ..." : "")}</p>
            <Link to={`/company/${name}`} className="text-lg text-blue-500 hover:text-blue-700">
                View More
            </Link>
        </div>
    );
};

const Company = () => {
    const details = [
        { id: 1, name: "Acer", description: "Acer Inc. is a Taiwanese multinational hardware and electronics corporation specializing in advanced electronics technology", logo: acer },
        { id: 2, name: "Amazon", description: "Amazon is a multinational company that sells books, music, movies, and many other goods online123. It is the world's largest online marketplace, AI assistant provider, live-streaming platform and cloud computing platform", logo: amazon },
    ];
    const navigate = useNavigate();

    return (
        <div className="bg-sky-900 pt-[7rem] pb-[4rem] text-center text-3xl text-white">
            <p className="uppercase">Company</p>
            <div className="flex justify-center items-center mt-4">
                <hr className="w-[8rem]" />
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center mt-11">
                {details.map((company, index) => (
                    <CompanyCard key={index} {...company} />
                ))}
                <PlusCircleOutlined
                    className="text-white text-3xl mt-4 "
                    onClick={() => navigate('/companydetail/form')}
                />
            </div>
        </div>
    );
};

export default Company;
