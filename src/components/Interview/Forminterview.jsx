import React, { useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "axios";

const FormInterview = ({ companyName, addProfile }) => {
    const [profilename, setProfilename] = useState("");
    const [application, setApplication] = useState("");
    const [interview, setInterview] = useState("");
    const [interviewquestion, setInterviewQuestion] = useState("");
    const [offer, setOffer] = useState(false);
    const [easy, setEasy] = useState(false);
    const [medium, setMedium] = useState(false);
    const [hard, setHard] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:8000/api/api/companies/${companyName}/interviews/`, {
                companyName,
                profilename,
                application,
                interview,
                interviewquestion,
                offer,
                easy,
                medium,
                hard,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": Cookies.get("csrftoken"),
                },}
            );

            if (response.ok) {
                const data = await response.json();
                addProfile(data);
                toast.success("Interview Experience added successfully", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                console.error("Failed to add interview experience");
                toast.error("Failed to add Interview Experience", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }

            // Reset form fields
            setProfilename("");
            setApplication("");
            setInterview("");
            setInterviewQuestion("");
            setOffer(false);
            setEasy(false);
            setHard(false);
            setMedium(false);
        } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred. Please try again.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <div className="text-white py-10 bg-sky-900 w-full">
            <div className="border w-auto mx-3 md:mx-10  my-20 pb-10 rounded-2xl">
                <div className="justify-between text-center">
                    <p className="mt-[-1rem] ml-8 px-3 md:ml-[30rem] w-70 align-center text-center absolute uppercase  text-2xl font-extrabold bg-sky-900">
                        Experience Details
                    </p>
                </div>
                <form className="flex flex-col text-center justify-center" method="POST" onSubmit={handleSubmit}>
                    <table className="w-full justify-center text-center">
                        <tbody>
                    <tr className="flex flex-col md:flex-row pt-28 justify-center ">
                     <td className="justify-between md:text-right  pt-3 ">
                     <label htmlFor="companyname">Company Name</label>
                     </td>
                     <td className="justify-between pl-10 ">
                     <input
                                     type="text"
                                        id="companyname"
                                        className="px-4 py-2 uppercase mt-3 text-lg w-[18rem] md:w-[20rem] align-middle justify-between text-sky-800 font-bold rounded-2xl ml-[2rem] sm:ml-[8rem] md:ml-[10rem]"
                                        value={companyName}
                                        disabled
                                    />
                                </td>
                            </tr>
                            <tr className="flex flex-col md:flex-row pt-5 justify-center ">
                                <td className="justify-between md:text-right  pt-3">
                                    <label htmlFor="profilename">Profile Name</label>
                                </td>
                                <td className="justify-between md:ml-20">
                                    <input
                                        type="text"
                                        id="profilename"
                                        className="px-4 py-2 mt-3 text-lg w-[18rem] md:w-[20rem] align-middle justify-between text-sky-800 font-bold rounded-2xl ml-[2rem] sm:ml-[8rem] md:ml-[10rem]"
                                        placeholder="Profile interviewed for "
                                        value={profilename}
                                        onChange={(e) => setProfilename(e.target.value)}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr className="flex flex-col md:flex-row pt-[2rem] justify-center">
                                <td className="md:text-right justify-between md:pt-20">
                                    <label htmlFor="application">Application</label>
                                </td>
                                <td className="justify-between md:ml-24">
                                    <textarea
                                        id="application"
                                        className="px-4 py-2 mt-3 text-lg w-[18rem] md:w-[20rem] h-[10rem] align-middle justify-between text-sky-800 font-bold rounded-2xl ml-[2rem] sm:ml-[8rem] md:ml-[10rem]"
                                        placeholder="enter job location and applied through (referal /offcampus /oncampus)"
                                        value={application}
                                        onChange={(e) => setApplication(e.target.value)}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr className="flex flex-col md:flex-row pt-[2rem] justify-center">
                                <td className="justify-between md:text-right md:pt-20">
                                    <label htmlFor="interview">Interview Process</label>
                                </td>
                                <td className=" text-center justify-between md:ml-5">
                                    <textarea
                                        id="interview"
                                        className="px-4 py-2 mt-3 text-lg w-[18rem] md:w-[20rem] h-[10rem] align-middle justify-between text-sky-800 font-bold rounded-2xl ml-[2rem] sm:ml-[8rem] md:ml-[10rem]"
                                        placeholder="enter no. of rounds and brief them"
                                        value={interview}
                                        onChange={(e) => setInterview(e.target.value)}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr className="flex flex-col md:flex-row pt-[2rem] justify-center">
                                <td className="text-center justify-between md:text-right md:pt-20">
                                    <label htmlFor="question">Interview Question</label>
                                </td>
                                <td className=" text-center justify-between">
                                    <textarea
                                        id="question"
                                        className="px-4 py-2 mt-3 text-lg w-[18rem] md:w-[20rem] h-[10rem] align-middle justify-between text-sky-800 font-bold rounded-2xl ml-[2rem] sm:ml-[8rem] md:ml-[10rem]"
                                        placeholder="enter questions asked"
                                        value={interviewquestion}
                                        onChange={(e) => setInterviewQuestion(e.target.value)}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr className="flex flex-row pt-[2rem]  text-center justify-around">
                                <td className="text-center justify-center md:text-right  pt-2 ml-5">
                                    <label htmlFor="offer">Offer</label>
                                </td>
                                <td className=" text-center justify-between ml-20">
                                    <input
                                        type="checkbox"
                                        id="offer"
                                        className="px-4 py-2 mt-3 text-lg w-[4rem] h-[2rem] rounded-full align-middle justify-between text-sky-800 font-bold  ml-[2rem] sm:ml-[8rem] md:ml-[10rem]"
                                        value={offer}
                                        onChange={(prevoffer) => setOffer(!prevoffer)}
                                    //   required
                                    />
                                </td>
                            </tr>
                            <tr className="flex flex-row   text-left justify-left md:pl-44">
                                <td className="text-left   pt-2 ml-8">
                                    <label htmlFor="interviewtype">Interview Label</label>
                                </td>
                            </tr>
                            <tr className="flex flex-row text-center justify-around">
                                <td className="text-center justify-center md:text-right pt-2 ml-9">
                                    <label htmlFor="Easy">Easy</label>
                                </td>
                                <td className="text-center justify-between ml-16">
                                    <input
                                        type="radio"
                                        id="Easy"
                                        name="interviewType"
                                        className="px-4 py-2 mt-3 text-lg w-[4rem] h-[2rem] rounded-full align-middle justify-between text-sky-800 font-bold ml-[2rem] sm:ml-[8rem] md:ml-[10rem]"
                                        checked={easy}
                                        onChange={() => {
                                            setEasy(true);
                                            setMedium(false);
                                            setHard(false);
                                        }}
                                        required
                                    />

                                </td>
                            </tr>
                            <tr className="flex flex-row text-center justify-around">
                                <td className="text-center justify-center md:text-right pt-2 ml-9">
                                    <label htmlFor="medium">Medium</label>
                                </td>
                                <td className="text-center justify-between ml-3">
                                    <input
                                        type="radio"
                                        id="medium"
                                        name="interviewType"
                                        className="px-4 py-2 mt-3 text-lg w-[4rem] h-[2rem] rounded-full align-middle justify-between text-sky-800 font-bold ml-[2rem] sm:ml-[8rem] md:ml-[10rem]"
                                        checked={medium}
                                        onChange={() => {
                                            setEasy(false);
                                            setMedium(true);
                                            setHard(false);
                                        }}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr className="flex flex-row text-center justify-around">
                                <td className="text-center justify-center md:text-right pt-2 ml-9">
                                    <label htmlFor="hard">Hard</label>
                                </td>
                                <td className="text-center justify-between ml-[4rem]">
                                    <input
                                        type="radio"
                                        id="hard"
                                        name="interviewType"
                                        className="px-4 py-2 mt-3 text-lg w-[4rem] h-[2rem] rounded-full align-middle justify-between text-sky-800 font-bold ml-[2rem] sm:ml-[8rem] md:ml-[10rem]"
                                        checked={hard}
                                        onChange={() => {
                                            setEasy(false);
                                            setMedium(false);
                                            setHard(true);
                                        }}
                                        required
                                    />
                                </td>
                            </tr>

                        </tbody>
                    </table>
                    <div className="text-center my-8">
                        <button
                            className="text-center justify-between rounded-3xl border-6 p-3 mt-6 bg-white text-sky-950 font-bold w-30 uppercase text-xl"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
);
};

export default FormInterview;
