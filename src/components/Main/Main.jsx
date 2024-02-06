import React from "react";
import photo from '/public/main.jpg';

const Main = () => {
    return(
        <div className="bg-sky-900 flex flex-col md:flex-row h-full w-full px-10 py-10 my-10 text-yellow-300">
            <div 
                className="font-bold flex-col flex text-lg md:text-2xl text-center sm:w-[150vh]  px-7 pt-7"
            >
                <h1 className="text-2xl md:text-4xl pb-4 pt-8 font-extrabold">Welcome to Website</h1>
                <p className="text-white font-semibold pb-3">Unlock Your Career Potential with Seamless Interview Experience</p>
                <p className="text-white font-bold py-2">Embark on a journey of career growth and success. We understand that the interview process is a crucial step in achieving your professional aspirations. That's why we've crafted an innovative platform to enhance and simplify your interview experiences.</p>
            </div>
            <div className="overflow-hidden relative items-center text-center justify-center pl-5 ">
                <img
                    src={photo}
                    alt="interview"
                    className="object-cover  items-centerjustify--between transform  border border-spacing-4 skew-y-6 rounded-2xl my-[20vh]"
                />
            </div>
            
        </div>
    )
}

export default Main;