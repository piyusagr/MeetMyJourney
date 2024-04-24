import React, {useState} from 'react';
import axios from 'axios';

export default function Mockinterview(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [resume, setResume] = useState(null);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(email);
        setIsEmailValid(isValid);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        validateEmail();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('resume', resume);
            formData.append('date', date);
            formData.append('time', time);

            const response = await axios.post('http://localhost:8000/api/api/mock-interview', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Mock interview scheduled:', response.data);
            setLoading(false);
            setError('');
        } catch (error) {
            console.error('Error scheduling mock interview:', error);
            setError('Failed to schedule mock interview. Please try again.');
            setLoading(false);
        }
        setName("")
        setEmail("")
        setResume(null)
        setDate("")
        setTime("")
        setError("")
    };
    return(
        <div className="py-10 mt-8 text-center bg-sky-900 align-middle items-center min-h-screen ">
            <p className="py-10 uppercase text-yellow-400 front-bold text-2xl">Mock Interview Schedule</p>
            <form
                method="POST"
                className="px-5 mx-5  text-l   text-center justify-center items-center  text-yellow-950 md:text-xl"
                onSubmit={handleSubmit}
            >
                <div className="font-bold text-xl items-center text-yellow py-2 flex flex-col md:flex-row">
                    <div>
                        <label htmlFor="name" className=" px-5  text-yellow-400">NAME
                            : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                    </div>
                    <div>
                        <input type="text"
                               className="rounded-full px-5 py-2"
                               value={name}
                               onChange={(e) => setName(e.target.value)}
                               placeholder="Name"
                               required/>
                    </div>
                </div>
                <div className="font-bold text-xl text-yellow py-2 items-center flex flex-col md:flex-row">
                    <div>
                        <label htmlFor="mail" className=" px-5 text-yellow-400 text-center justify-between">EMAIL
                            :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    </div>
                    <div>
                        <input
                            type="email"
                            className={`rounded-full px-4 py-2 ${isEmailValid ? "" : "border-red-500"}`}
                            value={email.toLowerCase()}
                            name="mail"
                            placeholder="Enter the email"
                            onChange={(e) => {
                                setEmail(e.target.value.toLowerCase());
                                setIsEmailValid(true);
                            }}
                            required
                        />
                        {!isEmailValid && (
                            <p className="text-red-500 text-sm"> Please enter a valid email address.</p>
                        )}
                    </div>
                </div>
                    <div className="font-bold text-xl text-yellow py-2 items-center flex flex-col md:flex-row">
                        <div>
                            <label htmlFor="file"
                                   className=" px-5 text-yellow-400 uppercase text-center justify-between">Resume
                                :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        </div>
                        <div>
                            <input type="file"
                                   className="rounded-full px-5 py-2 "
                                   onChange={(e) => setResume(e.target.files[0])}
                                   required/>
                        </div>
                    </div>
                    <div className="font-bold text-xl items-center text-yellow py-2 flex flex-col md:flex-row">
                        <div>
                            <label className=" px-5 text-yellow-400 text-center uppercase">Date
                                : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        </div>
                        <div>
                            <input type="date" className="rounded-full px-5 py-2 " value={date}
                                   onChange={(e) => setDate(e.target.value)} required/>
                        </div>
                    </div>

                    <div className="font-bold text-xl items-center text-yellow py-2 flex flex-col md:flex-row">
                        <div>
                            <label className=" px-5 text-yellow-400 uppercase">Time
                                : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        </div>
                        <div>
                            <input type="time" className="rounded-full px-5 py-2 " value={time}
                                   onChange={(e) => setTime(e.target.value)} required/>
                        </div>
                    </div>
                    <button type="submit"
                            className="rise-2 p-3 mt-8 rounded-2xl hover:text-yellow-400 shadow-2xl hover:bg-white text-lg text-white bg-amber-400"
                            disabled={loading}>
                        Schedule
                    </button>
            </form>
        </div>
)
}