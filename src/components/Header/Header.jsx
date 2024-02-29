import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '/src/Output.css';
import Button from './Button';


const Header = () => {
    let Links = [
        { name: "Home", link: "/main" },
        { name: "Company", link: "/company" },
    ];
    // const userData = JSON.parse(localStorage.getItem('user')) || {};
    // const [str,setStr]= useState("");
    // useEffect(()=>setStr(userData.email.substring(0,6)))
    let [open, setOpen] = useState(false);
    
    return (
        <div className='shadow-md w-full fixed top-0 left-0 bg-sky-950'>
            <div className='md:flex items-center justify-between  py-4 md:px-10 px-7'>
                <div className='font-bold text-2xl cursor-pointer text-yellow-400 flex items-center font-[Poppins] '>
                    <span className='text-3xl text-indigo-600 mr-1 pt-2'>
                        <ion-icon name="logo-ionic"></ion-icon>
                    </span>
                    Logo
                </div>

                <div onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-3 border px-2 rounded-lg cursor-pointer md:hidden text-white'>
                    <ion-icon name={open ? 'close' : 'menu'}>&#8801;</ion-icon>
                </div>

                <ul className={`md:flex md:items-center text-white md:pb-0  text-center pb-12 my-[-20px] absolute md:static bg-sky-950 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ' : 'top-[-490px]'}`}>
                    {
                        Links.map((link) => (
                            <li key={link.name} className='md:ml-8 text-xl md:my-0 my-7'>
                                <Link to={link.link} className=' hover:text-yellow-400 duration-500'>{link.name}</Link>
                            </li>
                        ))
                    }
                    {/* <Button className="uppercase">
                        {str}
                    </Button> */}
                </ul>
            </div>
        </div>
    )
}

export default Header