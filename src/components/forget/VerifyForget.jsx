import { useState} from "react";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";

const VerificationForget = () => {
    const [verificationcode, setVerificationcode] = useState("");
    const { email } = useParams();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const csrftoken = Cookies.get('csrftoken');

            const response = await fetch("http://localhost:8000/api/api/verify/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify({ email: email, verificationcode: verificationcode }),
            });

            if (response.status === 200) {
                console.log("Email successfully verified.");
                navigate(`/new-password/${email}`);
            } else {
                console.log("Failed to verify code email.");
            }

        } catch (error) {
            console.error("Failed to verify email:", error);
        }
        setVerificationcode("");
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
            <div className="justify-center text-white bg-sky-900 w-full h-full py-20">
                <p className="uppercase text-3xl font-bold text-ellipsis text-red-50 text-center pt-10 ">Email verification </p>
                <form className="text-2xl flex flex-col justify-between text-center pt-24 " method="POST" onSubmit={handleSubmit}>
                    <label className="uppercase font-bold pb-10" htmlFor="code">verification code</label>
                    <div className="pb-10">
                        <input
                            type="text"
                            className=" p-2 w-[60vh] text-center text-sky-800 font-semibold rounded-2xl"
                            id="code"
                            placeholder="enter verification code "
                            value={verificationcode}
                            onChange={(e) => setVerificationcode(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="border w-36 p-2 rounded-full text-sky-800 bg-white font-bold"
                        >
                            Verify Code
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default VerificationForget;
