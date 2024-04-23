// InterviewExperience.jsx
import {useState, useRef, useEffect} from "react";
import { useParams } from "react-router-dom";
import InterviewExperienceCard from "./InterviewExperienceCard";
import FormInterview from "./Forminterview";
// import { toast } from "react-toastify"; // Make sure to import the necessary modules

const InterviewExperience = () => {
    const { companyName} = useParams();
    const [details, setDetails] = useState([]);
    useEffect(() => {
        fetchExperience();
    }, []);

    const fetchExperience = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/api/companies/${companyName}/interviews`);
            if (response.ok) {
                const data = await response.json();
                setDetails(data);
                console.log(data)

            } else {
                console.error("Failed to fetch companies");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const addProfile = (profile) => {
        setDetails([...details, profile]);
    };

    const formRef = useRef();

    const renderInterviewCards = () => {
        const rows = [];
        for (let i = 0; i < details.length; i += 3) {
            const row = details.slice(i, i + 3);
            rows.push(
                <div key={i} className="flex flex-col md:flex-row justify-center items-center mt-11">
                    {row.map((profile, index) => (
                        <InterviewExperienceCard key={index} {...profile} />
                    ))}
                </div>
            );
        }
        return rows;
    };

    const handleAddExperienceClick = () => {
        formRef.current.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="bg-sky-900 pt-[7rem] pb-[4rem] text-center text-3xl text-white w-full">
            <p className="pt-15 text-center text-3xl uppercase font-bold text-yellow-400">{companyName}</p>
            <hr className="w-[25vh] mx-auto my-2 border-t-2 mb-[10vh]" />
            <div className="justify-end text-right -mt-10 pr-3 md:pr-[40vh]">
                <button className="border p-2 rounded-full bg-white font-bold text-sky-900 text-lg" onClick={handleAddExperienceClick}>
                    Add Experience
                </button>
            </div>
            {renderInterviewCards()}
            <div ref={formRef}>
                <FormInterview companyName={companyName} addProfile={addProfile} />
            </div>
        </div>
    );
};

export default InterviewExperience;
