// VerificationPage.js

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const VerificationPage = () => {
    const verifyEmail = async (verificationToken) => {
        try {
            console.log("verifying...");
            await axios.get(`http://localhost:8000/api/api/verify/${verificationToken}`);
        } catch (error) {
            console.error('Email verification failed:', error);
        }
    };
    useEffect(() => {
        const { id } = useParams()

        console.log(id);
        if (id) {
            verifyEmail(id);
        }
    }, []);
    return (
        <div>
            <p>Email verification successful! You can now log in.</p>
        </div>
    );
};

export default VerificationPage;
