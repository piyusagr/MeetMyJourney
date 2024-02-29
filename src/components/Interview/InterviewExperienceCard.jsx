import React from "react";
import { Link } from "react-router-dom";
// {`/company/${encodeURIComponent(name)}/interviewexperience/${encodeURIComponent(profile)}`}
const InterviewExperienceCard = ()=>{//{name,profile,body,user}) => {
    return (
        <Link to="#" className="text-lg text-blue-500 mx-10 hover:text-blue-700" >
            <div className="bg-white align-middle text-sky-700 rounded-2xl  justify-between  p-7 mb-11 shadow-md w-[20rem] mr-6 h-80">
                <h2 className="text-3xl font-bold mb-2 capitalize">front end</h2>
                <h2 className="text-l font-bold mb-2 ">By : piyush</h2>
                <p className="text-gray-600 text-xl">bfudbvibiubeibfvif eofbvk c </p> 
                 {/* {body.slice(0, 60) + (body.length > 60 ? " ..." : "")}</p> */}
            </div>
        </Link>
    );
};

export default InterviewExperienceCard;
