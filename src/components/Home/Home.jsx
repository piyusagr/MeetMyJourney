import React, { useState } from "react";
import homeimg from "/public/home.jpeg";
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import './home.css';
import { useNavigate, Link } from "react-router-dom";


const Home = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [password, setPassword] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
    const [visiblepassword, setVisiblePassword] = useState(false)
    const [visibleConpassword, setVisibleConPassword] = useState(false)
    const navigate = useNavigate();

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(email);
        setIsEmailValid(isValid);
    };

    const handlevisibility = () => {
        setVisiblePassword(!visiblepassword)
    };

    const handlevisibilityConf = () => {
        setVisibleConPassword(!visibleConpassword)
    };

    const validatePassword = () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const isValid = passwordRegex.test(password);
        setIsPasswordValid(isValid);
    };

    const validateConfirmPassword = () => {
        setIsConfirmPasswordValid(password === confirmPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        validateEmail();
        validatePassword();
        validateConfirmPassword();

        if (isEmailValid && isPasswordValid && isConfirmPasswordValid) {
            console.log("Form submitted:", { name, email, password });
            localStorage.setItem('user', JSON.stringify({ name, email, password }));
            navigate("/login");

        }
        else {
            console.log("Invalid email or password. Please check your input.");
        }
        setName("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")

    };

    const handleSignIn = ()=>{
        navigate("/login");
    };

    return (
        <>
            <div className='shadow-md w-full fixed top-0 left-0 bg-indigo-900'>
                <div className='items-center flex flex-row justify-between  py-4 md:px-10 px-7'>
                    <div className='font-bold text-2xl cursor-pointer text-yellow-400 flex items-center font-[Poppins] text-gray-800'>
                        <span className='text-3xl text-indigo-600 mr-1 pt-2'>
                            <ion-icon name="logo-ionic"></ion-icon>
                        </span>
                        Logo
                    </div>

                </div>
            </div>
            <div className="flex flex-col bg-indigo-800 px-4 w-full">
                <div className="flex flex-col md:flex-row items-start justify-between w-full h-full bg-indigo-800 px-5 py-[20vh]">
                    <div
                        className="font-bold flex-col flex text-lg md:text-2xl text-center sm:w-[120vh]  px-6"
                    >
                        <h1 className="text-2xl md:text-4xl text-yellow-300 pb-4 pt-8 font-extrabold">Your Success Starts Here</h1>
                        <p className="text-white font-semibold pb-3">Prepare, Perform, and Prosper in your interviews. Empower Yourself with knowledge, build confidence and step into each interview with the assurance that you are well-equipped to succeed.</p>
                        <p className="text-white font-bold py-2">Join us today and unlock a world of opportunities!!</p>

                    </div>
                    <div className="overflow-hidden relative items-center text-center justify-center  pl-5 pt-9 mt-18">
                        <img
                            src={homeimg}
                            alt="Home"
                            className="object-cover mx-5 items-centerjustify--between transform  border border-spacing-4 skew-y-6 rounded-2xl my-[20vh]"
                        />
                    </div>

                </div>


                <div className="border border-spacing-36 md:ml-[45vh] py-5 mb-10 mt-[-30vh] md:mt-[-22vh] py-5 rounded-2xl md:w-[150vh] items-center text-center">
                    <form
                        className="px-5 mx-5  text-l  bg-transparent   text-center justify-center items-center  text-yellow-950 md:text-xl"
                        onSubmit={handleSubmit}
                    >
                        <div className="font-bold text-xl items-center text-yellow py-2 flex flex-col md:flex-row">
                            <div>
                                <label htmlFor="name" className=" px-5  text-yellow-400">NAME : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    className="rounded-full px-5 py-2"
                                    value={name}
                                    name="name"
                                    placeholder="Enter the name"
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="font-bold text-xl text-yellow py-2 items-center flex flex-col md:flex-row">
                            <div>
                                <label htmlFor="mail" className=" px-5 text-yellow-400 text-center justify-between">EMAIL :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            </div>
                            <div>
                                <input
                                    type="email"
                                    className={`rounded-full px-4 py-2 ${isEmailValid ? "" : "border-red-500"}`}
                                    value={email}
                                    name="mail"
                                    placeholder="Enter the email"
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setIsEmailValid(true);
                                    }}
                                    required
                                />
                                {!isEmailValid && (
                                    <p className="text-red-500 text-sm"> Please enter a valid email address.</p>
                                )}
                            </div>
                        </div>
                        <div className="font-bold text-xl items-center text-yellow py-2 flex flex-col md:flex-row">
                            <div>
                                <label className=" px-5 text-yellow-400 text-center">PASSWORD : &nbsp;&nbsp;&nbsp;&nbsp;</label>
                            </div>
                            <div >
                                <input
                                    type={visiblepassword ? "text" : "password"}
                                    className={`rounded-full px-5 w-15 md:px-4  py-2 ${isPasswordValid ? "" : "border-red-500"}`}
                                    value={password}
                                    placeholder="Enter the password"
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setIsPasswordValid(true);
                                    }}
                                    required
                                />
                                <span onClick={handlevisibility} className=" bg-white rounded-full px-4 py-3  items-center ">
                                    {visiblepassword && password.length > 0 ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                </span>

                                {!isPasswordValid && (
                                    <p className="text-red-700 text-sm">
                                        Password should contain at least one uppercase letter, one lowercase letter,
                                        one number, one special character, and be at least 8 characters long.
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="font-bold text-xl items-center text-yellow py-2 flex flex-col md:flex-row">
                            <div>
                                <label className=" px-5 text-yellow-400 uppercase">REPASSWORD : </label>
                            </div>
                            <div>
                                <input
                                    type={visibleConpassword ? "text" : "password"}
                                    className={`rounded-full px-4  py-2 ${isConfirmPasswordValid ? "" : "border-red-500"}`}
                                    value={confirmPassword}
                                    placeholder="Re-enter the password"
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        setIsConfirmPasswordValid(true);
                                    }}
                                    required
                                />
                                <span onClick={handlevisibilityConf} className=" bg-white rounded-full px-4 py-3  items-center ">
                                    {visibleConpassword && password.length > 0 ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                </span>
                                {!isConfirmPasswordValid && (
                                    <p className="text-red-700 text-sm">Passwords do not match.</p>
                                )}
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="bg-yellow-400 font-extrabold text-indigo-700 rounded-full px-6 py-2 mt-4 border px-5 justify-between items-center"
                        >
                            Sign Up
                        </button>
                    </form>
                    <p className="font-bold text-lg text-white pt-4">OR</p>
                    <button
                        type="submit"
                        className="bg-yellow-400 font-extrabold text-indigo-700 rounded-full px-6 py-2 mt-4 border px-5 justify-between items-center"  
                         onClick={handleSignIn}                      
                    >
                        Sign In
                    </button>
                    
                </div>
            </div>
        </>
    );
};

export default Home;