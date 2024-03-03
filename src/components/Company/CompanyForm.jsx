import React, { useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CompanyForm = ({ addCompany }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [Logourl, setLogourl] = useState("");

    const fetchLogo = async (companyName) => {
        try {
            const response = await axios.get(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${companyName}`);
            console.log(response.data);

            if (response.data.length > 0) {
                const companyData = response.data[0];
                console.log("Company Data:", companyData);

                if (companyData.logo) {
                    console.log("Setting Logo URL:", companyData.logo);
                    setLogourl(companyData.logo);

                    console.log("Updated Logo State:", Logourl);
                } else {
                    console.error("No logo found in the API response");
                }
            } else {
                console.error("No data found in the API response");
            }
        } catch (error) {
            console.error("Error fetching logo:", error);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await fetchLogo(name);

            const response = await fetch("http://localhost:8000/api/api/companies/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // 'X-CSRFToken': Cookies.get('csrftoken'),
                },
                body: JSON.stringify({ name, description, logo: Logourl }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.logo)
                addCompany(data);
                toast.success('Company Added', {
                    position: "top-right",
                    autoClose: true,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

            } else {
                console.error("Failed to add company");
                toast.warn('Company Already Listed', {
                    position: "top-right",
                    autoClose: true,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
            setName("");
            setDescription("");
            setLogourl("");
        } catch (error) {
            console.error("Error:", error);
            toast.warn("Failed To Add", {
                position: "top-right",
                autoClose: true,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };
    return (
        <div className="text-white py-10 bg-sky-900 ">
            <div className="border w-50  mx-10 my-20 pb-10 rounded-2xl">
                <p className="mt-[-1rem] ml-8 px-3 md:ml-[30rem] w-70 align-center text-center  absolute uppercase  text-2xl font-extrabold bg-sky-900">Company Details</p>
                <form className="flex flex-col" onSubmit={handleSubmit} method="POST">
                    <div className="flex flex-col md:flex-row text-center mt-10 text-xl ">
                        <label htmlFor="companyname" className="md:ml-[15rem] mt-4">Company Name :</label>
                        <input
                            type="text"
                            id="companyname"
                            className="px-4 py-2 mt-3 text-lg w-[15rem] sm:w-[20rem] align-middle justify-between text-sky-800 font-bold rounded-2xl ml-[2rem] sm:ml-[8rem] md:ml-[10rem]"
                            placeholder="enter company name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col md:flex-row text-center mt-3 text-xl">
                        <label htmlFor="companydesc" className="md:ml-[12rem] xl:ml-[20rem] mt-4">Company Description :</label>
                        <textarea
                            id="companydesc"
                            className="px-4 py-2 mt-3 text-lg w-[15rem] sm:w-[20rem] align-middle justify-between text-sky-800 font-bold rounded-2xl ml-[2rem] sm:ml-[8rem] md:ml-[10rem]"
                            placeholder="enter company description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}

                        />
                    </div>
                    <div className="flex flex-col md:flex-row text-center mt-3 text-xl">
                        <label htmlFor="logourll" className="md:ml-[15.5rem] xl:ml-[26rem] mt-4">Company Logo :</label>
                        <input type="text"
                            id="logourll"
                            className="px-4 py-2 mt-3 text-lg w-[15rem] sm:w-[20rem] align-middle justify-between text-sky-800 font-bold rounded-2xl ml-[2rem] sm:ml-[8rem] md:ml-[10rem]"
                            placeholder="company logo"
                            value={Logourl}
                            onChange={fetchLogo(name)}

                        />
                    </div>
                    <button className="align-center text-center justify-center rounded-3xl border-6 p-2 ml-[6rem] sm:ml-[15rem] md:ml-[30rem] mt-6 bg-white text-sky-950 font-bold w-20 text-xl" type="submit">Submit</button>
                </form>
            </div>
            <ToastContainer className="text-xl" />
        </div>
    )
}

export default CompanyForm;
