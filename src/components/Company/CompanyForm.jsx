import React, { useState } from "react";

const CompanyForm = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");


    return (
        <div className="text-white py-10 bg-sky-900 ">
            <div className="border w-50  mx-10 my-20 pb-10 rounded-2xl">
                <p className="mt-[-1rem] ml-8 px-3 md:ml-[30rem] w-70 align-center text-center  absolute uppercase text-center text-2xl font-extrabold bg-sky-900">Company Details</p>
                <form className="flex flex-col">
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
                            required
                        />
                    </div>
                    <button className="align-center text-center justify-center rounded-3xl border-6 p-2 ml-[6rem] sm:ml-[15rem] md:ml-[30rem] mt-6 bg-white text-sky-950 font-bold w-20 text-xl" type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CompanyForm;