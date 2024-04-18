import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import Company from './components/Company/Company.jsx'
import Main from './components/Main/Main.jsx'
import Login from './components/Login/Login.jsx'
import CompanyForm from './components/Company/CompanyForm.jsx'
import InterviewExperience from './components/Interview/InterviewExperience.jsx';
import VerificationPage from './components/verify/EmailVerification.jsx'
import ForgetPassword from './components/forget/Forgetpassword.jsx'
import VerificationForget from "./components/forget/VerifyForget.jsx";
import NewPassword from "./components/forget/NewPassword.jsx";
import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify/:email" element={<VerificationPage/>}/>
      <Route path="/forget-password" element={<ForgetPassword/>}/>
      <Route path="/verify-forget/:email" element={<VerificationForget/>}/>
      <Route path="/new-password/:email" element={<NewPassword/>}/>
      <Route path='/' element={<Layout />}>
        <Route path='main' element={<Main />} />
        <Route path="company" element={<Company />} />
        <Route path="companydetail/form" element={<CompanyForm />} />
        <Route path="company/:companyName" element={<InterviewExperience/>} />
        <Route path="about" element={<About/>}/>
        <Route path="contact" element={<Contact/>}/>
        {/*<Route path="interview-preparation" element={<Preparation/>}/>*/}
      </Route>
    </>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
