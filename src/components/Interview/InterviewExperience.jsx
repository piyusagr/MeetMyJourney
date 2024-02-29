import React from "react";
import { useParams } from "react-router-dom";
import InterviewExperienceCard from "./InterviewExperienceCard";

const InterviewExperience = () => {
    const { companyName } = useParams();

    return (
        <div className="bg-sky-900 pt-[7rem] pb-[4rem] text-center text-3xl text-white">
            <p className="pt-20 text-center text-3xl uppercase font-bold text-yellow-400">{companyName}</p>
            <hr className="w-[25vh] mx-auto my-2 border-t-2 mb-[10vh]" />
            <InterviewExperienceCard/>
        </div>
    );
};

export default InterviewExperience;
