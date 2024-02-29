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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify/:id" element={<VerificationPage/>}/>
      <Route path='/' element={<Layout />}>
        <Route path='main' element={<Main />} />
        <Route path="company" element={<Company />} />
        <Route path="companydetail/form" element={<CompanyForm />} />
        <Route path="/company/:companyName" element={<InterviewExperience/>} />

      </Route>
    </>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
