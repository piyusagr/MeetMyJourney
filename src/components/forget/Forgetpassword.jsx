import {useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);
    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(email);
        setIsEmailValid(isValid);
    };

    const handleSubmit= async (e)=>{
        e.preventDefault()
        validateEmail();

        if (isEmailValid) {
            try {
                const response = await fetch('http://localhost:8000/api/api/forgetpassword/', {
                    method: 'POST',
                    headers: {
                        'content-Type': 'application/json',
                        'X-CSRFToken': Cookies.get('csrftoken'),
                    },
                    body: JSON.stringify({email}),
                });
                console.log("email valid: ", {email})
            }
            catch (error){
                console.log(error)
            }
        }
        else{
            console.log("enter valid email!!!")
        }
        setEmail("")
    }

    return (
        <div className="justify-center min-h-screen">
            <nav className="bg-sky-900 text-xl text-left font-bold text-yellow-400 w-full h-15 p-3">
                <Link to="/">Logo</Link>
            </nav>
            <form  method="POST" onSubmit={handleSubmit} className="bg-sky-800 py-32 w-full h-full font-bold text-yellow-500 text-center">
                <p className="text-xl uppercase">Forgot password</p>
                <div className="mt-8 grid grid-col-1 text-center justify-center">
                    <label className="text-lg" htmlFor="email">
                        Email:
                    </label>
                    <input
                        type="text"
                        value={email}
                        name="email"
                        placeholder="Enter the email"
                        className="rise-2 my-6 rounded-xl p-2 w-52 justify-center text-center text-sky-800"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {!isEmailValid && (
                        <p className="text-red-500 text-sm"> Please enter a valid email address.</p>
                    )}
                </div>
                <button
                    type="submit"
                    className="rise-2 p-3 mt-8 rounded-2xl hover:text-yellow-400 shadow-2xl hover:bg-white text-lg text-white bg-amber-400"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
