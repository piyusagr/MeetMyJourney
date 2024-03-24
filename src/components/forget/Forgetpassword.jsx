import {useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import coloredlogomain from "../../../public/coloredlogomain.png";
export default function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);
    const navigate=useNavigate()
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
                const response = await fetch('http://127.0.0.1:8000/api/api/forget-password', {
                    method: 'POST',
                    headers: {
                        'content-Type': 'application/json',
                        'X-CSRFToken': Cookies.get('csrftoken'),
                    },
                    body: JSON.stringify({email}),
                });
                if (response.ok) {
                    toast.success('Password reset email vertifiction sent successfully ! ', {
                        position: "top-right",
                        autoClose: true,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        onClose: () => navigate(`/verify-forget/${email}`),
                    });
                } else {
                    toast.error('Email not registered!!', {
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
            } catch (error) {
                toast.error('not able to fetch backend!', {
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
        }
        else{
            toast.error('Enter valid email id!', {
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
        setEmail("")
    }

    return (
        <div className="justify-center min-h-screen">
            <nav className="bg-sky-900 text-xl text-left font-bold text-yellow-400 w-full h-20  shadow-md p-3">
                <Link to="/">
                     <span className='text-3xl text-indigo-600 mr-1 pt-2'>
                        <img src={coloredlogomain} alt="Logo" className="rounded-full rise-2 shadow-8xl w-20 h-16"
                             width={40} height={40}/>
                    </span>
                </Link>
            </nav>
            <form method="POST" onSubmit={handleSubmit}
                  className="bg-sky-800 py-32 w-full min-h-screen font-bold text-yellow-500 text-center">
                <p className="text-xl uppercase">Forgot password</p>
                <div className="mt-8 grid grid-col-1 text-center justify-center">
                    <label className="text-lg" htmlFor="email">
                        Email:
                    </label>
                    <input
                        type="text"
                        value={email.toLowerCase()}
                        name="email"
                        placeholder="Enter the email"
                        className="rise-2 my-6 rounded-xl p-2 w-52 justify-center text-center text-sky-800"
                        onChange={(e) => setEmail(e.target.value.toLowerCase())}
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
            <ToastContainer/>
        </div>
    );
}
