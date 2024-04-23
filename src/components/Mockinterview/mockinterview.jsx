import React, {useState} from 'react';
import axios from 'axios';

export default function Mockinterview(){
    const [name, setName] = useState('');
    const [resume, setResume] = useState(null);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', name);
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
        setResume("")
        setDate("")
        setTime("")
        setError("")
    };
    return(
        <div className="py-10 mt-8 text-center ">
            Mock Interview
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required/>
                <input type="file" onChange={(e) => setResume(e.target.files[0])} required/>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required/>
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required/>
                <button type="submit" disabled={loading}>Schedule</button>
            </form>
        </div>
    )
}