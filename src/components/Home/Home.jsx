import React, { useState } from "react";

const Home = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [password, setPassword] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(email);
        setIsEmailValid(isValid);
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
        } else {
            console.log("Invalid email or password. Please check your input.");
        }
    };

    return (
        <div className="flex flex-col items-start justify-between w-full h-full bg-indigo-800 px-5 py-[20vh]">
            <p className="font-bold px-5 py-5 mx-5 my-5 text-3xl uppercase text-yellow-400">
                Sign Up Now
                <br />
                <span className="text-white">to View Our Page</span>
            </p>
            <p className="font-bold text-l px-5 mx-5 text-white">
                You all will get to know about <br /> the company interview experience
            </p>

            <form className="px-5 mx-5 py-5 my-5 text-l text-center text-yellow-950 md:text-xl" onSubmit={handleSubmit}>
                <div className="font-bold text-xl text-yellow py-2 flex flex-col md:flex-row">
                    <div>
                        <label htmlFor="name" className=" px-5 text-yellow-400">NAME : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    </div>
                    <div>
                        <input
                            type="text"
                            className="rounded-full px-4 uppercase py-2"
                            value={name}
                            name="name"
                            placeholder="Enter the name"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="font-bold text-xl text-yellow py-2 flex flex-col md:flex-row">
                    <div>
                        <label htmlFor="mail" className=" px-5 text-yellow-400 text-center justify-between">EMAIL :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    </div>
                    <div>
                        <input
                            type="email"
                            className={`rounded-full px-4 uppercase py-2 ${isEmailValid ? "" : "border-red-500"}`}
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
                            <p className="text-red-500 text-sm">Please enter a valid email address.</p>
                        )}
                    </div>
                </div>
                <div className="font-bold text-xl text-yellow py-2 flex flex-col md:flex-row">
                    <div>
                        <label className=" px-5 text-yellow-400 text-center">PASSWORD :</label>
                    </div>
                    <div>
                        <input
                            type="password"
                            className={`rounded-full px-5 md:px-4 uppercase py-2 ${isPasswordValid ? "" : "border-red-500"}`}
                            value={password}
                            placeholder="Enter the password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setIsPasswordValid(true);
                            }}
                            required
                        />
                        {!isPasswordValid && (
                            <p className="text-red-700 text-sm">
                                Password should contain at least one uppercase letter, one lowercase letter,
                                one number, one special character, and be at least 8 characters long.
                            </p>
                        )}
                    </div>
                </div>
                <div className="font-bold text-xl text-yellow py-2 flex flex-col md:flex-row">
                    <div>
                        <label className=" px-5 text-yellow-400 uppercase">REPASSWORD :</label>
                    </div>
                    <div>
                        <input
                            type="password"
                            className={`rounded-full px-4 uppercase py-2 ${isConfirmPasswordValid ? "" : "border-red-500"}`}
                            value={confirmPassword}
                            placeholder="Reenter the password"
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setIsConfirmPasswordValid(true);
                            }}
                            required
                        />
                        {!isConfirmPasswordValid && (
                            <p className="text-red-700 text-sm">Passwords do not match.</p>
                        )}
                    </div>
                </div>
                <button type="submit" className="bg-yellow-400 text-gray-800 rounded-full px-6 py-2 mt-4 border px-5 justify-between items-center">
                    Sign Up
                </button>
            </form>
        </div>
    );
    
};

export default Home;
