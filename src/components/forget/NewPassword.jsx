import React, {useState} from "react";
import { Eye, EyeOff } from 'lucide-react';
import Cookies from "js-cookie";
import {useNavigate, useParams} from "react-router-dom";

export default function NewPassword(){
    const [password, setPassword]=useState("")
    const [isvalid,setValid]=useState(true)
    const [isVisible, setIsVisible]=useState(false)
    const [isVisibleConf, setIsVisibleConf]=useState(false)
    const [validConf,setValidConf]=useState(true)
    const [confirms, setConfirm]= useState("")
    const { email } = useParams();
    const navigate = useNavigate();

    const handlevisibility=()=>{
        setIsVisible(!isVisible)
    }
    const handlevisibilityConf=()=>{
        setIsVisibleConf(!isVisibleConf)
    }

    const validatePassword = () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const isValid = passwordRegex.test(password);
        setValid(isValid);
    };

    const validateConfirmPassword = () => {
        const isValid = (password===confirms);
        setValidConf(isValid);
    };
    const handlesubmit=async (e)=>{
        e.preventDefault()
        validatePassword()
        validateConfirmPassword()
        if (isvalid && validConf){
            try{
                const response= await  fetch('http://127.0.0.1:8000/api/api/new-password', {
                    method: 'POST',
                    headers: {
                        'content-Type': 'application/json',
                        'X-CSRFToken': Cookies.get('csrftoken')
                    },
                    body: JSON.stringify({email,password}),
                });
                if (response.ok){
                    console.log("password updated")
                    navigate('/login')
                }
                else{
                    console.log("email not verified")
                }
            }
            catch (error) {
                console.log(error)
            }
        }
        else{
            console.log("password didnt match")
        }
        setPassword("")
        setConfirm("")
        setIsVisible(false)
        setIsVisibleConf(false)
        setValid(true)
        setValidConf(true)
    }
    return(
        <>
            <nav className='shadow-md w-full fixed top-0 left-0 bg-sky-900'>
                <div className='items-center flex flex-row justify-between  py-4 md:px-10 px-7'>
                    <div
                        className='font-bold text-2xl cursor-pointer text-yellow-400 flex items-center font-[Poppins] '>
                        <span className='text-3xl text-indigo-600 mr-1 pt-2'>
                            <ion-icon name="logo-ionic"></ion-icon>
                        </span>
                        Logo
                    </div>
                </div>
            </nav>
            <div className="w-screen min-h-[calc(100vh-4.3vh)] md:min-h-[calc(100vm-7vh)] bg-sky-900 mt-10 px-10 pt-20  text-center justify-center">
                <p className='uppercase font-bold text-white text-2xl'>Change password</p>
                <form onSubmit={handlesubmit} method="POST" className='text-center justify-center my-10'>
                    <div className="mt-8 grid grid-col-1 text-center justify-center">
                        <label className="text-lg text-white font-semibold" htmlFor="newpassword">
                            New Password:
                        </label>
                        <div className="flex">
                            <input
                                type={isVisible ? "text" : "password"}
                                value={password}
                                name="newpassword"
                                placeholder="Enter new password"
                                className="rise-2 my-4 rounded-xl p-2 w-52 justify-center text-center text-sky-800"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span onClick={handlevisibility}
                                  className="items-center ml-[-5vh] mt-6">
                                        {isVisible && password.length > 0 ? <Eye/> : <EyeOff/>}
                            </span>

                        </div>
                        {!isvalid && (
                            <p className="text-red-700 text-sm">
                                Password should contain at least one uppercase letter, one lowercase letter,
                                one number, one special character, and be at least 8 characters long.
                            </p>
                        )}
                    </div>
                    <div className="mt-8 grid grid-col-1 text-center justify-center">
                        <label className="text-lg text-white font-semibold" htmlFor="confirmpassword">
                            ConFirm Password:
                        </label>
                        <div className="flex">
                            <input
                                type={isVisibleConf ? "text" : "password"}
                                value={confirms}
                                name="confirmpassword"
                                placeholder="Enter confirm password"
                                className="rise-2 my-4 rounded-xl p-2 w-52 justify-center text-center text-sky-800"
                                onChange={(e) => setConfirm(e.target.value)}
                                required
                            />
                            <span onClick={handlevisibilityConf}
                                  className="items-center ml-[-5vh] mt-6">
                                        {isVisibleConf && confirms.length > 0 ? <Eye/> : <EyeOff/>}
                            </span>
                        </div>
                        {!validConf && (
                            <p className="text-red-700 text-sm">
                                Password didn&apos;t match.
                            </p>
                        )}
                    </div>
                    <button type="submit" className="rise-2 p-3 font-semibold mt-8 rounded-2xl hover:text-yellow-400 shadow-2xl hover:bg-white text-lg text-white bg-amber-400">
                        Change Password
                    </button>
                </form>

            </div>
        </>
    )
}