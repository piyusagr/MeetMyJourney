// InterviewExperienceCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const InterviewExperienceCard = ({ profile_name, company, application, interview_process, interview_question, offer, easy, medium, hard }) => {
    return (
        <Link to="#" className="text-lg text-blue-500 mx-10 hover:text-blue-700">
            <div className="bg-white align-middle text-sky-700 rounded-2xl justify-between p-7 mb-11 shadow-md w-[20rem] mr-6 h-80">
                <h2 className="text-3xl font-bold mb-2 capitalize">{profile_name}</h2>
                <h2 className="text-l font-bold mb-2 ">By: {company.name}</h2>
                <p className="text-gray-600 text-xl">
                    {application.slice(0, 60) + (application.length > 60 ? " ..." : "")}
                </p>
                {/* Add other details as needed */}
            </div>
        </Link>
    );
};

export default InterviewExperienceCard;
