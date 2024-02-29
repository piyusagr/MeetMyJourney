import React, { useState, useEffect } from "react";
import Tilt from 'react-parallax-tilt';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const Login = () => {
    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [password, setPassword] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [visiblePassword, setVisiblePassword] = useState(false);
    const navigate = useNavigate();
    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         try {
    //             const response = await fetch('http://localhost:8000/api/api/register', {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //             });

    //             if (response.ok) {
    //                 const data = await response.json();
    //                 setRegisteredUsers(data);
    //             } else {
    //                 console.error('Failed to fetch registered users data.');
    //             }
    //         } catch (error) {
    //             console.error('Error:', error);
    //         }
    //     };

    //     fetchUsers();
    // }, []); 

    const validateEmail = () => {
        const isValid = email.trim() !== "";
        setIsEmailValid(isValid);
        return isValid;
    };

    const handleVisibility = () => {
        setVisiblePassword(!visiblePassword);
    };

    const validatePassword = () => {
        const isValid = password.trim() !== "";
        setIsPasswordValid(isValid);
        return isValid;
    };


   
    const handleSubmit = () => {
        // const user = registeredUsers.find(user => user.email === email && user.password === password);

        
            console.log('Login successful');
            navigate("/main");
        // } else {
        //     console.error('Login failed. Invalid email or password.');
        //     // Handle invalid login
        // }

        // Clear form fields
        setEmail("");
        setPassword("");
    };
    
    return (
        <>
            <div className='shadow-md w-full fixed top-0 left-0 bg-sky-900'>
                <div className='items-center flex flex-row justify-between  py-4 md:px-10 px-7'>
                    <div className='font-bold text-2xl cursor-pointer text-yellow-400 flex items-center font-[Poppins] '>
                        <span className='text-3xl text-indigo-600 mr-1 pt-2'>
                            <ion-icon name="logo-ionic"></ion-icon>
                        </span>
                        Logo
                    </div>

                </div>
            </div>
            <div className="App bg-sky-900 mt-[8vh] h-screen w-screen relative overflow-hidden flex justify-center items-center">
                <div className="h-40-r w-40-r bg-gradient-to-r from-green-400 to-blue-500 rounded-full absolute left-2/3 -top-56 transform rotate-160 animate-pulse"></div>
                <div className="h-35-r w-35-r bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full absolute top-96 -left-20 transform rotate-180 animate-pulse"></div>
                <Tilt>
                    <div className="container h-96 w-96 bg-white bg-opacity-10 rounded-2xl shadow-5xl relative z-2 border border-opacity-30 border-r-0 border-b-0 backdrop-filter backdrop-blur-sm">
                        <form
                            className='h-full flex flex-col justify-evenly items-center'
                            method="POST"
                            onSubmit={handleSubmit}
                        >
                            <div className='text-yellow-200 font-poppins text-2xl tracking-widest'>Login Form</div>
                            <div>
                            <input
                                type="email"
                                value={email}
                                placeholder='email'
                                className='input-text rounded-lg pl-2 py-1 w-60 '
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setIsEmailValid(true);
                                }}
                                required
                            />
                            {!isEmailValid && (
                                <p className="text-red-500 text-sm">  Email address not register.</p>
                            )}
                            </div>
                            <div>
                                <input
                                    type={visiblePassword ? "text" : "password"}
                                    placeholder='password'
                                    value={password}
                                    className='input-text rounded-lg px-1 -mx-1 py-1 w-[32vh] '
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setIsPasswordValid(true);
                                    }}
                                    required
                                />
                                <span onClick={handleVisibility} className=" ml-[-4vh]  items-center ">
                                    {visiblePassword && password.length > 0 ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                </span>

                                {!isPasswordValid && (
                                    <p className="text-red-700 text-sm">
                                        Wrong Password
                                    </p>
                                )}
                            </div>
                            <input type="Submit" className='cursor-pointer text-sky-200  font-poppins rounded-full px-5 py-1 bg-white bg-opacity-50 hover:bg-white hover:bg-opacity-80 ' value="Sign in" />
                        </form>
                    </div>
                </Tilt>
            </div>
        </>
    );

}

export default Login;